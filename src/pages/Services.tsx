import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import roadImg from "@/assets/road-construction.jpg";
import { services } from "@/data/services";
import { absoluteUrl } from "@/config/site";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const Services = () => (
  <main>
    <Seo
      title="Construction Services in Ethiopia | Hibir Construction Corporation"
      description="Road construction, bridges, buildings, urban infrastructure, road maintenance, materials production, industrial parks and training delivered across Ethiopia by a GC-1 contractor."
      path="/services"
      image={roadImg}
      breadcrumbs={crumbs}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Construction services offered by Hibir Construction Corporation",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: absoluteUrl(s.canonicalUrl),
        })),
      }}
    />

    <PageHero
      title="Construction Services in Ethiopia"
      subtitle="Comprehensive construction solutions for Ethiopia's infrastructure needs"
      image={roadImg}
    />

    <section className="section-padding">
      <div className="container-custom">
        <Breadcrumbs crumbs={crumbs} className="mb-10" />

        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">
            Duties & Responsibilities
          </span>
          <h2 className="section-title mt-3">End-to-End Infrastructure Solutions</h2>
          <p className="section-subtitle mx-auto mt-4">
            As a GC-1 rated general contractor accountable to the Amhara Regional Public Enterprises' Authority,
            Hibir Construction Corporation delivers complete infrastructure solutions — from aggregate and asphalt
            production in its own plants through to finished roads, bridges and buildings.
          </p>
        </AnimatedSection>

        <div className="space-y-20">
          {services.map((s, i) => (
            <AnimatedSection key={s.id}>
              <div id={s.slug} className="scroll-mt-28 grid md:grid-cols-2 gap-12 items-center">
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className="font-display font-bold text-2xl mb-4 text-foreground">
                    <Link to={s.canonicalUrl} className="hover:text-accent transition-colors">
                      {s.name}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{s.description}</p>
                  <Link
                    to={s.canonicalUrl}
                    className="inline-flex items-center gap-2 mt-6 text-sm font-body font-semibold text-accent"
                  >
                    Explore {s.name.toLowerCase()} <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={`relative overflow-hidden rounded-2xl ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="absolute -inset-2 rounded-3xl bg-accent/5 blur-xl" />
                  <img
                    src={s.heroImage}
                    alt={s.heroImageAlt}
                    loading="lazy"
                    className="relative w-full h-72 object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-20 text-center">
          <Link to="/projects" className="btn-accent text-sm inline-flex items-center gap-2">
            See these services on live projects <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Services;
