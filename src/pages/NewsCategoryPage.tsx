import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsGrid from "@/components/news/NewsGrid";
import NotFound from "@/pages/NotFound";
import { getNewsByCategory } from "@/services/newsService";
import { NEWS_CATEGORIES, type NewsArticle, type NewsCategory } from "@/types/news";

export const categorySlug = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const newsCategorySlugs = NEWS_CATEGORIES.map(categorySlug);
const intros: Record<string, string> = { "company-news": "Corporate updates from Hibir Construction Corporation.", projects: "Progress reports and milestones from infrastructure contracts across Ethiopia.", infrastructure: "Infrastructure development news from Hibir Construction Corporation.", corporate: "Governance, capacity and institutional news from the corporation.", safety: "Health, safety, environment and quality news from construction sites.", awards: "Recognitions received by Hibir Construction Corporation.", announcements: "Official announcements from Hibir Construction Corporation." };

const NewsCategoryPage = () => {
  const { slug = "" } = useParams();
  const category = NEWS_CATEGORIES.find((c) => categorySlug(c) === slug) as NewsCategory | undefined;
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  useEffect(() => { if (category) void getNewsByCategory(category).then(setArticles); }, [category]);
  if (!category) return <NotFound />;
  const path = `/news/category/${slug}`; const crumbs = [{ name: "Home", path: "/" }, { name: "News", path: "/news" }, { name: category, path }];
  return <main><Seo title={`${category} | Hibir Construction Corporation News`} description={intros[slug] ?? `${category} news from Hibir Construction Corporation.`} path={path} breadcrumbs={crumbs}/><section className="pt-32 pb-12 px-4 md:px-8"><div className="container-custom"><Breadcrumbs crumbs={crumbs} className="mb-8"/><span className="label-eyebrow">Newsroom category</span><h1 className="display-xl text-foreground mt-4">{category}</h1><p className="mt-5 max-w-2xl text-muted-foreground font-body">{intros[slug]}</p></div></section><section className="pb-24 px-4 md:px-8"><div className="container-custom"><NewsGrid articles={articles} emptyMessage="No news is available in this category at the moment."/><div className="mt-12 flex flex-wrap gap-3">{NEWS_CATEGORIES.filter((c) => c !== category).map((c) => <Link key={c} to={`/news/category/${categorySlug(c)}`} className="rounded-full border border-border px-5 py-2 text-sm font-body text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors">{c}</Link>)}<Link to="/news" className="rounded-full border border-border px-5 py-2 text-sm font-body text-accent">All news</Link></div></div></section></main>;
};
export default NewsCategoryPage;
