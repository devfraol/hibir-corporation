import { useEffect, useMemo, useState } from "react";
import Seo from "@/components/Seo";
import FeaturedNews from "@/components/news/FeaturedNews";
import NewsFilters from "@/components/news/NewsFilters";
import NewsGrid from "@/components/news/NewsGrid";
import NewsPagination from "@/components/news/NewsPagination";
import { getCategoryCounts, getFeaturedNews, getNews } from "@/services/newsService";
import type { NewsArticle, NewsCategory } from "@/types/news";

const PAGE_SIZE = 6;

const News = () => {
  const [featured, setFeatured] = useState<NewsArticle | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [totalPublished, setTotalPublished] = useState(0);
  const [category, setCategory] = useState<NewsCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [f, c, all] = await Promise.all([getFeaturedNews(), getCategoryCounts(), getNews({ pageSize: 999 })]);
      if (cancelled) return;
      setFeatured(f);
      setCounts(c);
      setTotalPublished(all.total);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const res = await getNews({ category, search, page, pageSize: PAGE_SIZE });
      if (cancelled) return;
      setArticles(res.items);
      setTotal(res.total);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [category, search, page]);

  const latest = useMemo(
    () => (category === "All" && !search && featured ? articles.filter((a) => a.id !== featured.id) : articles),
    [articles, category, search, featured],
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News & Insights — Hibir Construction Corporation",
    description: "Updates, milestones and stories from Hibir Construction Corporation.",
  };

  return (
    <main>
      <Seo
        title="News & Insights | Hibir Construction Corporation"
        description="Updates, milestones and stories from Hibir Construction Corporation — projects, infrastructure, safety and corporate announcements."
        path="/news"
        jsonLd={jsonLd}
      />

      {/* Newsroom header */}
      <section className="relative pt-36 pb-16 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden />
        <div className="absolute -top-24 left-1/3 w-[560px] h-[320px] rounded-full bg-accent/10 blur-[140px]" aria-hidden />
        <div className="container-custom relative">
          <span className="label-eyebrow">Newsroom</span>
          <h1 className="display-xl text-foreground mt-4 max-w-4xl">News &amp; Insights</h1>
          <p className="section-subtitle mt-6">
            Updates, milestones and stories from Hibir Construction Corporation.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && category === "All" && !search && (
        <section aria-label="Featured story" className="px-4 md:px-8 pb-16">
          <div className="container-custom">
            <FeaturedNews article={featured} />
          </div>
        </section>
      )}

      {/* Latest */}
      <section aria-labelledby="latest-news" className="px-4 md:px-8 pb-28">
        <div className="container-custom">
          <div className="flex flex-col gap-8 mb-12">
            <h2 id="latest-news" className="section-title">
              Latest News
            </h2>
            <NewsFilters
              active={category}
              onChange={(c) => {
                setCategory(c);
                setPage(1);
              }}
              counts={counts}
              total={totalPublished}
              search={search}
              onSearch={(v) => {
                setSearch(v);
                setPage(1);
              }}
            />
          </div>

          <NewsGrid
            articles={latest}
            emptyMessage="Try a different category or search term — new stories are published regularly."
          />

          {total > 0 && (
            <NewsPagination shown={articles.length} total={total} loading={loading} onLoadMore={() => setPage((p) => p + 1)} />
          )}
        </div>
      </section>
    </main>
  );
};

export default News;
