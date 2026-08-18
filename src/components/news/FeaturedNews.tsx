import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { NewsArticle } from "@/types/news";
import { formatNewsDate } from "@/services/newsService";

const FeaturedNews = ({ article }: { article: NewsArticle }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden rounded-3xl border border-border group"
  >
    <Link to={`/news/${article.slug}`} className="block">
      <div className="relative aspect-[16/11] md:aspect-[21/9]">
        <img
          src={article.featuredImage.url}
          alt={article.featuredImage.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 media-overlay-side" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="p-6 md:p-12 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full text-[10px] font-body font-bold tracking-[0.18em] uppercase bg-accent text-accent-foreground">
                Featured
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-body font-bold tracking-[0.18em] uppercase border border-white/25 text-white/90 backdrop-blur-md">
                {article.category}
              </span>
              <time dateTime={article.publishedAt} className="text-[11px] font-body tracking-[0.18em] uppercase on-media-muted">
                {formatNewsDate(article.publishedAt)}
              </time>
            </div>

            <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.08] on-media mb-4">
              {article.title}
            </h2>
            <p className="font-body text-sm md:text-base on-media-muted leading-relaxed max-w-2xl mb-8 line-clamp-3">
              {article.excerpt}
            </p>
            <span className="btn-accent text-sm px-6 py-3">
              Read Article <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
);

export default FeaturedNews;
