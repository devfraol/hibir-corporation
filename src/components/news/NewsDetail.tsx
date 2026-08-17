import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Link2, Linkedin, Twitter, Facebook, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { NewsArticle, NewsBlock } from "@/types/news";
import { formatNewsDate } from "@/services/newsService";

const Block = ({ block }: { block: NewsBlock }) => {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? <h2>{block.text}</h2> : <h3>{block.text}</h3>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          {block.text}
          {block.attribution && (
            <footer className="mt-3 not-italic text-sm text-muted-foreground font-body">— {block.attribution}</footer>
          )}
        </blockquote>
      );
    default:
      return <p>{block.text}</p>;
  }
};

const NewsDetail = ({ article }: { article: NewsArticle }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : `/news/${article.slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shares = [
    { label: "Share on X", icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}` },
    { label: "Share on LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { label: "Share on Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
  ];

  return (
    <article>
      {/* Header */}
      <header className="relative pt-32 pb-12 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden />
        <div className="container-custom relative max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[11px] font-body tracking-[0.16em] uppercase text-muted-foreground">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li aria-hidden><ChevronRight size={12} /></li>
              <li><Link to="/news" className="hover:text-accent transition-colors">News</Link></li>
              <li aria-hidden><ChevronRight size={12} /></li>
              <li className="text-foreground truncate max-w-[14rem]" aria-current="page">{article.title}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-[10px] font-body font-bold tracking-[0.18em] uppercase bg-accent/12 text-accent border border-accent/25">
              {article.category}
            </span>
            <time dateTime={article.publishedAt} className="text-[11px] font-body tracking-[0.18em] uppercase text-muted-foreground">
              {formatNewsDate(article.publishedAt)} · {article.readingMinutes} min read
            </time>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-3xl md:text-5xl leading-[1.08] tracking-tight text-foreground"
          >
            {article.title}
          </motion.h1>

          <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed">{article.excerpt}</p>

          <p className="mt-6 text-xs font-body text-muted-foreground">
            By {article.author.name}
            {article.author.role ? ` · ${article.author.role}` : ""}
          </p>
        </div>
      </header>

      {/* Featured image */}
      <div className="px-4 md:px-8">
        <figure className="container-custom max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-border">
            <img
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
          {article.featuredImage.caption && (
            <figcaption className="mt-3 text-xs text-muted-foreground font-body text-center">
              {article.featuredImage.caption}
            </figcaption>
          )}
        </figure>
      </div>

      {/* Body */}
      <div className="px-4 md:px-8 py-16 md:py-24">
        <div className="container-custom max-w-3xl">
          <div className="prose-article">
            {article.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {article.gallery.length > 0 && (
            <section aria-label="Image gallery" className="mt-14">
              <h2 className="font-display font-bold text-xl text-foreground mb-6">Gallery</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {article.gallery.map((img) => (
                  <figure key={img.url} className="overflow-hidden rounded-2xl border border-border">
                    <img src={img.url} alt={img.alt} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                  </figure>
                ))}
              </div>
            </section>
          )}

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12">
              {article.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg text-[11px] font-body text-muted-foreground border border-border">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Share + back */}
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-body tracking-[0.18em] uppercase text-muted-foreground">Share</span>
              {shares.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="w-9 h-9 grid place-items-center rounded-lg border border-border text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
              <button
                type="button"
                onClick={copyLink}
                aria-label="Copy article link"
                className="w-9 h-9 grid place-items-center rounded-lg border border-border text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
              >
                {copied ? <Check size={15} className="text-accent" /> : <Link2 size={15} />}
              </button>
            </div>

            <Link to="/news" className="inline-flex items-center gap-2 text-sm font-body font-semibold text-accent">
              <ArrowLeft size={16} /> Back to News
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsDetail;
