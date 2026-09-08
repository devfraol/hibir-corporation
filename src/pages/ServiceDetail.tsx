import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import NotFound from "@/pages/NotFound";
import { getServiceBySlug, getServicesBySlugs } from "@/data/services";
import { projects, formatBirr } from "@/data/projects";
import { newsArticles } from "@/data/news";
import { absoluteUrl, companyData, SITE_URL } from "@/config/site";

const ServiceDetail = () => {
  const { slug = "" } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <NotFound />;

  const relatedProjects = projects
    .filter((p) => (service.projectCategories as string[]).includes(p.category))
    .slice(0, 4);

  const relatedNews = newsArticles
    .filter(
      (a) =>
        a.status === "published" &&
        (a.tags.some((t) => service.newsTags.includes(t.toLowerCase())) ||
          service.newsTags.includes(a.category.toLowerCase())),
    )
    .slice(0, 3);

  const relatedServices = getServicesBySlugs([...service.relatedServices]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: service.canonicalUrl },
  ];

  return (
    <main>
      <Seo
        title={service.seoTitle}
        description={service.seoDescription}
        path={service.canonicalUrl}
        image={service.heroImage}
        breadcrumbs={crumbs}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.name,
          description: service.description,
          url: absoluteUrl(service.canonicalUrl),
          areaServed: companyData.areasServed.map((a) => ({ "@type": "Place", name: a })),
          provider: { "@id": `${SITE_URL}/#organization` },
        }}
      />

      <section className="relative pt-32 pb-14 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden />
        <div className="container-custom relative max-w-4xl">
          <Breadcrumbs crumbs={crumbs} className="mb-8" />
          <span className="label-eyebrow">Construction services</span>
          <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight tracking-tight text-foreground mt-4">
            {service.h1}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed">{service.description}</p>
        </div>
      </section>

      <div className="px-4 md:px-8">
        <figure className="container-custom max-w-5xl">
          <img
            src={service.heroImage}
            alt={service.heroImageAlt}
            loading="lazy"
            className="w-full aspect-[16/9] object-cover rounded-3xl border border-border"
          />
        </figure>
      </div>

      <section className="section-padding">
        <div className="container-custom max-w-4xl space-y-12">
          {service.sections.map((s) => (
            <AnimatedSection key={s.heading}>
              <h2 className="font-display font-bold text-2xl text-foreground mb-3">{s.heading}</h2>
              <p className="text-muted-foreground font-body leading-relaxed">{s.body}</p>
            </AnimatedSection>
          ))}

          <AnimatedSection>
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">Capabilities</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.capabilities.map((c) => (
                <li
                  key={c}
                  className="rounded-xl border border-border px-4 py-3 text-sm font-body text-muted-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section-padding border-t border-border">
          <div className="container-custom">
            <span className="label-eyebrow">Evidence</span>
            <h2 className="section-title mt-3 mb-10">Related {service.name} Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.slug}`}
                  className="group rounded-2xl border border-border overflow-hidden hover:border-accent/50 transition-colors"
                >
                  <img
                    src={p.featuredImage.url}
                    alt={p.featuredImage.alt}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-sm text-foreground leading-snug">{p.title}</h3>
                    <p className="mt-2 text-xs font-body text-muted-foreground">
                      {p.location} · {formatBirr(p.contractValue)} · {p.status}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 mt-8 text-sm font-body font-semibold text-accent">
              View all construction projects <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {relatedNews.length > 0 && (
        <section className="section-padding border-t border-border">
          <div className="container-custom max-w-4xl">
            <span className="label-eyebrow">Newsroom</span>
            <h2 className="section-title mt-3 mb-8">Related News</h2>
            <ul className="space-y-4">
              {relatedNews.map((a) => (
                <li key={a.id}>
                  <Link to={`/news/${a.slug}`} className="group block rounded-xl border border-border p-5 hover:border-accent/50 transition-colors">
                    <span className="text-[11px] font-body tracking-[0.16em] uppercase text-accent">{a.category}</span>
                    <h3 className="font-display font-semibold text-foreground mt-2 group-hover:text-accent transition-colors">{a.title}</h3>
                    <p className="text-sm font-body text-muted-foreground mt-2">{a.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-padding border-t border-border">
        <div className="container-custom max-w-4xl">
          <h2 className="section-title mb-8">Other Services</h2>
          <div className="flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link
                key={s.id}
                to={s.canonicalUrl}
                className="rounded-full border border-border px-5 py-2 text-sm font-body text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-border p-8 md:p-10">
            <h2 className="font-display font-bold text-2xl text-foreground">
              Discuss a {service.name.toLowerCase()} project
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-2xl">
              Hibir Construction Corporation works with federal, regional and city clients from its head office in
              Bahir Dar, Amhara Regional State.
            </p>
            <Link to="/contact" className="btn-accent text-sm inline-flex items-center gap-2 mt-6">
              Contact Hibir <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;
