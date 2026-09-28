import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useI18n, localeDate } from "@/i18n";
import { approvedLocalized } from "@/i18n/content";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Seo from "@/components/Seo";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectGallery from "@/components/projects/ProjectGallery";
import type { Project } from "@/types/project";
import { getProjectBySlug, getRelatedProjects } from "@/services/projectService";
import { getServicesForProjectCategory } from "@/data/services";
import Breadcrumbs from "@/components/Breadcrumbs";
import { absoluteUrl, SITE_URL } from "@/config/site";

const dateLabel = (value: string | undefined, locale: "en" | "am", missing: string) => value ? localeDate(`${value}T00:00:00`, locale) : missing;
const statusLabel = (value: string | undefined, am: boolean) => !am ? value : ({ Ongoing: "በሂደት ላይ", Completed: "የተጠናቀቀ", Suspended: "ለጊዜው የተቋረጠ", Terminated: "የተሰረዘ" }[value ?? ""] ?? value);

const ProjectDetail = () => {
  const { slug = "" } = useParams();
  const { locale, path } = useI18n(); const am = locale === "am";
  const copy = am ? { loading: "ፕሮጀክት በመጫን ላይ", missing: "አልተገለጸም", notFound: "ፕሮጀክቱ አልተገኘም", unavailable: "ይህ ፕሮጀክት ተንቀሳቅሶ ወይም ለሕዝብ የማይገኝ ሊሆን ይችላል።", back: "ወደ ፕሮጀክቶች ተመለስ", all: "ሁሉም ፕሮጀክቶች", overview: "የፕሮጀክቱ አጠቃላይ እይታ", info: "የፕሮጀክት መረጃ", gallery: "የፕሮጀክት ምስሎች", imagery: "የቦታ ምስሎች", related: "ተዛማጅ ፕሮጀክቶች", services: "ተዛማጅ አገልግሎቶች", cta: "ስለ ቀጣዩ የመሠረተ ልማት ፕሮጀክትዎ ያነጋግሩን", ctaText: "በኢትዮጵያ ስለሚካሄዱ የመንገድ፣ የድልድይ እና የከተማ መሠረተ ልማት ስራዎች ከቡድናችን ጋር ይነጋገሩ።", contact: "HIBIRን ያግኙ", category: "ምድብ", location: "ቦታ", client: "ደንበኛ", consultant: "አማካሪ", execution: "የአፈጻጸም ሁኔታ", contract: "የውል ቀን", completion: "የማጠናቀቂያ ቀን", home: "መነሻ" } : { loading: "Loading project", missing: "Not disclosed", notFound: "Project not found", unavailable: "This project may have moved or is not publicly available.", back: "Back to Projects", all: "All Projects", overview: "Project overview", info: "Project information", gallery: "Project gallery", imagery: "Site imagery", related: "Related projects", services: "Related services", cta: "Discuss your next infrastructure project", ctaText: "Talk to our team about road, bridge and urban infrastructure delivery across Ethiopia.", contact: "Contact Hibir", category: "Category", location: "Location", client: "Client", consultant: "Consultant", execution: "Execution status", contract: "Contract date", completion: "Completion date", home: "Home" };
  const reduced = useReducedMotion();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1.05, reduced ? 1.05 : 1.15]);

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    void (async () => {
      try {
        const found = await getProjectBySlug(slug, locale);
        if (cancelled) return;
        if (!found) return setState("missing");
        setProject(found); setState("ready");
        const rel = await getRelatedProjects(slug, 3, locale);
        if (!cancelled) setRelated(rel);
      } catch {
        if (!cancelled) setState("missing");
      }
    })();
    return () => { cancelled = true; };
  }, [slug, locale]);

  if (state === "loading") return <main className="min-h-screen grid place-items-center"><Loader2 className="animate-spin text-accent" size={28} aria-label={copy.loading} /></main>;
  if (state === "missing" || !project) return <main className="min-h-screen grid place-items-center px-6 text-center"><div><Seo title={`${copy.notFound} | Hibir Construction Corporation`} description={copy.unavailable} path={path(`/projects/${slug}`)} noindex /><h1 className="font-display font-bold text-3xl text-foreground mb-4">{copy.notFound}</h1><p className="mb-8 text-muted-foreground">{copy.unavailable}</p><Link to={path("/projects")} className="btn-accent text-sm">{copy.back}</Link></div></main>;

  const title = approvedLocalized(locale, project.title, project.titleAm) ?? "—";
  const description = approvedLocalized(locale, project.description, project.descriptionAm) ?? "—";
  const heroImage = project.featuredImage.url || project.gallery[0]?.url;
  const seoTitle = approvedLocalized(locale, project.seoTitle || project.title, project.seoTitleAm || project.titleAm) ?? copy.notFound;
  const seoDescription = (approvedLocalized(locale, project.seoDescription || project.description, project.seoDescriptionAm || project.descriptionAm) ?? "").slice(0, 300);
  const projectPath = path(`/projects/${project.slug}`);
  const crumbs = [{ name: copy.home, path: path("/") }, { name: am ? "ፕሮጀክቶች" : "Projects", path: path("/projects") }, { name: title, path: projectPath }];
  const facts = [
    [copy.category, project.category], [copy.location, project.location], [copy.client, project.client], [copy.consultant, project.consultant],
    [copy.execution, statusLabel(project.status, am)], [copy.contract, dateLabel(project.contractDate, locale, copy.missing)], [copy.completion, dateLabel(project.completionDate, locale, copy.missing)],
  ].filter(([, value]) => Boolean(value));
  const relatedServices = getServicesForProjectCategory(project.category);

  return <main>
    <Seo title={`${seoTitle} | Hibir Construction Corporation`} description={seoDescription} path={projectPath} image={heroImage} breadcrumbs={crumbs} jsonLd={{ "@context": "https://schema.org", "@type": "Project", name: title, description, url: absoluteUrl(projectPath), ...(heroImage ? { image: absoluteUrl(heroImage) } : {}), location: project.location ? { "@type": "Place", name: project.location } : undefined, agent: { "@id": `${SITE_URL}/#organization` }, ...(project.client ? { sponsor: { "@type": "Organization", name: project.client } } : {}) }} />
    <section className="relative h-[78svh] min-h-[520px] overflow-hidden">
      {heroImage && <motion.img src={heroImage} alt={project.featuredImage.alt || title} style={{ scale: heroScale }} className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 media-overlay-side" aria-hidden /><div className="absolute inset-0 media-overlay" aria-hidden />
      <div className="relative h-full container-custom px-4 md:px-8 flex flex-col justify-end pb-16"><Link to={path("/projects")} className="inline-flex w-fit items-center gap-2 text-[11px] font-body tracking-[0.2em] uppercase on-media-muted hover:text-accent transition-colors mb-6"><ArrowLeft size={14} /> {copy.all}</Link><motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display font-bold uppercase on-media max-w-4xl leading-[1.06]" style={{ fontSize: "clamp(1.9rem, 3.6vw + 0.5rem, 4rem)" }}>{title}</motion.h1><div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">{[[copy.execution, statusLabel(project.status, am)], [copy.location, project.location], [copy.client, project.client]].filter(([, value]) => value).map(([label, value]) => <div key={label}><div className="text-[9px] font-body tracking-[0.22em] uppercase on-media-muted">{label}</div><div className="font-display font-semibold on-media mt-1 text-sm md:text-base">{value}</div></div>)}</div></div>
    </section>
    <div className="container-custom px-4 md:px-8 pt-8"><Breadcrumbs crumbs={crumbs} /></div>
    <AnimatedSection className="section-padding"><div className="container-custom grid lg:grid-cols-12 gap-12"><div className="lg:col-span-7"><span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">{copy.overview}</span><h2 className="section-title mt-3 mb-6">{title}</h2><p className="whitespace-pre-wrap text-muted-foreground font-body leading-relaxed">{description}</p></div><div className="lg:col-span-5"><div className="surface-card p-7"><h2 className="font-display font-bold text-lg text-foreground mb-6">{copy.info}</h2><dl className="divide-y divide-border">{facts.map(([label, value]) => <div key={label} className="py-3 flex items-baseline justify-between gap-6"><dt className="text-[11px] font-body tracking-[0.16em] uppercase text-muted-foreground">{label}</dt><dd className="font-body text-sm text-foreground text-right">{value}</dd></div>)}</dl></div></div></div></AnimatedSection>
    {project.gallery.length > 0 && <AnimatedSection className="section-padding pt-0"><div className="container-custom"><span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">{copy.gallery}</span><h2 className="section-title mt-3 mb-8">{copy.imagery}</h2><ProjectGallery images={project.gallery} labels={am ? { open: "ምስል ይክፈቱ", viewer: "የፕሮጀክት ምስል መመልከቻ", close: "የምስል መመልከቻ ዝጋ", previous: "ያለፈው ምስል", next: "ቀጣዩ ምስል" } : undefined} /></div></AnimatedSection>}
    {related.length > 0 && <AnimatedSection className="section-padding pt-0"><div className="container-custom"><h2 className="section-title mb-8">{copy.related}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{related.map((item) => <Link key={item.id} to={path(`/projects/${item.slug}`)} className="group surface-card overflow-hidden hover:border-accent/40"><div className="aspect-[16/10] overflow-hidden"><img src={item.featuredImage.url} alt={item.featuredImage.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" /></div><div className="p-6"><p className="text-[10px] font-body tracking-[0.18em] uppercase text-accent mb-2">{item.category}{item.status ? ` · ${statusLabel(item.status, am)}` : ""}</p><h3 className="font-display font-bold text-base text-foreground group-hover:text-accent">{approvedLocalized(locale, item.title, item.titleAm) ?? "—"}</h3><p className="mt-2 text-xs text-muted-foreground">{item.location}</p></div></Link>)}</div></div></AnimatedSection>}
    {relatedServices.length > 0 && <AnimatedSection className="section-padding pt-0"><div className="container-custom"><h2 className="font-display font-bold text-xl text-foreground mb-4">{copy.services}</h2><div className="flex flex-wrap gap-3">{relatedServices.map((service) => <Link key={service.id} to={path(service.canonicalUrl)} className="rounded-full border border-border px-5 py-2 text-sm font-body text-muted-foreground hover:text-accent hover:border-accent/50">{service.name}</Link>)}</div></div></AnimatedSection>}
    <AnimatedSection className="section-padding pt-0"><div className="container-custom"><div className="surface-card p-10 md:p-14 text-center"><h2 className="section-title mb-4">{copy.cta}</h2><p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">{copy.ctaText}</p><Link to={path("/contact")} className="btn-accent text-sm">{copy.contact} <ArrowRight size={16} /></Link></div></div></AnimatedSection>
  </main>;
};
export default ProjectDetail;
