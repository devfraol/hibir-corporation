import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import safetyImg from "@/assets/safety-quality.jpg";
import ctaBg from "@/assets/cta-background.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import LatestNews from "@/components/home/LatestNews";
import PartnersMarquee from "@/components/PartnersMarquee";
import Seo from "@/components/Seo";
import { useI18n } from "@/i18n";
import { navLabel } from "@/i18n/content";
import { companyStats } from "@/data/company";
import { services } from "@/data/services";

const n = (v: number) => v.toLocaleString("en-US");

export default function Home() {
  const { locale, path } = useI18n();
  const am = locale === "am";
  const text = (en: string, amh: string) => (am ? amh : en);
  const s = companyStats;

  const milestones = [
    ["2010", text("Proclamation No. 71/2010", "አዋጅ ቁጥር 71/2010"), text("Established as Amhara Road Works Enterprise", "የአማራ መንገድ ሥራዎች ድርጅት ተቋቋመ")],
    ["2018", text("Proclamation No. 170/2018", "አዋጅ ቁጥር 170/2018"), text("Re-established", "እንደገና ተቋቋመ")],
    ["2024", text("Proclamation No. 214/2024", "አዋጅ ቁጥር 214/2024"), text("Elevated to corporation status", "ወደ ኮርፖሬሽን ደረጃ አደገ")],
  ];

  const capabilities = services.slice(0, 5);

  return (
    <main id="main-content">
      <Seo
        path={am ? "/am" : "/"}
        title={text("Hibir Construction Corporation | Roads, Bridges & Infrastructure in Ethiopia", "ሂቢር ኮንስትራክሽን ኮርፖሬሽን | በኢትዮጵያ የግንባታና መሠረተ ልማት")}
        description={text(
          "Government-owned GC-1 contractor headquartered in Bahir Dar, building roads, bridges, buildings and urban infrastructure with 843 staff and 282 vehicles, plants and machinery.",
          "ሂቢር ኮንስትራክሽን ኮርፖሬሽን በኢትዮጵያ መንገዶችን፣ ድልድዮችን፣ ሕንፃዎችንና የከተማ መሠረተ ልማቶችን ይገነባል።",
        )}
      />
      <Hero />

      {/* 2 — Corporate introduction */}
      <section aria-labelledby="intro-heading" className="section-padding border-b border-border">
        <div className="container-custom grid gap-14 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-7">
            <span className="label-eyebrow">{text("Who We Are", "እኛ ማን ነን")}</span>
            <h2 id="intro-heading" className="section-title mt-4 max-w-2xl">
              {text("A public enterprise built to deliver the region's infrastructure", "የክልሉን መሠረተ ልማት ለማቅረብ የተቋቋመ የመንግሥት ድርጅት")}
            </h2>
            <p className="mt-8 text-lg text-foreground/85 font-body leading-relaxed max-w-2xl">
              {text(
                "Hibir Construction Corporation is a government-owned enterprise accountable to the Amhara Regional Public Enterprises Authority, with its head office in Bahir Dar, Amhara Regional State.",
                "ሂቢር ኮንስትራክሽን ኮርፖሬሽን ለአማራ ክልል የመንግሥት የልማት ድርጅቶች ባለሥልጣን ተጠሪ የሆነና ዋና መሥሪያ ቤቱ በባሕር ዳር የሚገኝ የመንግሥት ድርጅት ነው።",
              )}
            </p>
            <Link to={path("/about")} className="mt-10 inline-flex items-center gap-2 text-sm font-body font-semibold uppercase tracking-[0.18em] text-accent hover:gap-3 transition-all">
              {text("About Hibir", "ስለ ሂቢር")} <ArrowRight size={16} aria-hidden />
            </Link>
          </AnimatedSection>
          <AnimatedSection className="lg:col-span-5">
            <ol className="border-l border-border">
              {milestones.map(([year, law, what]) => (
                <li key={year} className="relative pl-8 pb-10 last:pb-0">
                  <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
                  <p className="font-display text-3xl font-bold text-foreground">{year}</p>
                  <p className="mt-1 text-xs font-body uppercase tracking-[0.16em] text-accent">{law}</p>
                  <p className="mt-2 font-body text-muted-foreground">{what}</p>
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </div>
      </section>

      {/* 3 — Corporate scale */}
      <section id="at-a-glance" aria-labelledby="scale-heading" className="section-padding scroll-mt-24">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mb-14">
            <span className="label-eyebrow">{text("Corporate Scale", "የድርጅቱ አቅም")}</span>
            <h2 id="scale-heading" className="section-title mt-4">{text("The capacity behind our work", "ከሥራችን ጀርባ ያለው አቅም")}</h2>
          </AnimatedSection>
          <dl className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              [n(s.staff), text("Staff", "ሠራተኞች"), ""],
              [n(s.totalAssets), text("Vehicles, plants & machinery", "ተሽከርካሪዎች፣ ፕላንቶችና ማሽነሪዎች"), text(`${s.vehicles} vehicles · ${s.plants} plants · ${s.machinery} machinery`, `${s.vehicles} ተሽከርካሪዎች · ${s.plants} ፕላንቶች · ${s.machinery} ማሽነሪዎች`)],
              [s.contractorGrade, text("Contractor classification", "የተቋራጭ ደረጃ"), ""],
              ["ETB 3.4B+", text("Annual turnover", "ዓመታዊ ገቢ"), ""],
              ["ETB 25B+", text("Active project contracts", "ንቁ የፕሮጀክት ውሎች"), ""],
              ["ETB 929M+", text("Recorded capital", "የተመዘገበ ካፒታል"), ""],
            ].map(([value, label, detail]) => (
              <div key={label} className="bg-background p-8 md:p-10 flex flex-col">
                <dt className="order-2 mt-3 text-sm font-body uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
                <dd className="order-1 font-display text-4xl md:text-5xl font-bold text-foreground">{value}</dd>
                {detail && <dd className="order-3 mt-2 text-sm font-body text-accent">{detail}</dd>}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4 — Capabilities */}
      <section aria-labelledby="capabilities-heading" className="section-padding bg-surface">
        <div className="container-custom">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <AnimatedSection className="max-w-2xl">
              <span className="label-eyebrow">{text("Capabilities", "አገልግሎቶቻችን")}</span>
              <h2 id="capabilities-heading" className="section-title mt-4">{text("What we build", "የምንገነባው")}</h2>
            </AnimatedSection>
            <Link to={path("/services")} className="inline-flex items-center gap-2 text-sm font-body font-semibold uppercase tracking-[0.18em] text-accent hover:gap-3 transition-all">
              {text("All services", "ሁሉም አገልግሎቶች")} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            {capabilities.map((svc, i) => (
              <Link
                key={svc.slug}
                to={path(`/services/${svc.slug}`)}
                className={`group relative overflow-hidden bg-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${i === 0 ? "lg:col-span-7 lg:row-span-2" : i < 3 ? "lg:col-span-5" : "lg:col-span-6"}`}
              >
                <div className={`overflow-hidden ${i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-[420px]" : "aspect-[16/9]"}`}>
                  <img src={svc.heroImage} alt={svc.heroImageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">{navLabel(locale, svc.name)}</h3>
                    <ArrowUpRight size={20} className="shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </div>
                  {!am && <p className="mt-3 text-sm font-body text-muted-foreground leading-relaxed line-clamp-3">{svc.shortDescription}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Featured projects (live published data) */}
      <ProjectShowcase />

      {/* Clients & partners */}
      <section id="partnerships" aria-labelledby="partners-heading" className="py-16 md:py-20 overflow-hidden border-y border-border">
        <div className="container-custom mb-10">
          <span className="label-eyebrow">{text("Clients & Strategic Partners", "ደንበኞችና ስትራቴጂካዊ አጋሮች")}</span>
          <h2 id="partners-heading" className="section-title mt-3 text-2xl md:text-3xl">{text("Working with national and regional institutions", "ከብሔራዊና ክልላዊ ተቋማት ጋር በመሥራት")}</h2>
        </div>
        <PartnersMarquee />
      </section>

      {/* 6 — Quality, safety, responsibility */}
      <section aria-labelledby="quality-heading" className="section-padding">
        <div className="container-custom grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedSection>
            <img src={safetyImg} alt={text("Hibir site team wearing protective equipment", "የመከላከያ መሣሪያ የለበሱ የሂቢር ሠራተኞች")} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </AnimatedSection>
          <AnimatedSection>
            <span className="label-eyebrow">{text("Our Standards", "መለኪያዎቻችን")}</span>
            <h2 id="quality-heading" className="section-title mt-4">{text("Quality, safety and responsible delivery", "ጥራት፣ ደህንነትና ኃላፊነት የተሞላበት አፈጻጸም")}</h2>
            <dl className="mt-10 divide-y divide-border border-y border-border">
              {[
                [text("Safety", "ደህንነት"), text("The corporation follows scientific HSE procedures to ensure a safe workplace.", "ኮርፖሬሽኑ ደህንነቱ የተጠበቀ የሥራ ቦታ ለማረጋገጥ ሳይንሳዊ የHSE ሂደቶችን ይከተላል።")],
                [text("Quality", "ጥራት"), text("Quality control is maintained through planned supervision and management reviews.", "የጥራት ቁጥጥር በታቀደ ቁጥጥርና በአስተዳደር ግምገማ ይጠበቃል።")],
                [text("Mission", "ተልዕኮ"), text("Building infrastructures with the desired quality, on time.", "የሚፈለገውን ጥራት የጠበቀ መሠረተ ልማት በወቅቱ መገንባት።")],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-2 py-6 sm:grid-cols-[140px_1fr]">
                  <dt className="font-display font-semibold text-foreground">{k}</dt>
                  <dd className="font-body text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <Link to={path("/safety")} className="mt-8 inline-flex items-center gap-2 text-sm font-body font-semibold uppercase tracking-[0.18em] text-accent hover:gap-3 transition-all">
              {text("Safety & Quality", "ደህንነትና ጥራት")} <ArrowRight size={16} aria-hidden />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 7 — Latest news (published only) */}
      <LatestNews />

      {/* 8 — Closing CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <img src={ctaBg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/90" aria-hidden />
        <div className="relative container-custom grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <h2 className="section-title">{text("Discuss your next infrastructure project with Hibir", "ቀጣዩን የመሠረተ ልማት ፕሮጀክትዎን ከሂቢር ጋር ይወያዩ")}</h2>
            <p className="mt-5 text-muted-foreground font-body">{text("Contact our Bahir Dar head office or explore the projects we have delivered.", "የባሕር ዳር ዋና መሥሪያ ቤታችንን ያግኙ ወይም ያከናወንናቸውን ፕሮጀክቶች ይመልከቱ።")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={path("/contact")} className="btn-accent inline-flex items-center justify-center gap-2">{text("Contact Us", "ያግኙን")} <ArrowRight size={18} aria-hidden /></Link>
            <Link to={path("/projects")} className="btn-primary inline-flex items-center justify-center gap-2">{text("View Projects", "ፕሮጀክቶችን ይመልከቱ")}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
