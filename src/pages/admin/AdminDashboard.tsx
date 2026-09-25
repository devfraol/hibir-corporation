import { ArrowRight, FilePlus2, FileText, FolderKanban, FolderPlus, Image, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminNews, getNewsMedia } from "@/services/newsService";
import { getAdminProjects } from "@/services/projectService";
import type { NewsArticle } from "@/types/news";
import type { AdminProject } from "@/services/projectService";

const fmt = (v?: string | null) => v ? new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const count = <T extends { status: string }>(rows: T[], s: string) => rows.filter((r) => r.status === s).length;

const Stat = ({ icon: Icon, label, value, hint, to }: { icon: LucideIcon; label: string; value: number | null; hint?: string; to: string }) =>
  <Link to={to} className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/40">
    <div className="flex items-center justify-between text-muted-foreground"><span className="text-xs font-medium uppercase tracking-wider">{label}</span><Icon size={16} className="transition-colors group-hover:text-accent" /></div>
    {value === null ? <Skeleton className="mt-3 h-8 w-14" /> : <p className="mt-3 font-display text-3xl font-semibold tabular-nums">{value}</p>}
    {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
  </Link>;

export default function AdminDashboard() {
  const { adminProfile } = useAuth();
  const name = adminProfile?.full_name || adminProfile?.email || "Administrator";
  const [news, setNews] = useState<NewsArticle[] | null>(null);
  const [projects, setProjects] = useState<AdminProject[] | null>(null);
  const [media, setMedia] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminNews().then(setNews).catch(() => { setNews([]); setError("Some content could not be loaded."); });
    getAdminProjects().then(setProjects).catch(() => { setProjects([]); setError("Some content could not be loaded."); });
    getNewsMedia().then((m) => setMedia(m.length)).catch(() => setMedia(0));
  }, []);

  const recent = [
    ...(news ?? []).map((n) => ({ id: n.id, title: n.title, type: "News", status: n.status, updated: n.updatedAt, to: `/admin/news/${n.id}/edit` })),
    ...(projects ?? []).map((p) => ({ id: p.id, title: p.title, type: "Project", status: p.status, updated: p.updated_at, to: `/admin/projects/${p.id}/edit` })),
  ].sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? "")).slice(0, 6);

  const statusRows = (["published", "draft", "archived"] as const).map((s) => ({ s, n: news ? count(news, s) : 0, p: projects ? count(projects, s) : 0 }));
  const total = (news?.length ?? 0) + (projects?.length ?? 0);

  return <div className="space-y-8">
    <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
      <div><p className="label-eyebrow">Overview</p><h1 className="mt-2 font-display text-2xl font-semibold md:text-3xl">Welcome back, {name}</h1><p className="mt-1 text-sm text-muted-foreground">Current state of Hibir website content.</p></div>
      <div className="flex gap-2"><Link to="/admin/news/new" className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium hover:bg-muted"><FilePlus2 size={15} />New article</Link><Link to="/admin/projects/new" className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><FolderPlus size={15} />New project</Link></div>
    </div>
    {error && <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat icon={FileText} label="Published news" value={news && count(news, "published")} hint={news ? `${count(news, "draft")} drafts` : undefined} to="/admin/news" />
      <Stat icon={FolderKanban} label="Published projects" value={projects && count(projects, "published")} hint={projects ? `${count(projects, "draft")} drafts` : undefined} to="/admin/projects" />
      <Stat icon={FileText} label="All articles" value={news && news.length} to="/admin/news" />
      <Stat icon={Image} label="Media assets" value={media} to="/admin/media" />
    </div>

    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4"><h2 className="font-display text-base font-semibold">Recently updated</h2></div>
        {news === null || projects === null ? <div className="space-y-3 p-5">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-10" />)}</div>
          : recent.length === 0 ? <p className="p-8 text-center text-sm text-muted-foreground">No content yet. Create your first article or project.</p>
          : <ul className="divide-y divide-border">{recent.map((r) => <li key={r.type + r.id}><Link to={r.to} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/50"><span className="w-16 shrink-0 text-xs text-muted-foreground">{r.type}</span><span className="min-w-0 flex-1 truncate text-sm font-medium">{r.title}</span><StatusBadge status={r.status} /><span className="hidden w-24 text-right text-xs text-muted-foreground sm:block">{fmt(r.updated)}</span></Link></li>)}</ul>}
      </section>

      <div className="space-y-6">
        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="font-display text-base font-semibold">Content status</h2>
          <div className="mt-4 space-y-4">{statusRows.map(({ s, n, p }) => <div key={s}>
            <div className="flex items-center justify-between text-sm"><StatusBadge status={s} /><span className="tabular-nums text-muted-foreground">{n} news · {p} projects</span></div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-accent/70" style={{ width: total ? `${((n + p) / total) * 100}%` : "0%" }} /></div>
          </div>)}</div>
        </section>
        <section className="rounded-lg border border-border bg-card p-2">
          {[{ to: "/admin/news", label: "Manage news" }, { to: "/admin/projects", label: "Manage projects" }, { to: "/admin/media", label: "Media library" }, { to: "/admin/company", label: "Company content" }].map((a) =>
            <Link key={a.to} to={a.to} className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">{a.label}<ArrowRight size={15} className="text-muted-foreground" /></Link>)}
        </section>
      </div>
    </div>
  </div>;
}
