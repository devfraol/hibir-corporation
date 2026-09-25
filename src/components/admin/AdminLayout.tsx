import { Building2, ChevronRight, FileText, FolderKanban, Image, LayoutDashboard, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { formatAdminRole } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "News", to: "/admin/news", icon: FileText },
  { label: "Projects", to: "/admin/projects", icon: FolderKanban },
  { label: "Media", to: "/admin/media", icon: Image },
  { label: "Company", to: "/admin/company", icon: Building2 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

const COLLAPSE_KEY = "hibir-admin-sidebar-collapsed";
const segmentLabel: Record<string, string> = { admin: "Dashboard", news: "News", projects: "Projects", media: "Media", company: "Company", settings: "Settings", new: "New", edit: "Edit", preview: "Preview" };

const useCrumbs = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; to: string }[] = [];
  parts.forEach((part, index) => {
    const label = segmentLabel[part];
    if (label) crumbs.push({ label, to: "/" + parts.slice(0, index + 1).join("/") });
  });
  return crumbs;
};

const initials = (value: string) => value.split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");

export const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => typeof window !== "undefined" && window.localStorage.getItem(COLLAPSE_KEY) === "1");
  const { adminProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const crumbs = useCrumbs();
  const { pathname } = useLocation();
  useEffect(() => { window.localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0"); }, [collapsed]);
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const handleSignOut = async () => { await signOut(); navigate("/admin/login", { replace: true }); };
  const displayName = adminProfile?.full_name || adminProfile?.email || "Administrator";

  const Sidebar = ({ compact }: { compact: boolean }) => <aside className={cn("flex h-full flex-col border-r border-border bg-card transition-[width] duration-200", compact ? "w-[76px]" : "w-[264px]")}>
    <Link to="/admin" className={cn("flex h-16 items-center gap-3 border-b border-border", compact ? "justify-center" : "px-5")}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-base font-bold text-primary-foreground">H</span>
      {!compact && <span className="leading-tight"><strong className="block font-display text-sm tracking-wide">HIBIR</strong><span className="text-[10px] tracking-[0.2em] text-muted-foreground">CMS WORKSPACE</span></span>}
    </Link>
    <nav className="flex-1 space-y-0.5 p-3" aria-label="Administrator navigation">
      {!compact && <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>}
      {navigation.map(({ label, to, icon: Icon }) => {
        const link = <NavLink key={to} to={to} end={to === "/admin"} aria-label={compact ? label : undefined} className={({ isActive }) => cn("group relative flex h-10 items-center gap-3 rounded-md text-sm font-medium transition-colors", compact ? "justify-center" : "px-3", isActive ? "bg-muted text-foreground before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-accent" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground")}>
          {({ isActive }) => <><Icon size={18} className={cn(isActive && "text-accent")} />{!compact && label}</>}
        </NavLink>;
        return compact ? <Tooltip key={to}><TooltipTrigger asChild>{link}</TooltipTrigger><TooltipContent side="right">{label}</TooltipContent></Tooltip> : link;
      })}
    </nav>
    <div className="border-t border-border p-3">
      <div className={cn("flex items-center gap-3 rounded-md p-2", compact && "justify-center")}>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold">{initials(displayName)}</span>
        {!compact && <div className="min-w-0"><p className="truncate text-sm font-medium">{displayName}</p>{adminProfile && <p className="text-xs text-muted-foreground">{formatAdminRole(adminProfile.role)}</p>}</div>}
      </div>
      {compact
        ? <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="mt-1 w-full" aria-label="Sign out" onClick={handleSignOut}><LogOut size={17} /></Button></TooltipTrigger><TooltipContent side="right">Sign out</TooltipContent></Tooltip>
        : <Button variant="ghost" size="sm" className="mt-1 w-full justify-start gap-3 text-muted-foreground" onClick={handleSignOut}><LogOut size={16} />Sign out</Button>}
    </div>
  </aside>;

  const current = crumbs[crumbs.length - 1]?.label ?? "Dashboard";

  return <div className="min-h-screen bg-background">
    <div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><Sidebar compact={collapsed} /></div>
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent side="left" className="w-auto border-0 p-0"><SheetTitle className="sr-only">Navigation</SheetTitle><Sidebar compact={false} /></SheetContent>
    </Sheet>
    <div className={cn("transition-[padding] duration-200", collapsed ? "lg:pl-[76px]" : "lg:pl-[264px]")}>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur lg:px-8">
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={20} /></Button>
        <Button variant="ghost" size="icon" className="hidden lg:inline-flex" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setCollapsed((c) => !c)}>{collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</Button>
        <div className="min-w-0 flex-1">
          <nav aria-label="Breadcrumb" className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
            {crumbs.map((c, i) => <span key={c.to} className="flex items-center gap-1">{i > 0 && <ChevronRight size={12} />}{i < crumbs.length - 1 ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span>{c.label}</span>}</span>)}
          </nav>
          <p className="truncate text-sm font-semibold">{current}</p>
        </div>
        <ThemeToggle className="h-9 w-9" />
        {adminProfile && <span className="hidden rounded-md border border-border px-2 py-1 text-xs text-muted-foreground md:inline">{formatAdminRole(adminProfile.role)}</span>}
        <Button variant="outline" size="sm" className="gap-2" onClick={handleSignOut}><LogOut size={15} /><span className="hidden sm:inline">Sign out</span></Button>
      </header>
      <main className="mx-auto max-w-7xl p-5 md:p-8"><Outlet /></main>
    </div>
  </div>;
};
