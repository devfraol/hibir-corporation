import { newsArticles } from "@/data/news";
import type { NewsArticle, NewsCategory, NewsQuery, Paginated } from "@/types/news";

/**
 * Data-access layer for the newsroom.
 *
 * Every function is async and returns the same shapes a real backend would
 * return, so swapping this module for Lovable Cloud / Postgres / a headless CMS
 * requires no changes in any component.
 */

const DEFAULT_PAGE_SIZE = 6;

const published = () =>
  newsArticles
    .filter((a) => a.status === "published")
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

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

  const items = published().filter((a) => {
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
  const all = published();
  return all.find((a) => a.featured) ?? all[0] ?? null;
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  return published().find((a) => a.slug === slug) ?? null;
}

export async function getNewsByCategory(category: NewsCategory): Promise<NewsArticle[]> {
  return published().filter((a) => a.category === category);
}

export async function getRelatedNews(slug: string, limit = 3): Promise<NewsArticle[]> {
  const current = await getNewsBySlug(slug);
  if (!current) return [];
  const all = published().filter((a) => a.slug !== slug);
  const sameCategory = all.filter((a) => a.category === current.category);
  return [...sameCategory, ...all.filter((a) => a.category !== current.category)].slice(0, limit);
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  return published().reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] ?? 0) + 1;
    return acc;
  }, {});
}

export const formatNewsDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
