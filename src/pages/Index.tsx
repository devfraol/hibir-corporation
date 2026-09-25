import { Link } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle, Factory, HardHat, Shield, Truck, Wrench } from "lucide-react";
import aboutImg from "@/assets/WhoWeAre.png";
import safetyImg from "@/assets/safety-quality.jpg";
import ctaBg from "@/assets/cta-background.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import Hero from "@/components/Hero";
import StatsSection from "@/components/home/StatsSection";
import Timeline from "@/components/home/Timeline";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import LatestNews from "@/components/home/LatestNews";
import PartnersMarquee from "@/components/PartnersMarquee";
import Seo from "@/components/Seo";
import { useI18n } from "@/i18n";

const services = [
  [HardHat, "Road Construction", "Design and construction of highways, urban roads, and rural access roads across Ethiopia's diverse terrain.", "የመንገድ ግንባታ", "በኢትዮጵያ የተለያዩ መልከዓ ምድሮች ላይ የአውራ መንገድ፣ የከተማና የገጠር መዳረሻ መንገዶችን እንነድፋለን እንገነባለን።"],
  [Building2, "Asphalt & Infrastructure", "Full-service asphalt production and laying from our own plants for durable road surfaces.", "አስፋልትና መሠረተ ልማት", "ዘላቂ የመንገድ ንጣፍ ለማቅረብ በራሳችን ፕላንቶች አስፋልት እናመርታለን እናስፋለን።"],
  [Truck, "Bridge Construction", "Engineering and construction of reinforced concrete bridges, culverts, and drainage structures.", "የድልድይ ግንባታ", "የተጠናከሩ የኮንክሪት ድልድዮችን፣ ካልቨርቶችንና የፍሳሽ መዋቅሮችን በምሕንድስና እንገነባለን።"],
  [Wrench, "Road Maintenance", "Comprehensive rehabilitation and upgrading of existing road networks to extend service life.", "የመንገድ ጥገና", "የነባር የመንገድ መረቦችን የአገልግሎት ዕድሜ ለማራዘም እናሻሽላለን እናድሳለን።"],
  [Factory, "Material Production", "Production and supply of crushed aggregate, asphalt, and concrete from our own plants and quarries.", "የቁሳቁስ ምርት", "ከራሳችን ፕላንቶችና ቋራዎች የተፈጨ ድንጋይ፣ አስፋልትና ኮንክሪት እናመርታለን እናቀርባለን።"],
];

export default function Home() {
  const { locale, path } = useI18n(); const am = locale === "am";
  const text = (en: string, amh: string) => am ? amh : en;
  return <main id="main-content">
    <Seo path={am ? "/am" : "/"} title={text("Hibir Construction Corporation | Construction & Infrastructure in Ethiopia", "ሂቢር ኮንስትራክሽን ኮርፖሬሽን | በኢትዮጵያ የግንባታና መሠረተ ልማት መሪ")} description={text("Hibir Construction Corporation builds roads, bridges, buildings and urban infrastructure across Ethiopia.", "ሂቢር ኮንስትራክሽን ኮርፖሬሽን በኢትዮጵያ መንገዶችን፣ ድልድዮችን፣ ሕንፃዎችንና የከተማ መሠረተ ልማቶችን ይገነባል።")} />
    <Hero />
    <section id="partnerships" className="py-16 md:py-20 overflow-hidden border-b border-border/60"><div className="container-custom"><AnimatedSection className="text-center mb-10"><span className="label-eyebrow">{text("Clients & Strategic Partners", "ደንበኞችና ስትራቴጂካዊ አጋሮች")}</span><h2 className="section-title mt-3 text-2xl md:text-3xl">{text("Trusted by 19 national and regional institutions", "19 ብሔራዊና ክልላዊ ተቋማት የሚተማመኑብን")}</h2></AnimatedSection></div><PartnersMarquee /></section>
    <StatsSection /><Timeline />
    <AnimatedSection className="section-padding"><div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center"><div><span className="label-eyebrow">{text("Who We Are", "እኛ ማን ነን")}</span><h2 className="section-title mt-3 mb-6">{text("Ethiopia's Leading Construction Corporation", "የኢትዮጵያ ቀዳሚ የግንባታ ኮርፖሬሽን")}</h2><p className="text-muted-foreground font-body leading-relaxed mb-4">{text('Hibir Construction Corporation is a government-owned construction enterprise headquartered in Bahir Dar, Ethiopia. Originally established as "Amhara Road Works Enterprise" by Proclamation No. 71/2010, the corporation was re-established by Proclamation No. 170/2018 and upgraded to corporation level by Proclamation No. 214/2024.', 'ሂቢር ኮንስትራክሽን ኮርፖሬሽን ዋና መሥሪያ ቤቱ በባሕር ዳር የሚገኝ የመንግሥት የግንባታ ድርጅት ነው። በአዋጅ ቁጥር 71/2010 የተቋቋመው የአማራ መንገድ ሥራዎች ድርጅት በአዋጅ ቁጥር 170/2018 እንደገና ተቋቁሞ በአዋጅ ቁጥር 214/2024 ወደ ኮርፖሬሽን ደረጃ አድጓል።')}</p><p className="text-muted-foreground font-body leading-relaxed mb-8">{text("With 843 professionals, 282 units of vehicles, plants and machinery, and an active contract portfolio exceeding 25 billion Birr, we are a key driver of Ethiopia's infrastructure development.", "843 ባለሙያዎች፣ 282 ተሽከርካሪዎች፣ ፕላንቶችና ማሽነሪዎች እንዲሁም ከ25 ቢሊዮን ብር በላይ የሆነ ንቁ የውል ፖርትፎሊዮ በመያዝ ለኢትዮጵያ መሠረተ ልማት ዕድገት ቁልፍ አስተዋጽኦ እናደርጋለን።")}</p><Link to={path("/about")} className="btn-primary inline-flex items-center gap-2">{text("Learn More", "ተጨማሪ ይወቁ")} <ArrowRight size={18}/></Link></div><img src={aboutImg} alt={text("Construction machinery", "የግንባታ ማሽነሪዎች")} className="rounded-2xl w-full shadow-2xl" loading="lazy" /></div></AnimatedSection>
    <section className="section-padding"><div className="container-custom"><AnimatedSection className="text-center mb-16"><span className="label-eyebrow">{text("Our Services", "አገልግሎቶቻችን")}</span><h2 className="section-title mt-3">{text("What We Build", "የምንገነባው")}</h2></AnimatedSection><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{services.map(([Icon,en,desc,amh,amDesc]) => <div key={en as string} className="glass-card p-8"><Icon size={28} className="text-accent mb-6"/><h3 className="font-display font-semibold text-lg mb-3">{text(en as string, amh as string)}</h3><p className="text-muted-foreground font-body text-sm leading-relaxed">{text(desc as string, amDesc as string)}</p></div>)}</div><div className="text-center mt-14"><Link to={path("/services")} className="btn-primary inline-flex items-center gap-2">{text("All Services", "ሁሉም አገልግሎቶች")} <ArrowRight size={18}/></Link></div></div></section>
    <ProjectShowcase />
    <section className="section-padding relative overflow-hidden"><div className="container-custom"><AnimatedSection className="text-center mb-16"><span className="label-eyebrow">{text("Our Standards", "መለኪያዎቻችን")}</span><h2 className="section-title mt-3">{text("Safety & Quality", "ደህንነትና ጥራት")}</h2></AnimatedSection><div className="grid md:grid-cols-2 gap-8">{[[Shield,"Safety First","ደህንነት ቅድሚያ","The corporation follows scientific HSE procedures to ensure a safe workplace.","ኮርፖሬሽኑ ደህንነቱ የተጠበቀ የሥራ ቦታ ለማረጋገጥ ሳይንሳዊ የHSE ሂደቶችን ይከተላል።"],[CheckCircle,"Quality Assurance","የጥራት ማረጋገጫ","Rigorous quality control is maintained through planned supervision and management reviews.","ጥብቅ የጥራት ቁጥጥር በታቀደ ቁጥጥርና በአስተዳደር ግምገማ ይጠበቃል።"]].map(([Icon,en,amh,desc,amDesc]) => <div key={en as string} className="glass-card p-10"><Icon size={36} className="text-accent mb-5"/><h3 className="text-xl font-display font-semibold mb-4">{text(en as string, amh as string)}</h3><p className="text-muted-foreground font-body">{text(desc as string, amDesc as string)}</p></div>)}</div></div></section>
    <LatestNews />
    <section className="relative py-28 overflow-hidden"><img src={ctaBg} alt="" className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0 bg-background/90"/><div className="relative z-10 container-custom text-center"><h2 className="text-3xl md:text-5xl font-bold font-display mb-5">{text("Let's Build the Future Together", "የወደፊቱን በአንድነት እንገንባ")}</h2><p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-12">{text("Partner with Hibir Construction Corporation for reliable, high-quality infrastructure solutions.", "ለአስተማማኝና ጥራታቸውን ለጠበቁ የመሠረተ ልማት መፍትሔዎች ከሂቢር ኮንስትራክሽን ኮርፖሬሽን ጋር ይተባበሩ።")}</p><Link to={path("/contact")} className="btn-accent inline-flex gap-2">{text("Get in Touch", "ያግኙን")} <ArrowRight size={18}/></Link></div></section>
  </main>;
}
