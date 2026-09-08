import { Link, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsCard from "@/components/news/NewsCard";
import NotFound from "@/pages/NotFound";
import { newsArticles } from "@/data/news";
import { NEWS_CATEGORIES, type NewsCategory } from "@/types/news";

export const categorySlug = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const newsCategorySlugs = NEWS_CATEGORIES.map(categorySlug);

const intros: Record<string, string> = {
  "company-news": "Corporate updates from Hibir Construction Corporation, the government-owned GC-1 contractor based in Bahir Dar.",
  projects: "Progress reports and milestones from road, bridge and urban infrastructure contracts across Ethiopia.",
  infrastructure: "How the corporation's work contributes to road and infrastructure development in the Amhara Region and nationally.",
  corporate: "Governance, capacity and institutional news from the corporation and its managing board.",
  safety: "Health, safety, environment and quality news from live construction sites.",
  awards: "Recognitions and awards received by the corporation, including national Kaizen recognition.",
  announcements: "Official announcements from Hibir Construction Corporation.",
};

const NewsCategoryPage = () => {
  const { slug = "" } = useParams();
  const category = NEWS_CATEGORIES.find((c) => categorySlug(c) === slug) as NewsCategory | undefined;

  if (!category) return <NotFound />;

  const articles = newsArticles
    .filter((a) => a.status === "published" && a.category === category)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

  const path = `/news/category/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
    { name: category, path },
  ];

  return (
    <main>
      <Seo
        title={`${category} | Hibir Construction Corporation News`}
        description={intros[slug] ?? `${category} news from Hibir Construction Corporation.`}
        path={path}
        breadcrumbs={crumbs}
      />

      <section className="pt-32 pb-12 px-4 md:px-8">
        <div className="container-custom">
          <Breadcrumbs crumbs={crumbs} className="mb-8" />
          <span className="label-eyebrow">Newsroom category</span>
          <h1 className="display-xl text-foreground mt-4">{category}</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground font-body">{intros[slug]}</p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8">
        <div className="container-custom">
          {articles.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((a, i) => (
                <NewsCard key={a.id} article={a} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground font-body">No articles published in this category yet.</p>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            {NEWS_CATEGORIES.filter((c) => c !== category).map((c) => (
              <Link
                key={c}
                to={`/news/category/${categorySlug(c)}`}
                className="rounded-full border border-border px-5 py-2 text-sm font-body text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
              >
                {c}
              </Link>
            ))}
            <Link to="/news" className="rounded-full border border-border px-5 py-2 text-sm font-body text-accent">
              All news
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsCategoryPage;
