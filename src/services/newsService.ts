import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { fetchPublishedNewsRows } from "@/services/supabaseContentAdapters";
import { NEWS_CATEGORIES, type AdminNewsFilters, type CreateNewsInput, type NewsArticle, type NewsCategory, type NewsQuery, type Paginated, type UpdateNewsInput } from "@/types/news";
import type { Database } from "@/types/database";
import type { Locale } from "@/i18n";

/**
 * Data-access layer for the newsroom.
 *
 * Every function is async and returns the same shapes a real backend would
 * return, so swapping this module for Lovable Cloud / Postgres / a headless CMS
 * requires no changes in any component.
 */

const DEFAULT_PAGE_SIZE = 6;
type NewsRow = Database["public"]["Tables"]["news_articles"]["Row"];

const isNewsCategory = (category: string | null): category is NewsCategory =>
  category !== null && NEWS_CATEGORIES.includes(category as NewsCategory);

const isNewsContent = (content: unknown): content is NewsArticle["content"] => Array.isArray(content);

type LocalizedNewsRow = NewsRow & { title_am: string | null; excerpt_am: string | null; content_am: unknown; seo_title_am: string | null; seo_description_am: string | null };
const toNewsArticle = (row: NewsRow): NewsArticle => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt ?? "",
  content: isNewsContent(row.content) ? row.content : [],
  category: isNewsCategory(row.category) ? row.category : "Company News",
  featuredImage: { url: row.cover_image ?? "", alt: row.title },
  gallery: [],
  tags: [],
  author: { id: row.author_id ?? "hibir-comms", name: "Hibir Construction Corporation" },
  publishedAt: row.published_at ?? row.created_at,
  updatedAt: row.updated_at,
  createdAt: row.created_at,
  status: row.status,
  featured: row.featured,
  readingMinutes: 1,
  seoTitle: row.seo_title ?? undefined,
  seoDescription: row.seo_description ?? undefined,
  titleAm: (row as LocalizedNewsRow).title_am ?? undefined,
  excerptAm: (row as LocalizedNewsRow).excerpt_am ?? undefined,
  contentAm: isNewsContent((row as LocalizedNewsRow).content_am) ? (row as LocalizedNewsRow).content_am : undefined,
  seoTitleAm: (row as LocalizedNewsRow).seo_title_am ?? undefined,
  seoDescriptionAm: (row as LocalizedNewsRow).seo_description_am ?? undefined,
});

const requireSupabase = () => {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured for administrator news management.");
  return getSupabaseClient();
};

const toNewsPayload = (input: UpdateNewsInput) => ({
  ...(input.title !== undefined && { title: input.title }),
  ...(input.slug !== undefined && { slug: input.slug }),
  ...(input.excerpt !== undefined && { excerpt: input.excerpt || null }),
  ...(input.content !== undefined && { content: input.content }),
  ...(input.category !== undefined && { category: input.category }),
  ...(input.coverImage !== undefined && { cover_image: input.coverImage || null }),
  ...(input.featured !== undefined && { featured: input.featured }),
  ...(input.status !== undefined && { status: input.status }),
  ...(input.publishedAt !== undefined && { published_at: input.publishedAt }),
  ...(input.seoTitle !== undefined && { seo_title: input.seoTitle || null }),
  ...(input.seoDescription !== undefined && { seo_description: input.seoDescription || null }),
  ...(input.titleAm !== undefined && { title_am: input.titleAm || null }),
  ...(input.excerptAm !== undefined && { excerpt_am: input.excerptAm || null }),
  ...(input.contentAm !== undefined && { content_am: input.contentAm }),
  ...(input.seoTitleAm !== undefined && { seo_title_am: input.seoTitleAm || null }),
  ...(input.seoDescriptionAm !== undefined && { seo_description_am: input.seoDescriptionAm || null }),
});

/** Authenticated CMS reads. RLS controls whether the caller may see drafts. */
export async function getAdminNews(filters: AdminNewsFilters = {}): Promise<NewsArticle[]> {
  let query = requireSupabase().from("news_articles").select("*").order("updated_at", { ascending: false });
  if (filters.status && filters.status !== "all") query = query.eq("status", filters.status);
  if (filters.category && filters.category !== "all") query = query.eq("category", filters.category);
  if (filters.featured !== undefined) query = query.eq("featured", filters.featured);
  if (filters.search?.trim()) query = query.ilike("title", `%${filters.search.trim()}%`);
  const { data, error } = await query;
  if (error) throw error;
  return data.map(toNewsArticle);
}

export async function getAdminNewsById(id: string): Promise<NewsArticle | null> {
  const { data, error } = await requireSupabase().from("news_articles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? toNewsArticle(data) : null;
}

export async function createNews(input: CreateNewsInput): Promise<NewsArticle> {
  const { data, error } = await requireSupabase().from("news_articles").insert(toNewsPayload(input)).select("*").single();
  if (error) throw error;
  return toNewsArticle(data);
}

export async function updateNews(id: string, input: UpdateNewsInput): Promise<NewsArticle> {
  const { data, error } = await requireSupabase().from("news_articles").update(toNewsPayload(input)).eq("id", id).select("*").single();
  if (error) throw error;
  return toNewsArticle(data);
}

export async function deleteNews(id: string): Promise<void> {
  const { error } = await requireSupabase().from("news_articles").delete().eq("id", id);
  if (error) throw error;
}

export const saveNewsDraft = (id: string, input: UpdateNewsInput) => updateNews(id, { ...input, status: "draft", publishedAt: null });
export const archiveNews = (id: string) => updateNews(id, { status: "archived" });
export const publishNews = (id: string) => updateNews(id, { status: "published", publishedAt: new Date().toISOString() });

/** Uploads public article imagery through the authenticated browser session. */
export async function uploadNewsImage(articleId: string, file: File): Promise<string> {
  const client = requireSupabase();
  const extension = file.name.split(".").pop()?.toLowerCase() || "image";
  const path = `news/${articleId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage.from("news-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  const { data } = client.storage.from("news-media").getPublicUrl(path);
  return data.publicUrl;
}

/** Public site reads are Supabase-only. Empty or unavailable content never falls back to demo records. */
const getPublishedNews = async (): Promise<NewsArticle[]> => {
  if (!isSupabaseConfigured) return [];
  try {
    return (await fetchPublishedNewsRows()).map(toNewsArticle);
  } catch (error) {
    console.warn("Unable to load published news from Supabase.", error);
    return [];
  }
};

export interface MediaAsset {
  name: string;
  path: string;
  /** Public URL retained because existing articles persist media URLs. */
  publicUrl: string;
  createdAt?: string;
  size?: number;
  contentType?: string;
}

/** Lists only the existing news-media objects; no separate media records are required. */
export async function getNewsMedia(): Promise<MediaAsset[]> {
  const client = requireSupabase();
  const { data, error } = await client.storage.from("news-media").list("news", { limit: 1000, sortBy: { column: "created_at", order: "desc" } });
  if (error) throw error;
  const assets: MediaAsset[] = [];
  for (const folder of data) {
    if (!folder.id) {
      const { data: files, error: filesError } = await client.storage.from("news-media").list(`news/${folder.name}`, { limit: 1000, sortBy: { column: "created_at", order: "desc" } });
      if (filesError) throw filesError;
      for (const file of files) {
        if (!file.id) continue;
        const path = `news/${folder.name}/${file.name}`;
        assets.push({ name: file.name, path, publicUrl: client.storage.from("news-media").getPublicUrl(path).data.publicUrl, createdAt: file.created_at, size: file.metadata?.size, contentType: file.metadata?.mimetype });
      }
    }
  }
  return assets;
}

export interface MediaUsage {
  title: string;
  slug: string;
}

const referencesAsset = (value: unknown, asset: MediaAsset) =>
  typeof value === "string" && (value === asset.path || value === asset.publicUrl || value.includes(asset.path));

/** Checks persisted news records, including drafts, before a storage object is removed. */
export async function getNewsMediaUsage(asset: MediaAsset): Promise<MediaUsage[]> {
  const { data, error } = await requireSupabase().from("news_articles").select("title, slug, cover_image, content");
  if (error) throw error;
  return data
    .filter((article) => referencesAsset(article.cover_image, asset) || JSON.stringify(article.content).includes(asset.path) || JSON.stringify(article.content).includes(asset.publicUrl))
    .map(({ title, slug }) => ({ title, slug }));
}

/** RLS permits this only to authenticated newsroom administrators. Call usage check first. */
export async function deleteNewsMedia(asset: MediaAsset): Promise<void> {
  const usage = await getNewsMediaUsage(asset);
  if (usage.length) throw new Error(`This image is used by ${usage.map((article) => article.title).join(", ")}.`);
  const { error } = await requireSupabase().storage.from("news-media").remove([asset.path]);
  if (error) throw error;
}

const paginate = <T,>(items: T[], page: number, pageSize: number): Paginated<T> => ({
  items: items.slice(0, page * pageSize),
  page,
  pageSize,
  total: items.length,
  totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
});

export async function getNews(query: NewsQuery = {}, locale: Locale = "en"): Promise<Paginated<NewsArticle>> {
  const { category = "All", search = "", page = 1, pageSize = DEFAULT_PAGE_SIZE } = query;
  const term = search.trim().toLowerCase();

  const items = (await getPublishedNews()).filter((a) => {
    if (locale === "am" && !a.titleAm?.trim()) return false;
    const matchesCategory = category === "All" || a.category === category;
    const matchesSearch =
      !term ||
      a.title.toLowerCase().includes(term) ||
      a.excerpt.toLowerCase().includes(term) ||
      a.tags.some((t) => t.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  return paginate(items, page, pageSize);
}

export async function getFeaturedNews(locale: Locale = "en"): Promise<NewsArticle | null> {
  const all = (await getPublishedNews()).filter((article) => locale === "en" || Boolean(article.titleAm?.trim()));
  return all.find((a) => a.featured) ?? all[0] ?? null;
}

export async function getNewsBySlug(slug: string, locale: Locale = "en"): Promise<NewsArticle | null> {
  return (await getPublishedNews()).find((a) => a.slug === slug && (locale === "en" || Boolean(a.titleAm?.trim()))) ?? null;
}

export async function getNewsByCategory(category: NewsCategory): Promise<NewsArticle[]> {
  return (await getPublishedNews()).filter((a) => a.category === category);
}

export async function getRelatedNews(slug: string, limit = 3): Promise<NewsArticle[]> {
  const current = await getNewsBySlug(slug);
  if (!current) return [];
  const all = (await getPublishedNews()).filter((a) => a.slug !== slug);
  const sameCategory = all.filter((a) => a.category === current.category);
  return [...sameCategory, ...all.filter((a) => a.category !== current.category)].slice(0, limit);
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  return (await getPublishedNews()).reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] ?? 0) + 1;
    return acc;
  }, {});
}

export const formatNewsDate = (iso: string, locale: Locale = "en") =>
  new Date(iso).toLocaleDateString(locale === "am" ? "am-ET" : "en-US", { year: "numeric", month: "long", day: "numeric" });
