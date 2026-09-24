import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Seo from "@/components/Seo";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectGallery from "@/components/projects/ProjectGallery";
import type { Project } from "@/data/projects";
import { getProjectBySlug, getRelatedProjects } from "@/services/projectService";
import { getServicesForProjectCategory } from "@/data/services";
import Breadcrumbs from "@/components/Breadcrumbs";
import { absoluteUrl, SITE_URL } from "@/config/site";

const dateLabel = (value?: string) => value ? new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T00:00:00`)) : "Not disclosed";

const ProjectDetail = () => {
  const { slug = "" } = useParams();
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
        const found = await getProjectBySlug(slug);
        if (cancelled) return;
        if (!found) return setState("missing");
        setProject(found); setState("ready");
        const rel = await getRelatedProjects(slug);
        if (!cancelled) setRelated(rel);
      } catch {
        if (!cancelled) setState("missing");
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  if (state === "loading") return <main className="min-h-screen grid place-items-center"><Loader2 className="animate-spin text-accent" size={28} aria-label="Loading project" /></main>;
  if (state === "missing" || !project) return <main className="min-h-screen grid place-items-center px-6 text-center"><div><Seo title="Project not found | Hibir Construction Corporation" description="This project is not available." path={`/projects/${slug}`} noindex /><h1 className="font-display font-bold text-3xl text-foreground mb-4">Project not found</h1><p className="mb-8 text-muted-foreground">This project may have moved or is not publicly available.</p><Link to="/projects" className="btn-accent text-sm">Back to Projects</Link></div></main>;

  const heroImage = project.featuredImage.url || project.gallery[0]?.url;
  const seoTitle = project.seoTitle || project.title;
  const seoDescription = (project.seoDescription || project.description).slice(0, 300);
  const path = `/projects/${project.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: project.title, path }];
  const facts = [
    ["Category", project.category], ["Location", project.location], ["Client", project.client], ["Consultant", project.consultant],
    ["Execution status", project.status], ["Contract date", dateLabel(project.contractDate)], ["Completion date", dateLabel(project.completionDate)],
  ].filter(([, value]) => Boolean(value));
  const relatedServices = getServicesForProjectCategory(project.category);

  return <main>
    <Seo title={`${seoTitle} | Hibir Construction Corporation`} description={seoDescription} path={path} image={heroImage} breadcrumbs={crumbs} jsonLd={{ "@context": "https://schema.org", "@type": "Project", name: project.title, description: project.description, url: absoluteUrl(path), ...(heroImage ? { image: absoluteUrl(heroImage) } : {}), location: project.location ? { "@type": "Place", name: project.location } : undefined, agent: { "@id": `${SITE_URL}/#organization` }, ...(project.client ? { sponsor: { "@type": "Organization", name: project.client } } : {}) }} />
    <section className="relative h-[78svh] min-h-[520px] overflow-hidden">
      {heroImage && <motion.img src={heroImage} alt={project.featuredImage.alt || `${project.title} project cover`} style={{ scale: heroScale }} className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 media-overlay-side" aria-hidden /><div className="absolute inset-0 media-overlay" aria-hidden />
      <div className="relative h-full container-custom px-4 md:px-8 flex flex-col justify-end pb-16"><Link to="/projects" className="inline-flex w-fit items-center gap-2 text-[11px] font-body tracking-[0.2em] uppercase on-media-muted hover:text-accent transition-colors mb-6"><ArrowLeft size={14} /> All Projects</Link><motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display font-bold uppercase on-media max-w-4xl leading-[1.06]" style={{ fontSize: "clamp(1.9rem, 3.6vw + 0.5rem, 4rem)" }}>{project.title}</motion.h1><div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">{[["Execution status", project.status], ["Location", project.location], ["Client", project.client]].filter(([, value]) => value).map(([label, value]) => <div key={label}><div className="text-[9px] font-body tracking-[0.22em] uppercase on-media-muted">{label}</div><div className="font-display font-semibold on-media mt-1 text-sm md:text-base">{value}</div></div>)}</div></div>
    </section>
    <div className="container-custom px-4 md:px-8 pt-8"><Breadcrumbs crumbs={crumbs} /></div>
    <AnimatedSection className="section-padding"><div className="container-custom grid lg:grid-cols-12 gap-12"><div className="lg:col-span-7"><span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Project overview</span><h2 className="section-title mt-3 mb-6">{project.title}</h2><p className="whitespace-pre-wrap text-muted-foreground font-body leading-relaxed">{project.description}</p></div><div className="lg:col-span-5"><div className="surface-card p-7"><h2 className="font-display font-bold text-lg text-foreground mb-6">Project information</h2><dl className="divide-y divide-border">{facts.map(([label, value]) => <div key={label} className="py-3 flex items-baseline justify-between gap-6"><dt className="text-[11px] font-body tracking-[0.16em] uppercase text-muted-foreground">{label}</dt><dd className="font-body text-sm text-foreground text-right">{value}</dd></div>)}</dl></div></div></div></AnimatedSection>
    {project.gallery.length > 0 && <AnimatedSection className="section-padding pt-0"><div className="container-custom"><span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Project gallery</span><h2 className="section-title mt-3 mb-8">Site imagery</h2><ProjectGallery images={project.gallery} /></div></AnimatedSection>}
    {related.length > 0 && <AnimatedSection className="section-padding pt-0"><div className="container-custom"><h2 className="section-title mb-8">Related projects</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{related.map((item) => <Link key={item.id} to={`/projects/${item.slug}`} className="group surface-card overflow-hidden hover:border-accent/40"><div className="aspect-[16/10] overflow-hidden"><img src={item.featuredImage.url} alt={item.featuredImage.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" /></div><div className="p-6"><p className="text-[10px] font-body tracking-[0.18em] uppercase text-accent mb-2">{item.category}{item.status ? ` · ${item.status}` : ""}</p><h3 className="font-display font-bold text-base text-foreground group-hover:text-accent">{item.title}</h3><p className="mt-2 text-xs text-muted-foreground">{item.location}</p></div></Link>)}</div></div></AnimatedSection>}
    {relatedServices.length > 0 && <AnimatedSection className="section-padding pt-0"><div className="container-custom"><h2 className="font-display font-bold text-xl text-foreground mb-4">Related services</h2><div className="flex flex-wrap gap-3">{relatedServices.map((service) => <Link key={service.id} to={service.canonicalUrl} className="rounded-full border border-border px-5 py-2 text-sm font-body text-muted-foreground hover:text-accent hover:border-accent/50">{service.name}</Link>)}</div></div></AnimatedSection>}
    <AnimatedSection className="section-padding pt-0"><div className="container-custom"><div className="surface-card p-10 md:p-14 text-center"><h2 className="section-title mb-4">Discuss your next infrastructure project</h2><p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">Talk to our team about road, bridge and urban infrastructure delivery across Ethiopia.</p><Link to="/contact" className="btn-accent text-sm">Contact Hibir <ArrowRight size={16} /></Link></div></div></AnimatedSection>
  </main>;
};
export default ProjectDetail;
