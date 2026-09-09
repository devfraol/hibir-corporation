import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Seo from "@/components/Seo";
import { absoluteUrl } from "@/config/site";
import NewsDetail from "@/components/news/NewsDetail";
import RelatedNews from "@/components/news/RelatedNews";
import { getNewsBySlug, getRelatedNews } from "@/services/newsService";
import type { NewsArticle } from "@/types/news";

const NewsArticlePage = () => {
  const { slug = "" } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    (async () => {
      const found = await getNewsBySlug(slug);
      if (cancelled) return;
      if (!found) {
        setState("missing");
        return;
      }
      setArticle(found);
      setState("ready");
      const rel = await getRelatedNews(slug);
      if (!cancelled) setRelated(rel);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state === "loading") {
    return (
      <main className="min-h-screen grid place-items-center">
        <Loader2 className="animate-spin text-accent" size={28} aria-label="Loading article" />
      </main>
    );
  }

  if (state === "missing" || !article) {
    return (
      <main className="min-h-screen grid place-items-center px-6 text-center">
        <div>
          <Seo title="Article not found | Hibir Construction Corporation" description="This article is not available." path={`/news/${slug}`} />
          <h1 className="font-display font-bold text-3xl text-foreground mb-4">Article not found</h1>
          <p className="text-muted-foreground font-body mb-8">This story may have been moved or is not yet published.</p>
          <Link to="/news" className="btn-accent text-sm">
            Back to News
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Seo
        title={article.seoTitle ?? `${article.title} | Hibir Construction Corporation`}
        description={article.seoDescription ?? article.excerpt}
        path={`/news/${article.slug}`}
        image={article.featuredImage.url}
        type="article"
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: article.category, path: `/news/category/${article.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` },
          { name: article.title, path: `/news/${article.slug}` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          articleSection: article.category,
          image: article.featuredImage.url,
          mainEntityOfPage: absoluteUrl(`/news/${article.slug}`),
          author: { "@type": "Organization", name: article.author.name },
          publisher: { "@type": "Organization", name: "Hibir Construction Corporation" },
        }}
      />
      <NewsDetail article={article} />
      <RelatedNews articles={related} />
    </main>
  );
};

export default NewsArticlePage;
