import { Edit3, FilePlus2, Search, Star, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { hasCapability } from "@/lib/admin";
import { deleteNews, getAdminNews } from "@/services/newsService";
import { NEWS_CATEGORIES, type NewsArticle, type NewsStatus } from "@/types/news";

const statusStyle: Record<NewsStatus, "default" | "secondary" | "outline"> = { published: "default", draft: "secondary", archived: "outline" };
const date = (value: string | null | undefined) => value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—";

export default function AdminNews() {
  const { role } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<NewsStatus | "all">("all");
  const [category, setCategory] = useState<string>("all");
  const [target, setTarget] = useState<NewsArticle | null>(null);
  const [deleting, setDeleting] = useState(false);
  const canManage = role ? hasCapability(role, "manage_content") : false;
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { setArticles(await getAdminNews({ search, status, category: category === "all" ? "all" : category as NewsArticle["category"] })); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to load news articles."); }
    finally { setLoading(false); }
  }, [category, search, status]);
  useEffect(() => { const timeout = window.setTimeout(() => void load(), 200); return () => window.clearTimeout(timeout); }, [load]);
  const confirmDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try { await deleteNews(target.id); setArticles((current) => current.filter((article) => article.id !== target.id)); toast.success("News article deleted."); setTarget(null); }
    catch (reason) { toast.error(reason instanceof Error ? reason.message : "Unable to delete the news article."); }
    finally { setDeleting(false); }
  };
  return <div className="space-y-7">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="label-eyebrow">Content management</p><h1 className="mt-2 font-display text-3xl font-semibold">News</h1><p className="mt-2 text-muted-foreground">Create, publish, and maintain Hibir newsroom updates.</p></div>{canManage && <Button asChild className="gap-2"><Link to="/admin/news/new"><FilePlus2 size={17} />Create News</Link></Button>}</div>
    <section className="surface-card p-4"><div className="grid gap-3 md:grid-cols-[1fr_170px_190px]"><div className="relative"><Search className="absolute left-3 top-3 text-muted-foreground" size={17} /><Input aria-label="Search news" className="pl-10" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by title" /></div><Select value={status} onValueChange={(value) => setStatus(value as NewsStatus | "all")}><SelectTrigger aria-label="Status filter"><SelectValue placeholder="All statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent></Select><Select value={category} onValueChange={setCategory}><SelectTrigger aria-label="Category filter"><SelectValue placeholder="All categories" /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{NEWS_CATEGORIES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div></section>
    {loading ? <div className="surface-card p-10 text-center text-muted-foreground">Loading newsroom records…</div> : error ? <div className="surface-card p-10 text-center"><p className="text-destructive">{error}</p><Button variant="outline" className="mt-4" onClick={() => void load()}>Try again</Button></div> : articles.length === 0 ? <div className="surface-card p-10 text-center"><h2 className="font-display text-xl font-semibold">No news articles found</h2><p className="mt-2 text-muted-foreground">Adjust your filters or create the first newsroom update.</p></div> : <><div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block"><table className="w-full text-left text-sm"><thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-4">Article</th><th className="p-4">Category</th><th className="p-4">Status</th><th className="p-4">Published</th><th className="p-4">Updated</th><th className="p-4 text-right">Actions</th></tr></thead><tbody>{articles.map((article) => <tr key={article.id} className="border-t border-border"><td className="p-4"><div className="flex items-center gap-3">{article.featuredImage.url ? <img src={article.featuredImage.url} alt="" className="h-12 w-16 rounded-md object-cover" /> : <div className="h-12 w-16 rounded-md bg-muted" />}<div><div className="flex items-center gap-2 font-medium">{article.title}{article.featured && <Star size={14} className="fill-accent text-accent" aria-label="Featured" />}</div><p className="mt-1 max-w-md truncate text-xs text-muted-foreground">/{article.slug}</p></div></div></td><td className="p-4">{article.category}</td><td className="p-4"><Badge variant={statusStyle[article.status]}>{article.status}</Badge></td><td className="p-4">{date(article.publishedAt)}</td><td className="p-4">{date(article.updatedAt)}</td><td className="p-4"><div className="flex justify-end gap-2">{canManage && <Button asChild variant="outline" size="sm"><Link to={`/admin/news/${article.id}/edit`} aria-label={`Edit ${article.title}`}><Edit3 size={15} /></Link></Button>}{canManage && <Button variant="outline" size="sm" onClick={() => setTarget(article)} aria-label={`Delete ${article.title}`}><Trash2 size={15} /></Button>}</div></td></tr>)}</tbody></table></div><div className="grid gap-4 md:hidden">{articles.map((article) => <article key={article.id} className="surface-card p-4"><div className="flex gap-3">{article.featuredImage.url ? <img src={article.featuredImage.url} alt="" className="h-16 w-20 rounded-md object-cover" /> : <div className="h-16 w-20 rounded-md bg-muted" />}<div className="min-w-0 flex-1"><h2 className="font-medium">{article.title}</h2><p className="mt-1 text-xs text-muted-foreground">{article.category} · Updated {date(article.updatedAt)}</p><div className="mt-2 flex items-center justify-between"><Badge variant={statusStyle[article.status]}>{article.status}</Badge>{article.featured && <Star size={14} className="fill-accent text-accent" />}</div></div></div>{canManage && <div className="mt-4 flex gap-2 border-t pt-3"><Button asChild variant="outline" size="sm"><Link to={`/admin/news/${article.id}/edit`}>Edit</Link></Button><Button variant="outline" size="sm" onClick={() => setTarget(article)}>Delete</Button></div>}</article>)}</div></>}
    <AlertDialog open={Boolean(target)} onOpenChange={(open) => !open && setTarget(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this news article?</AlertDialogTitle><AlertDialogDescription>This permanently removes “{target?.title}”. Its cover image is intentionally retained in storage for controlled media cleanup.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleting} onClick={(event) => { event.preventDefault(); void confirmDelete(); }}>{deleting ? "Deleting…" : "Delete article"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </div>;
}
