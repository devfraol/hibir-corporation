import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { NewsArticle } from "@/types/news";
import { formatNewsDate } from "@/services/newsService";

const NewsCard = ({ article, index = 0 }: { article: NewsArticle; index?: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
    className="h-full"
  >
    <Link
      to={`/news/${article.slug}`}
      className="group surface-card overflow-hidden h-full flex flex-col hover:-translate-y-1.5 hover:border-accent/40"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={article.featuredImage.url}
          alt={article.featuredImage.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 media-overlay opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-body font-bold tracking-[0.16em] uppercase bg-background/85 backdrop-blur-md text-accent border border-accent/25">
          {article.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <time dateTime={article.publishedAt} className="text-[11px] font-body tracking-[0.18em] uppercase text-muted-foreground">
          {formatNewsDate(article.publishedAt)} · {article.readingMinutes} min read
        </time>
        <h3 className="font-display font-bold text-lg mt-3 mb-3 text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm font-body leading-relaxed line-clamp-3 flex-1">{article.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-accent text-xs font-body font-semibold tracking-[0.16em] uppercase">
          Read More
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </Link>
  </motion.article>
);

export default NewsCard;
