import { Building2, FileText, FolderKanban, Image, LayoutDashboard, LogOut, Menu, Settings, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { formatAdminRole } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "News", to: "/admin/news", icon: FileText },
  { label: "Projects", to: "/admin/projects", icon: FolderKanban },
  { label: "Media", to: "/admin/media", icon: Image },
  { label: "Company", to: "/admin/company", icon: Building2 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { adminProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const sidebar = <aside className="flex h-full w-72 flex-col border-r border-border bg-card p-5">
    <Link to="/admin" className="mb-10 flex items-center gap-3 px-3" onClick={() => setMenuOpen(false)}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent font-display text-lg font-bold text-accent-foreground">H</span>
      <span><strong className="block font-display text-base">HIBIR</strong><span className="text-xs tracking-[0.18em] text-muted-foreground">ADMINISTRATION</span></span>
    </Link>
    <nav className="space-y-1" aria-label="Administrator navigation">
      {navigation.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} end={to === "/admin"} onClick={() => setMenuOpen(false)} className={({ isActive }) => cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}><Icon size={18} />{label}</NavLink>)}
    </nav>
    <div className="mt-auto border-t border-border pt-5">
      <p className="px-3 text-sm font-semibold">{adminProfile?.full_name || adminProfile?.email}</p>
      {adminProfile && <p className="px-3 pt-1 text-xs text-muted-foreground">{formatAdminRole(adminProfile.role)}</p>}
      <Button variant="ghost" className="mt-3 w-full justify-start gap-3" onClick={handleSignOut}><LogOut size={17} />Sign out</Button>
    </div>
  </aside>;

  return <div className="min-h-screen bg-muted/40">
    <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>
    {menuOpen && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-foreground/30" aria-label="Close navigation" onClick={() => setMenuOpen(false)} /><div className="relative h-full">{sidebar}</div></div>}
    <div className="lg:pl-72"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:px-8"><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={21} /></Button><div className="hidden lg:block"><p className="text-sm font-medium">Administrator workspace</p><p className="text-xs text-muted-foreground">Hibir Construction Corporation</p></div><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X className="hidden" /></Button><Button variant="outline" size="sm" className="gap-2" onClick={handleSignOut}><LogOut size={16} />Sign out</Button></header><main className="mx-auto max-w-7xl p-5 md:p-8"><Outlet /></main></div>
  </div>;
};
