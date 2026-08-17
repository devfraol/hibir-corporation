export const NEWS_CATEGORIES = [
  "Company News",
  "Projects",
  "Infrastructure",
  "Corporate",
  "Safety",
  "Awards",
  "Announcements",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsStatus = "draft" | "scheduled" | "published" | "archived";

export interface NewsAuthor {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
}

export interface NewsImage {
  url: string;
  alt: string;
  caption?: string;
}

/**
 * Canonical article shape. This mirrors the future backend record so the UI
 * never has to change when the data source is swapped (Postgres / Cloud / CMS).
 */
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Article body as ordered blocks — safe to render, easy to persist. */
  content: NewsBlock[];
  featuredImage: NewsImage;
  gallery: NewsImage[];
  category: NewsCategory;
  tags: string[];
  author: NewsAuthor;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  status: NewsStatus;
  featured: boolean;
  readingMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
}

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string };

export interface NewsQuery {
  category?: NewsCategory | "All";
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
