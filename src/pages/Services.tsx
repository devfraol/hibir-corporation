import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import roadImg from "@/assets/road-construction.jpg";
import { getLocalizedServices, serviceContent } from "@/data/services";
import { absoluteUrl } from "@/config/site";
import { useI18n } from "@/i18n";

const Services = () => {
  const { locale, path } = useI18n();
  const am = locale === "am";
  const copy = am ? {
    home: "መነሻ", services: "አገልግሎቶች", title: "የግንባታ አገልግሎቶች", subtitle: "ለኢትዮጵያ መሠረተ ልማት ፍላጎቶች አጠቃላይ የግንባታ መፍትሔዎች", eyebrow: "የሥራ ድርሻዎችና ኃላፊነቶች", heading: "ከመጀመሪያ እስከ መጨረሻ የመሠረተ ልማት መፍትሔዎች", intro: "ሂቢር ኮንስትራክሽን ኮርፖሬሽን በራሱ ፋብሪካዎች ከሚመረቱ አግሪጌትና አስፋልት ጀምሮ እስከ ተጠናቀቁ መንገዶች፣ ድልድዮችና ሕንፃዎች ድረስ የተሟላ የመሠረተ ልማት መፍትሔ ይሰጣል።", explore: "አገልግሎቱን ይመልከቱ", projects: "አገልግሎቶቻችንን በተግባር ፕሮጀክቶች ላይ ይመልከቱ", emptyTitle: "የአማርኛ አገልግሎቶች ገና አልተገኙም", empty: "የአገልግሎት ይዘቱ በአማርኛ እንዲታተም በማጽደቅ ላይ ነው።"
  } : {
    home: "Home", services: "Services", title: "Construction Services in Ethiopia", subtitle: "Comprehensive construction solutions for Ethiopia's infrastructure needs", eyebrow: "Duties & Responsibilities", heading: "End-to-End Infrastructure Solutions", intro: "As a GC-1 rated general contractor accountable to the Amhara Regional Public Enterprises' Authority, Hibir Construction Corporation delivers complete infrastructure solutions — from aggregate and asphalt production in its own plants through to finished roads, bridges and buildings.", explore: "Explore service", projects: "See these services on live projects", emptyTitle: "No services are available", empty: "Please check back later for available services."
  };
  const services = getLocalizedServices(locale).map((service) => serviceContent(service, locale));
  const crumbs = [{ name: copy.home, path: path("/") }, { name: copy.services, path: path("/services") }];
  const pagePath = path("/services");
  return <main>
    <Seo title={am ? "የግንባታ አገልግሎቶች | Hibir Construction Corporation" : "Construction Services in Ethiopia | Hibir Construction Corporation"} description={am ? "የሂቢር ኮንስትራክሽን ኮርፖሬሽን የግንባታ አገልግሎቶች።" : "Road construction, bridges, buildings, urban infrastructure, road maintenance, materials production, industrial parks and training delivered across Ethiopia by a GC-1 contractor."} path={pagePath} image={roadImg} breadcrumbs={crumbs} jsonLd={{ "@context": "https://schema.org", "@type": "ItemList", name: copy.services, itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: absoluteUrl(path(s.canonicalUrl)) })) }} />
    <PageHero title={copy.title} subtitle={copy.subtitle} image={roadImg} />
    <section className="section-padding"><div className="container-custom"><Breadcrumbs crumbs={crumbs} className="mb-10" />
      <AnimatedSection className="text-center mb-16"><span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">{copy.eyebrow}</span><h2 className="section-title mt-3">{copy.heading}</h2><p className="section-subtitle mx-auto mt-4">{copy.intro}</p></AnimatedSection>
      {services.length ? <div className="space-y-20">{services.map((s, i) => <AnimatedSection key={s.id}><div id={s.slug} className="scroll-mt-28 grid md:grid-cols-2 gap-12 items-center"><div className={i % 2 ? "md:order-2" : ""}><h3 className="font-display font-bold text-2xl mb-4 text-foreground"><Link to={path(s.canonicalUrl)} className="hover:text-accent transition-colors">{s.name}</Link></h3><p className="text-muted-foreground font-body leading-relaxed">{s.description}</p><Link to={path(s.canonicalUrl)} className="inline-flex items-center gap-2 mt-6 text-sm font-body font-semibold text-accent">{copy.explore}<ArrowRight size={16} /></Link></div><div className={`relative overflow-hidden rounded-2xl ${i % 2 ? "md:order-1" : ""}`}><div className="absolute -inset-2 rounded-3xl bg-accent/5 blur-xl" /><img src={s.heroImage} alt={s.heroImageAlt} loading="lazy" className="relative w-full h-72 object-cover rounded-2xl hover:scale-105 transition-transform duration-700" /></div></div></AnimatedSection>)}</div> : <div className="surface-card max-w-2xl mx-auto p-8 text-center"><h3 className="font-display font-bold text-xl text-foreground">{copy.emptyTitle}</h3><p className="mt-3 text-muted-foreground font-body">{copy.empty}</p></div>}
      <AnimatedSection className="mt-20 text-center"><Link to={path("/projects")} className="btn-accent text-sm inline-flex items-center gap-2">{copy.projects}<ArrowRight size={16} /></Link></AnimatedSection>
    </div></section>
  </main>;
};
export default Services;
