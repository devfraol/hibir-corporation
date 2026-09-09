import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Seo from "@/components/Seo";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { formatBirr, type Project } from "@/data/projects";
import { getProjectBySlug, getRelatedProjects } from "@/services/projectService";

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
    (async () => {
      const found = await getProjectBySlug(slug);
      if (cancelled) return;
      if (!found) return setState("missing");
      setProject(found);
      setState("ready");
      const rel = await getRelatedProjects(slug);
      if (!cancelled) setRelated(rel);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state === "loading") {
    return (
      <main className="min-h-screen grid place-items-center">
        <Loader2 className="animate-spin text-accent" size={28} aria-label="Loading project" />
      </main>
    );
  }

  if (state === "missing" || !project) {
    return (
      <main className="min-h-screen grid place-items-center px-6 text-center">
        <div>
          <Seo title="Project not found | Hibir Construction Corporation" description="This project is not available." path={`/projects/${slug}`} />
          <h1 className="font-display font-bold text-3xl text-foreground mb-4">Project not found</h1>
          <Link to="/projects" className="btn-accent text-sm">Back to Projects</Link>
        </div>
      </main>
    );
  }

  const facts = [
    { label: "Client", value: project.client },
    { label: "Contractor Role", value: project.contractorRole },
    { label: "Contract Value", value: formatBirr(project.contractValue) },
    { label: "Location", value: project.location },
    { label: "Status", value: project.status },
    { label: "Category", value: project.category },
    { label: "Start Date", value: project.startDate ?? "Not disclosed" },
    { label: "Completion Date", value: project.completionDate ?? (project.status === "Ongoing" ? "In progress" : "Not disclosed") },
  ];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ];

  const seoDescription = `${project.title} — ${project.category.toLowerCase()} project in ${project.location} for ${project.client}, delivered by Hibir Construction Corporation as ${project.contractorRole}. Contract value ${formatBirr(project.contractValue)}. Status: ${project.status}.`;

  return (
    <main>
      <Seo
        title={`${project.title} | Hibir Construction Corporation`}
        description={seoDescription.slice(0, 300)}
        path={`/projects/${project.slug}`}
        image={project.featuredImage.url}
        breadcrumbs={crumbs}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Project",
          name: project.title,
          description: project.description,
          url: absoluteUrl(`/projects/${project.slug}`),
          image: project.featuredImage.url,
          location: { "@type": "Place", name: project.location },
          agent: { "@id": `${SITE_URL}/#organization` },
          sponsor: { "@type": "Organization", name: project.client },
        }}
      />



      {/* HERO */}
      <section className="relative h-[78svh] min-h-[520px] overflow-hidden">
        <motion.img
          src={project.featuredImage.url}
          alt={project.featuredImage.alt}
          style={{ scale: heroScale }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 media-overlay-side" aria-hidden />
        <div className="absolute inset-0 media-overlay" aria-hidden />

        <div className="relative h-full container-custom px-4 md:px-8 flex flex-col justify-end pb-16">
          <Link to="/projects" className="inline-flex items-center gap-2 text-[11px] font-body tracking-[0.2em] uppercase on-media-muted hover:text-accent transition-colors mb-6 w-fit">
            <ArrowLeft size={14} /> All Projects
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold uppercase on-media max-w-4xl leading-[1.06]"
            style={{ fontSize: "clamp(1.9rem, 3.6vw + 0.5rem, 4rem)" }}
          >
            {project.title}
          </motion.h1>
          <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { l: "Status", v: project.status },
              { l: "Location", v: project.location },
              { l: "Client", v: project.client },
              { l: "Contract Value", v: formatBirr(project.contractValue) },
            ].map((f) => (
              <div key={f.l}>
                <div className="text-[9px] font-body tracking-[0.22em] uppercase on-media-muted">{f.l}</div>
                <div className="font-display font-semibold on-media mt-1 text-sm md:text-base">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW + INFORMATION */}
      <AnimatedSection className="section-padding">
        <div className="container-custom grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Project Overview</span>
            <h2 className="section-title mt-3 mb-6">Delivered under a GC-1 general contractor licence</h2>
            <p className="text-muted-foreground font-body leading-relaxed">{project.description}</p>
            <p className="text-muted-foreground font-body leading-relaxed mt-4">
              Hibir Construction Corporation delivers the works with its own workforce of 843 professionals and
              a fleet of 282 vehicles, plants and machinery units, applying the corporation's safety and quality
              management procedures throughout construction.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="surface-card p-7">
              <h3 className="font-display font-bold text-lg text-foreground mb-6">Project Information</h3>
              <dl className="divide-y divide-border">
                {facts.map((f) => (
                  <div key={f.label} className="py-3 flex items-baseline justify-between gap-6">
                    <dt className="text-[11px] font-body tracking-[0.16em] uppercase text-muted-foreground">{f.label}</dt>
                    <dd className="font-body text-sm text-foreground text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* GALLERY */}
      <AnimatedSection className="section-padding pt-0">
        <div className="container-custom">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Project Gallery</span>
          <h2 className="section-title mt-3 mb-8">Site imagery</h2>
          <ProjectGallery images={project.gallery} />
          <p className="mt-6 text-xs font-body text-muted-foreground">
            Representative site imagery. Official project photographs will replace these placeholders.
          </p>
        </div>
      </AnimatedSection>

      {/* PROJECT FACTS */}
      <AnimatedSection className="section-padding pt-0">
        <div className="container-custom grid md:grid-cols-3 gap-6">
          {[
            { t: "Scope", d: `${project.category} works for ${project.client}.` },
            { t: "Contract", d: `${project.contractValue.toLocaleString()} Birr, executed as ${project.contractorRole}.` },
            { t: "Current Status", d: `${project.status} — recorded in the corporation's project register.` },
          ].map((c) => (
            <div key={c.t} className="surface-card p-7">
              <h3 className="font-display font-bold text-base text-foreground mb-2">{c.t}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* RELATED */}
      {related.length > 0 && (
        <AnimatedSection className="section-padding pt-0">
          <div className="container-custom">
            <h2 className="section-title mb-8">Related Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/projects/${p.slug}`} className="group surface-card overflow-hidden hover:border-accent/40">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.featuredImage.url} alt={p.featuredImage.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] font-body tracking-[0.18em] uppercase text-accent mb-2">{p.status}</div>
                    <h3 className="font-display font-bold text-base text-foreground leading-snug group-hover:text-accent transition-colors">{p.title}</h3>
                    <p className="text-xs font-body text-muted-foreground mt-2">{formatBirr(p.contractValue)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* CTA */}
      <AnimatedSection className="section-padding pt-0">
        <div className="container-custom">
          <div className="surface-card p-10 md:p-14 text-center">
            <h2 className="section-title mb-4">Discuss Your Next Infrastructure Project</h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">
              Talk to our team about road, bridge and urban infrastructure delivery across Ethiopia.
            </p>
            <Link to="/contact" className="btn-accent text-sm">
              Contact Hibir <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default ProjectDetail;
