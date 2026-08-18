import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatNewsDate, getNews } from "@/services/newsService";
import type { NewsArticle } from "@/types/news";

const ease = [0.22, 1, 0.36, 1] as const;

const LatestNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    let cancelled = false;
    getNews({ page: 1, pageSize: 3 }).then((res) => {
      if (!cancelled) setArticles(res.items);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;

  return (
    <section className="section-padding" aria-labelledby="latest-news-heading">
      <div className="container-custom">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Newsroom</span>
            <h2 id="latest-news-heading" className="section-title mt-3">Latest News</h2>
          </div>
          <Link to="/news" className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.18em] uppercase text-accent hover:gap-3 transition-all">
            View All News <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured article */}
          <motion.article
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease }}
          >
            <Link to={`/news/${lead.slug}`} className="group block surface-card overflow-hidden h-full">
              <div className="relative overflow-hidden aspect-[16/10]">
                <motion.img
                  src={lead.featuredImage.url}
                  alt={lead.featuredImage.alt}
                  loading="lazy"
                  initial={{ clipPath: "inset(12% 0% 12% 0%)", scale: 1.08 }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, ease }}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-body font-bold tracking-[0.16em] uppercase bg-background/85 backdrop-blur-md text-accent border border-accent/25">
                  {lead.category}
                </span>
              </div>
              <div className="p-7">
                <time dateTime={lead.publishedAt} className="text-[11px] font-body tracking-[0.18em] uppercase text-muted-foreground">
                  {formatNewsDate(lead.publishedAt)}
                </time>
                <h3 className="font-display font-bold text-xl md:text-2xl mt-3 mb-3 text-foreground leading-snug group-hover:text-accent transition-colors">
                  {lead.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-3">{lead.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-accent text-xs font-body font-semibold tracking-[0.16em] uppercase">
                  Read More <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </motion.article>

          {/* Two secondary articles */}
          <div className="grid gap-8 content-start">
            {rest.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.12 + i * 0.12, ease }}
              >
                <Link to={`/news/${a.slug}`} className="group grid sm:grid-cols-5 gap-5 surface-card overflow-hidden">
                  <div className="sm:col-span-2 overflow-hidden aspect-[16/11] sm:aspect-auto sm:h-full">
                    <img
                      src={a.featuredImage.url}
                      alt={a.featuredImage.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="sm:col-span-3 p-6 sm:pl-0">
                    <div className="flex items-center gap-3 text-[10px] font-body tracking-[0.16em] uppercase">
                      <span className="text-accent font-bold">{a.category}</span>
                      <time dateTime={a.publishedAt} className="text-muted-foreground">{formatNewsDate(a.publishedAt)}</time>
                    </div>
                    <h3 className="font-display font-bold text-base md:text-lg mt-3 mb-2 text-foreground leading-snug group-hover:text-accent transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-2">{a.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-accent text-[11px] font-body font-semibold tracking-[0.16em] uppercase">
                      Read More <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
