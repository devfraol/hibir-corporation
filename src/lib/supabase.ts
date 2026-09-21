import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
let client: SupabaseClient<Database> | undefined;

/** True only when the browser-safe public project settings are available. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

/**
 * Returns the browser-safe Supabase client when this deployment is configured.
 *
 * The static-data services remain the active source of content in Phase 1, so
 * configuration is intentionally checked only when a backend adapter is used.
 * This keeps local/static previews working without shipping fallback credentials.
 */
export const getSupabaseClient = (): SupabaseClient<Database> => {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY before using a Supabase adapter.",
    );
  }

  client ??= createClient<Database>(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return client;
};
