import { Eye, EyeOff, HardHat } from "lucide-react";
import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import roadConstruction from "@/assets/road-construction.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLogin() {
  const { isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);
  const location = useLocation(); const navigate = useNavigate();
  const destination = (location.state as { from?: string } | null)?.from ?? "/admin";
  if (!loading && isAdmin) return <Navigate to="/admin" replace />;
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError("");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (!password) return setError("Enter your password.");
    setSubmitting(true); const result = await signIn(email.trim(), password); setSubmitting(false);
    if (result.error) return setError(result.error);
    navigate(destination.startsWith("/admin") ? destination : "/admin", { replace: true });
  };
  return <main className="grid min-h-screen bg-background lg:grid-cols-2">
    <section className="relative hidden overflow-hidden lg:block"><img src={roadConstruction} alt="Road construction at Hibir" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/35" /><div className="relative flex h-full max-w-xl flex-col justify-between p-14 text-primary-foreground"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"><HardHat size={23} /></span><span><strong className="block font-display text-xl">HIBIR</strong><span className="text-xs tracking-[0.2em] text-primary-foreground/70">CONSTRUCTION CORPORATION</span></span></div><div><p className="mb-4 text-sm font-semibold tracking-[0.2em] text-accent-soft">ADMINISTRATOR PORTAL</p><h1 className="text-5xl font-semibold leading-tight">Built for the teams building Ethiopia’s infrastructure.</h1><p className="mt-6 max-w-md text-lg leading-relaxed text-primary-foreground/75">A focused workspace for approved Hibir administrators.</p></div><p className="text-sm text-primary-foreground/60">Hibir Construction Corporation</p></div></section>
    <section className="flex items-center justify-center px-5 py-12 sm:px-10"><div className="w-full max-w-md"><div className="mb-10 lg:hidden"><p className="font-display text-2xl font-bold">HIBIR</p><p className="text-xs tracking-[0.16em] text-muted-foreground">ADMINISTRATION</p></div><p className="label-eyebrow">Secure administrator access</p><h1 className="mt-3 font-display text-3xl font-semibold">Welcome back</h1><p className="mt-3 text-muted-foreground">Sign in with your approved administrator account.</p><form className="mt-8 space-y-5" onSubmit={submit} noValidate><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={submitting} /></div><div className="space-y-2"><Label htmlFor="password">Password</Label><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={submitting} className="pr-12" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 px-3 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>{error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<Button type="submit" className="w-full" disabled={submitting || loading}>{submitting ? "Signing in…" : "Sign in"}</Button></form></div></section>
  </main>;
}
