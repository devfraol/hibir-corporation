// Runs before `vite dev` and `vite build` (predev/prebuild); writes public/sitemap.xml.
// Content is pulled from the same data modules the site renders, so newly
// published projects, news articles and services appear automatically.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { SITE_URL } from "../src/config/site";
import { services } from "../src/data/services";
import { projects } from "../src/data/projects";
import { newsArticles } from "../src/data/news";
import { NEWS_CATEGORIES } from "../src/types/news";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const categorySlug = (c: string) =>
  c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.9" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/resources", changefreq: "monthly", priority: "0.7" },
  { path: "/safety", changefreq: "monthly", priority: "0.7" },
  { path: "/organization", changefreq: "monthly", priority: "0.6" },
  { path: "/news", changefreq: "daily", priority: "0.9" },
  { path: "/contact", changefreq: "yearly", priority: "0.7" },
];

const serviceEntries: SitemapEntry[] = services.map((s) => ({
  path: s.canonicalUrl,
  changefreq: "monthly",
  priority: "0.8",
}));

const projectEntries: SitemapEntry[] = projects.map((p) => ({
  path: `/projects/${p.slug}`,
  lastmod: p.updatedAt?.slice(0, 10),
  changefreq: "monthly",
  priority: "0.7",
}));

const newsEntries: SitemapEntry[] = newsArticles
  .filter((a) => a.status === "published")
  .map((a) => ({
    path: `/news/${a.slug}`,
    lastmod: (a.updatedAt ?? a.publishedAt)?.slice(0, 10),
    changefreq: "monthly",
    priority: "0.7",
  }));

const categoryEntries: SitemapEntry[] = NEWS_CATEGORIES.filter((c) =>
  newsArticles.some((a) => a.status === "published" && a.category === c),
).map((c) => ({
  path: `/news/category/${categorySlug(c)}`,
  changefreq: "weekly",
  priority: "0.6",
}));

const entries = [
  ...staticEntries,
  ...serviceEntries,
  ...projectEntries,
  ...newsEntries,
  ...categoryEntries,
];

function generateSitemap(list: SitemapEntry[]) {
  const urls = list.map((e) =>
    [
      `  <url>`,
      `    <loc>${SITE_URL}${e.path === "/" ? "/" : e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
