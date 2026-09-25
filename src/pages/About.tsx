import { Target, Eye, Heart, Users, Shield, Calendar, Zap } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import heroImg from "@/assets/hero-construction.jpg";
import PartnersMarquee from "@/components/PartnersMarquee";
import DocumentGallery from "@/components/DocumentGallery";
import { certificates, companyProfile, companyStats, legalEntities, partners } from "@/data/company";
import Seo from "@/components/Seo";
import { useI18n } from "@/i18n";

/**
 * Company facts remain sourced from the company profile. Amharic fields deliberately
 * stay optional until an approved corporate translation is supplied through the CMS.
 * The public page never presents English corporate content as Amharic.
 */
type LocalizedCompanyText = { en: string; am?: string };
const missingAmharic = "የተፈቀደ የአማርኛ ትርጉም ገና አልተገኘም።";
const localized = (en: string): LocalizedCompanyText => ({ en });

const values = companyProfile.values.map((value, index) => ({
  ...value,
  content: localized(value.desc),
  icon: [<Users size={28} />, <Target size={28} />, <Zap size={28} />, <Shield size={28} />, <Heart size={28} />][index],
}));
const timeline = [
  { year: "2010", title: localized("Establishment"), desc: localized("Founded as 'Amhara Road Works Enterprise' by Proclamation No. 71/2010 on January 26, 2010, with authorized capital of Birr 500 Million (115M cash + 186.7M in kind).") },
  { year: "2018", title: localized("Re-establishment"), desc: localized("Re-established by Proclamation No. 170/2018 on March 31, 2018 with recorded capital of Birr 929.3 Million (220.2M cash + 709M in kind).") },
  { year: "2024", title: localized("Corporation Upgrade"), desc: localized("Upgraded to corporation level by Proclamation No. 214/2024, renamed to 'Hibir Construction Corporation' with expanded mandate and resources.") },
];

const About = () => {
  const { locale, path } = useI18n();
  const am = locale === "am";
  const ui = (en: string, amh: string) => am ? amh : en;
  const companyText = (value: LocalizedCompanyText) => am ? value.am ?? missingAmharic : value.en;
  const crumbs = am
    ? [{ name: "መነሻ", path: "/am" }, { name: "ስለ ሂቢር", path: "/am/about" }]
    : [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  const seoTitle = ui("About Hibir Construction Corporation | Ethiopia", "ስለ ሂቢር | ሂቢር ኮንስትራክሽን ኮርፖሬሽን");
  const seoDescription = ui(
    "Hibir Construction Corporation is a government-owned GC-1 contractor in Bahir Dar, Amhara Regional State.",
    "ሂቢር ኮንስትራክሽን ኮርፖሬሽን በባሕር ዳር የሚገኝ የመንግሥት GC-1 የግንባታ ተቋራጭ ነው።",
  );
  const documentProps = (items: typeof legalEntities | typeof certificates, kind: "legal" | "certificate") => items.map((item) => {
    if (kind === "legal") {
      const legal = item as typeof legalEntities[number];
      return { id: legal.id, title: legal.title, documentType: legal.documentType, description: am ? missingAmharic : legal.description, image: legal.image, meta: legal.reference };
    }
    const certificate = item as typeof certificates[number];
    return { id: certificate.id, title: certificate.title, documentType: certificate.type, description: am ? missingAmharic : certificate.description, image: certificate.image, meta: `${certificate.issuedBy} — ${certificate.issueDate}` };
  });

  return <main>
    <Seo title={seoTitle} description={seoDescription} path={path("/about")} breadcrumbs={crumbs} />
    <PageHero title={ui("About Us", "ስለ ሂቢር")} subtitle={ui("Ethiopia's premier government-owned construction corporation since 2010", "ከ2010 ጀምሮ የኢትዮጵያ ቀዳሚ የመንግሥት የግንባታ ኮርፖሬሽን")} image={heroImg} />
    <div className="container-custom py-5"><Breadcrumbs crumbs={crumbs} /></div>

    <AnimatedSection id="overview" className="section-padding scroll-mt-24">
      <div className="container-custom grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="label-eyebrow">{ui("Company Overview", "የድርጅቱ አጠቃላይ እይታ")}</span>
          <h2 className="section-title mt-3 mb-6">{ui("Who We Are", "እኛ ማን ነን")}</h2>
          {companyProfile.overview.map((paragraph) => <p key={paragraph} className="text-muted-foreground font-body leading-relaxed mb-4">{companyText(localized(paragraph))}</p>)}
        </div>
        <div className="space-y-6">
          {[[Eye, "Our Vision", "ራዕያችን", companyProfile.vision], [Target, "Our Mission", "ተልዕኳችን", companyProfile.mission]].map(([Icon, en, amh, statement]) => {
            const Mark = Icon as typeof Eye;
            return <div key={en as string} className="glass-card p-8"><div className="flex items-center gap-3 mb-4"><Mark className="text-accent" size={24} /><h3 className="font-display font-semibold text-xl text-foreground">{ui(en as string, amh as string)}</h3></div><p className="text-muted-foreground font-body leading-relaxed italic">“{companyText(localized(statement as string))}”</p></div>;
          })}
        </div>
      </div>
    </AnimatedSection>

    <section id="approach" className="section-padding relative overflow-hidden scroll-mt-24"><div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" /><div className="container-custom relative z-10"><AnimatedSection className="text-center mb-16"><span className="label-eyebrow">{ui("Our Approach", "የአሰራር አቀራረባችን")}</span><h2 className="section-title mt-3">{ui("How We Work", "እንዴት እንደምንሰራ")}</h2></AnimatedSection><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[[Target, "Strict Scheduling", "ጥብቅ የጊዜ ሰሌዳ"], [Users, "Stakeholder Partnership", "ከባለድርሻ አካላት ጋር አጋርነት"], [Eye, "Monitoring & Evaluation", "ክትትልና ግምገማ"], [Shield, "Contract Management", "የኮንትራት አስተዳደር"]].map(([Icon, en, amh], i) => { const Mark = Icon as typeof Eye; return <AnimatedSection key={en as string} delay={i * .08}><div className="glass-card p-7 h-full text-center"><div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-5"><Mark size={24} /></div><h3 className="font-display font-semibold mb-2 text-foreground">{ui(en as string, amh as string)}</h3><p className="text-muted-foreground text-sm font-body">{am ? missingAmharic : ["Rigorous project scheduling and planning for on-time delivery.", "Partnering and good communication with all project stakeholders.", "Strong and timely project monitoring and evaluation systems.", "Professional contractual project management at every stage."][i]}</p></div></AnimatedSection>; })}</div></div></section>

    <section id="history" className="section-padding scroll-mt-24"><div className="container-custom"><AnimatedSection className="text-center mb-16"><span className="label-eyebrow">{ui("Our Journey", "ጉዟችን")}</span><h2 className="section-title mt-3">{ui("Key Milestones", "ዋና ዋና ምዕራፎች")}</h2></AnimatedSection><div className="relative max-w-3xl mx-auto"><div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />{timeline.map((item, i) => <AnimatedSection key={item.year} delay={i * .15}><div className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}><div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}><h3 className="font-display font-bold text-lg text-foreground">{companyText(item.title)}</h3><p className="text-muted-foreground text-sm font-body mt-1">{companyText(item.desc)}</p></div><div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gold-gradient)", color: "hsl(220 60% 8%)" }}><Calendar size={18} /></div><div className="flex-1"><span className="text-accent font-display font-bold text-2xl">{item.year}</span><div className="md:hidden mt-2"><h3 className="font-display font-bold text-lg text-foreground">{companyText(item.title)}</h3><p className="text-muted-foreground text-sm font-body mt-1">{companyText(item.desc)}</p></div></div></div></AnimatedSection>)}</div></div></section>

    <section id="values" className="section-padding scroll-mt-24"><div className="container-custom"><AnimatedSection className="text-center mb-16"><span className="label-eyebrow">{ui("Core Values", "መሠረታዊ እሴቶች")}</span><h2 className="section-title mt-3">{ui("What Drives Us", "የሚመሩን እሴቶች")}</h2></AnimatedSection><div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">{values.map((value, i) => <AnimatedSection key={value.title} delay={i * .08}><div className="glass-card p-6 text-center h-full"><div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">{value.icon}</div><h3 className="font-display font-semibold mb-2 text-foreground">{am ? missingAmharic : value.title}</h3><p className="text-muted-foreground text-sm font-body">{companyText(value.content)}</p></div></AnimatedSection>)}</div></div></section>

    <section id="objectives" className="section-padding scroll-mt-24"><div className="container-custom"><AnimatedSection className="text-center mb-14"><span className="label-eyebrow">{ui("Mandate", "ሥልጣን")}</span><h2 className="section-title mt-3">{ui("Objectives & Duties", "ዓላማዎችና ተግባራት")}</h2></AnimatedSection><div className="grid md:grid-cols-2 gap-6">{[...companyProfile.objectives, ...companyProfile.duties].map((item, i) => <AnimatedSection key={item} delay={i * .06}><div className="glass-card p-6 flex gap-4 h-full"><span className="font-display font-bold text-accent text-sm shrink-0">{String(i + 1).padStart(2, "0")}</span><p className="text-muted-foreground font-body text-sm leading-relaxed">{companyText(localized(item))}</p></div></AnimatedSection>)}</div></div></section>

    <section id="why-hibir" className="section-padding relative overflow-hidden scroll-mt-24"><div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" /><div className="container-custom relative z-10"><AnimatedSection className="text-center mb-14"><span className="label-eyebrow">{ui("Why Hibir", "ለምን ሂቢር")}</span><h2 className="section-title mt-3">{ui("Why Clients Choose Us", "ደንበኞች የሚመርጡንበት ምክንያት")}</h2></AnimatedSection><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[[companyStats.contractorGrade, "Grade One general contractor licence", "አንደኛ ደረጃ ጠቅላላ ተቋራጭ ፈቃድ"], [`${companyStats.staff}`, "In-house professionals and operators", "የውስጥ ባለሙያዎችና ኦፕሬተሮች"], [`${companyStats.totalAssets}`, "Owned vehicles, plants and machinery", "የተሽከርካሪ፣ ፕላንትና ማሽነሪ ንብረቶች"], ["25B+", "Birr active contract portfolio", "በብር የሚገለጽ ንቁ የውል ፖርትፎሊዮ"]].map(([value, en, amh], i) => <AnimatedSection key={en} delay={i * .08}><div className="glass-card p-7 h-full text-center"><div className="text-3xl font-display font-bold text-gradient-gold">{value}</div><p className="text-muted-foreground text-sm font-body mt-2">{ui(en, amh)}</p></div></AnimatedSection>)}</div></div></section>

    <section id="partnerships" className="py-20 overflow-hidden scroll-mt-24"><div className="container-custom"><AnimatedSection className="text-center mb-12"><span className="label-eyebrow">{ui("Partnerships", "አጋርነቶች")}</span><h2 className="section-title mt-3">{ui("Clients & Strategic Partners", "ደንበኞችና ስትራቴጂያዊ አጋሮች")}</h2><p className="text-muted-foreground font-body mt-4 max-w-2xl mx-auto">{ui(`${partners.length} national, regional and city-level institutions we deliver infrastructure with.`, `ከ${partners.length} ብሔራዊ፣ ክልላዊና የከተማ ተቋማት ጋር መሠረተ ልማት እናከናውናለን።`)}</p></AnimatedSection></div><PartnersMarquee /></section>

    <section id="legal-entities" className="section-padding scroll-mt-24"><div className="container-custom"><AnimatedSection className="text-center mb-14"><span className="label-eyebrow">{ui("Governance", "አስተዳደር")}</span><h2 className="section-title mt-3">{ui("Legal Entities & Registrations", "ሕጋዊ ሰነዶችና ምዝገባዎች")}</h2></AnimatedSection><DocumentGallery placeholderLabel={ui("Legal Document", "ሕጋዊ ሰነድ")} documents={documentProps(legalEntities, "legal")} labels={am ? { pending: "የሰነድ ቅድመ እይታ በመጠባበቅ ላይ", view: "ሰነድ ይመልከቱ", close: "የሰነድ መመልከቻን ዝጋ", previous: "ያለፈው ሰነድ", next: "ቀጣዩ ሰነድ" } : undefined} /></div></section>
    <section id="certifications" className="section-padding scroll-mt-24"><div className="container-custom"><AnimatedSection className="text-center mb-14"><span className="label-eyebrow">{ui("Recognition", "እውቅና")}</span><h2 className="section-title mt-3">{ui("Certifications & Awards", "ማረጋገጫዎችና ሽልማቶች")}</h2></AnimatedSection><DocumentGallery placeholderLabel={ui("Certificate", "ማረጋገጫ")} documents={documentProps(certificates, "certificate")} labels={am ? { pending: "የሰነድ ቅድመ እይታ በመጠባበቅ ላይ", view: "ሰነድ ይመልከቱ", close: "የሰነድ መመልከቻን ዝጋ", previous: "ያለፈው ሰነድ", next: "ቀጣዩ ሰነድ" } : undefined} /></div></section>
    <AnimatedSection className="section-padding"><div className="container-custom"><div className="glass-card p-8 md:p-10"><h3 className="font-display font-semibold text-xl mb-8 text-center text-foreground">{ui("Corporate Registration", "የኮርፖሬሽኑ ምዝገባ")}</h3><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[["Registration No.", "የምዝገባ ቁጥር", "980/2008"], ["TIN", "የግብር መለያ ቁጥር", "0013324621"], ["VAT Registration", "የተጨማሪ እሴት ታክስ ምዝገባ", "3028900006"], ["Contractor Grade", "የተቋራጭ ደረጃ", "GC-1 (Grade One)"]].map(([en, amh, value]) => <div key={en} className="text-center"><p className="text-muted-foreground text-xs font-body uppercase tracking-wider mb-1">{ui(en, amh)}</p><p className="font-display font-bold text-foreground text-lg">{value}</p></div>)}</div></div></div></AnimatedSection>
  </main>;
};

export default About;
