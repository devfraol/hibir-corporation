import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { isAdminRole } from "@/lib/admin";
import type { Database } from "@/types/database";

export type AdminProfile = Database["public"]["Tables"]["admin_profiles"]["Row"];

export type AuthResult = { error?: string };

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  adminProfile: AdminProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  role: AdminProfile["role"] | null;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  refreshProfile: () => Promise<AdminProfile | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const unauthorizedMessage = "This account is not an active Hibir administrator.";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const clearAuthState = useCallback(() => {
    setSession(null);
    setAdminProfile(null);
  }, []);

  const loadProfile = useCallback(async (userId: string): Promise<AdminProfile | null> => {
    const { data, error } = await getSupabaseClient()
      .from("admin_profiles")
      .select("id, user_id, full_name, email, role, avatar_url, active, created_at, updated_at")
      .eq("user_id", userId)
      .maybeSingle();

    if (error || !data || !data.active || !isAdminRole(data.role)) {
      setAdminProfile(null);
      return null;
    }

    setAdminProfile(data);
    return data;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session?.user.id || !isSupabaseConfigured) return null;
    return loadProfile(session.user.id);
  }, [loadProfile, session?.user.id]);

  const revokeUnauthorizedSession = useCallback(async () => {
    clearAuthState();
    if (isSupabaseConfigured) await getSupabaseClient().auth.signOut();
  }, [clearAuthState]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const client = getSupabaseClient();
    let mounted = true;
    const applySession = async (nextSession: Session | null) => {
      if (!nextSession) {
        if (mounted) clearAuthState();
        return;
      }
      if (mounted) setSession(nextSession);
      const profile = await loadProfile(nextSession.user.id);
      if (!profile) await revokeUnauthorizedSession();
    };

    void client.auth.getSession().then(async ({ data }) => {
      await applySession(data.session);
      if (mounted) setLoading(false);
    });
    const { data: listener } = client.auth.onAuthStateChange((_event, nextSession) => {
      void applySession(nextSession);
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [clearAuthState, loadProfile, revokeUnauthorizedSession]);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (!isSupabaseConfigured) return { error: "Administrator authentication is not configured for this deployment." };
    setLoading(true);
    const client = getSupabaseClient();
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      setLoading(false);
      return { error: error?.message ?? "Unable to sign in. Please try again." };
    }
    setSession(data.session);
    const profile = await loadProfile(data.user.id);
    if (!profile) {
      await revokeUnauthorizedSession();
      setLoading(false);
      return { error: unauthorizedMessage };
    }
    setLoading(false);
    return {};
  }, [loadProfile, revokeUnauthorizedSession]);

  const signOut = useCallback(async (): Promise<AuthResult> => {
    clearAuthState();
    if (!isSupabaseConfigured) return {};
    const { error } = await getSupabaseClient().auth.signOut();
    return error ? { error: error.message } : {};
  }, [clearAuthState]);

  const value = useMemo<AuthContextValue>(() => ({
    user: session?.user ?? null, session, adminProfile, loading,
    isAuthenticated: Boolean(session), isAdmin: Boolean(session && adminProfile),
    role: adminProfile?.role ?? null, signIn, signOut, refreshProfile,
  }), [adminProfile, loading, refreshProfile, session, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider.");
  return context;
};
