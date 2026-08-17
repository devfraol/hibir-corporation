import type { NewsArticle } from "@/types/news";
import NewsCard from "./NewsCard";

interface Props {
  articles: NewsArticle[];
  emptyMessage?: string;
}

const NewsGrid = ({ articles, emptyMessage = "No articles match this filter yet." }: Props) => {
  if (articles.length === 0) {
    return (
      <div className="surface-card p-16 text-center">
        <p className="font-display font-semibold text-lg text-foreground mb-2">Nothing here yet</p>
        <p className="text-muted-foreground font-body text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {articles.map((a, i) => (
        <NewsCard key={a.id} article={a} index={i} />
      ))}
    </div>
  );
};

export default NewsGrid;
