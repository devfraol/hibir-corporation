import type { NewsArticle } from "@/types/news";
import NewsCard from "./NewsCard";

const RelatedNews = ({ articles }: { articles: NewsArticle[] }) => {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-news" className="section-padding border-t border-border">
      <div className="container-custom">
        <span className="label-eyebrow">Continue reading</span>
        <h2 id="related-news" className="section-title mt-3 mb-12">
          Related News
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((a, i) => (
            <NewsCard key={a.id} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedNews;
