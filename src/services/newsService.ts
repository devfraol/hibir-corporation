import { newsArticles } from "@/data/news";
import { isSupabaseConfigured } from "@/lib/supabase";
import { fetchPublishedNewsRows } from "@/services/supabaseContentAdapters";
import { NEWS_CATEGORIES, type NewsArticle, type NewsCategory, type NewsQuery, type Paginated } from "@/types/news";
import type { Database } from "@/types/database";

/**
 * Data-access layer for the newsroom.
 *
 * Every function is async and returns the same shapes a real backend would
 * return, so swapping this module for Lovable Cloud / Postgres / a headless CMS
 * requires no changes in any component.
 */

const DEFAULT_PAGE_SIZE = 6;
type NewsRow = Database["public"]["Tables"]["news_articles"]["Row"];

const published = () =>
  newsArticles
    .filter((a) => a.status === "published")
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

const isNewsCategory = (category: string | null): category is NewsCategory =>
  category !== null && NEWS_CATEGORIES.includes(category as NewsCategory);

const isNewsContent = (content: unknown): content is NewsArticle["content"] => Array.isArray(content);

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
});

/**
 * Uses published Supabase records when configured and populated. Static records
 * remain the deliberate fallback until the approved content import is complete.
 */
const getPublishedNews = async (): Promise<NewsArticle[]> => {
  if (!isSupabaseConfigured) return published();

  try {
    const rows = await fetchPublishedNewsRows();
    return rows.length > 0 ? rows.map(toNewsArticle) : published();
  } catch (error) {
    console.warn("Unable to load published news from Supabase; using static fallback.", error);
    return published();
  }
};

const paginate = <T,>(items: T[], page: number, pageSize: number): Paginated<T> => ({
  items: items.slice(0, page * pageSize),
  page,
  pageSize,
  total: items.length,
  totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
});

export async function getNews(query: NewsQuery = {}): Promise<Paginated<NewsArticle>> {
  const { category = "All", search = "", page = 1, pageSize = DEFAULT_PAGE_SIZE } = query;
  const term = search.trim().toLowerCase();

  const items = (await getPublishedNews()).filter((a) => {
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

export async function getFeaturedNews(): Promise<NewsArticle | null> {
  const all = await getPublishedNews();
  return all.find((a) => a.featured) ?? all[0] ?? null;
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  return (await getPublishedNews()).find((a) => a.slug === slug) ?? null;
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

export const formatNewsDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
