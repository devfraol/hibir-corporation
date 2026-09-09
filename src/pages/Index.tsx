import { Link } from "react-router-dom";
import {
  ArrowRight, HardHat, Truck, Users, ChevronDown,
  Shield, Award, CheckCircle, Wrench, Factory, Building2,
  CarFront, Cog, ChevronRight, GraduationCap
} from "lucide-react";
import heroImg from "@/assets/hero-highway.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import roadImg from "@/assets/road-construction.jpg";
import airportImg from "@/assets/airport-project.jpg";
import aboutImg from "@/assets/WhoWeAre.png";
import safetyImg from "@/assets/safety-quality.jpg";
import ctaBg from "@/assets/cta-background.jpg";
import Counter from "@/components/Counter";
import AnimatedSection from "@/components/AnimatedSection";
import Hero from "@/components/Hero";
import StatsSection from "@/components/home/StatsSection";
import Timeline from "@/components/home/Timeline";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import LatestNews from "@/components/home/LatestNews";
import PartnersMarquee from "@/components/PartnersMarquee";
import Seo from "@/components/Seo";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const featuredProjects = [
  { title: "Bale Egziaber–Airport Asphalt Road", image: airportImg, client: "Dessie City Administration", status: "Ongoing", budget: "5.12B Birr" },
  { title: "Werabe–Bojober Road Project", image: roadImg, client: "Woldia City Mayor Office", status: "Ongoing", budget: "2.78B Birr" },
  { title: "Debecha–Feresbet Asphalt Road", image: bridgeImg, client: "Ethiopian Roads Authority", status: "Ongoing", budget: "1.79B Birr" },
  { title: "Gagbaya–Kurba Gravel Road", image: heroImg, client: "ANRS Road Bureau", status: "Completed", budget: "1.02B Birr" },
];

const services = [
  { icon: <HardHat size={28} />, title: "Road Construction", desc: "Design and construction of highways, urban roads, and rural access roads across Ethiopia's diverse terrain." },
  { icon: <Building2 size={28} />, title: "Asphalt & Infrastructure", desc: "Full-service asphalt production and laying from our own plants for durable road surfaces." },
  { icon: <Truck size={28} />, title: "Bridge Construction", desc: "Engineering and construction of reinforced concrete bridges, culverts, and drainage structures." },
  { icon: <Wrench size={28} />, title: "Road Maintenance", desc: "Comprehensive rehabilitation and upgrading of existing road networks to extend service life." },
  { icon: <Factory size={28} />, title: "Material Production", desc: "Production and supply of crushed aggregate, asphalt, and concrete from our own plants and quarries." },
  { icon: <GraduationCap size={28} />, title: "Capacity Building", desc: "Road sector training programs for device operators and construction professionals." },
];


const Home = () => (
  <main>
    <Seo
      title="Hibir Construction Corporation | Construction & Infrastructure in Ethiopia"
      description="Hibir Construction Corporation builds roads, bridges, buildings and urban infrastructure across Ethiopia. A GC-1 government-owned contractor based in Bahir Dar, Amhara Regional State."
      path="/"
    />
    <Hero />

    {/* PARTNERSHIPS — immediately after hero */}
    <section id="partnerships" className="py-16 md:py-20 overflow-hidden border-b border-border/60 scroll-mt-24">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-10">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">
            Clients & Strategic Partners
          </span>
          <h2 className="section-title mt-3 text-2xl md:text-3xl">
            Trusted by 19 national and regional institutions
          </h2>
        </AnimatedSection>
      </div>
      <PartnersMarquee />
    </section>

    <StatsSection />

    <Timeline />

    {/* 3. ABOUT PREVIEW */}
    <AnimatedSection className="section-padding">
      <div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Who We Are</span>
          <h2 className="section-title mt-3 mb-6">Ethiopia's Leading Construction Corporation</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Hibir Construction Corporation is a government-owned construction enterprise headquartered in Bahir Dar, Ethiopia. Originally established as "Amhara Road Works Enterprise" by Proclamation No. 71/2010, the corporation was re-established by Proclamation No. 170/2018 and upgraded to corporation level by Proclamation No. 214/2024.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            With 843 professionals, 282 units of vehicles, plants and machinery, and an active contract portfolio exceeding 25 billion Birr, we are a key driver of Ethiopia's infrastructure development — accountable to the Regional Public Enterprises' Authority.
          </p>
          <Link to="/about" className="btn-primary inline-flex items-center gap-2">
            Learn More <ChevronRight size={18} />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl" />
          <img src={aboutImg} alt="Construction machinery" className="relative rounded-2xl w-full shadow-2xl shadow-black/30" loading="lazy" />
          <div className="absolute -bottom-6 -left-6 glass-card p-6 hidden sm:block">
            <div className="text-3xl font-display font-bold text-gradient-gold">15+</div>
            <div className="text-sm text-muted-foreground font-body">Years Since Establishment</div>
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* 4. SERVICES */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Our Services</span>
          <h2 className="section-title mt-3">What We Build</h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="glass-card p-8 group cursor-pointer h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 group-hover:shadow-lg group-hover:shadow-accent/20">
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold text-lg mb-3 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link to="/services" className="btn-primary inline-flex items-center gap-2">
            All Services <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>

    <ProjectShowcase />
    {/* 6. CAPACITY */}
    <AnimatedSection className="section-padding">
      <div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Our Capacity</span>
          <h2 className="section-title mt-3 mb-6">Built for Scale</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10">
            The corporation has strategically built its capacity through gradual investment expansion — owning 282 units of vehicles, plants, and machinery operated by 843 skilled professionals across Ethiopia.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <CarFront size={22} />, val: "155", label: "Vehicles", sub: "Light & heavy duty fleet" },
              { icon: <Cog size={22} />, val: "117", label: "Machinery", sub: "Earth moving & tyre machinery" },
              { icon: <Factory size={22} />, val: "10", label: "Plants", sub: "Crusher, sand & asphalt plants" },
              { icon: <Users size={22} />, val: "843", label: "Staff", sub: "Engineers, technicians & operators" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-foreground">{item.val}</div>
                  <div className="text-xs text-muted-foreground font-body">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground/60 font-body mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/resources" className="btn-primary inline-flex items-center gap-2 mt-10">
            View Full Capacity <ChevronRight size={18} />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl" />
          <img src={safetyImg} alt="Construction team" className="relative rounded-2xl shadow-2xl shadow-black/30 w-full" loading="lazy" />
        </div>
      </div>
    </AnimatedSection>

    {/* 7. SAFETY & QUALITY */}
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Our Standards</span>
          <h2 className="section-title mt-3">Safety & Quality</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="glass-card p-10 h-full">
              <Shield className="text-accent mb-5" size={36} />
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">Safety First</h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                The corporation follows scientific HSE procedures with strict implementation and follow-up to ensure a safe workplace. Our goal: zero accidents and zero man-hours lost.
              </p>
              <ul className="space-y-3">
                {["Use of Personal Protective Equipment (PPE)", "Use of safe tools & equipment", "Trained & competent staff", "Regular on-site safety supervisions"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm font-body">
                    <CheckCircle size={14} className="text-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="glass-card p-10 h-full">
              <Award className="text-accent mb-5" size={36} />
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">Quality Assurance</h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                HCC maintains a rigorous quality control program with continuous awareness, communication, and implementation — monitored through planned supervision and management reviews.
              </p>
              <ul className="space-y-3">
                {["Procurement quality controls", "Construction process control", "Inspection & testing at every phase", "Control of non-conforming outputs"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm font-body">
                    <CheckCircle size={14} className="text-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* 9. AWARDS */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-14">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Recognition</span>
          <h2 className="section-title mt-3">Awards & Certifications</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "National Kaizen Award — 1st Place", desc: "Awarded by Ethiopian Kaizen Institute (EKI) on October 29, 2019 for implementing first-level Kaizen — ranked 1st nationally." },
            { title: "GC-1 Contractor Grade", desc: "Certified as Grade One General Contractor by Ethiopian Construction Authority, valid until 08/05/2027." },
            { title: "Revenue Bureau Recognition", desc: "Recognized by ANRS Bureau of Revenue for outstanding tax compliance and corporate responsibility." },
          ].map((a, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="glass-card p-8 h-full text-center">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <Award className="text-accent" size={28} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{a.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{a.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <LatestNews />

    {/* 10. CTA */}
    <section className="relative py-28 overflow-hidden">
      <img src={ctaBg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-background/90" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent/10 blur-[150px]" />
      <div className="relative z-10 container-custom text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-5">
            Let's Build the Future Together
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-12">
            Partner with Hibir Construction Corporation for reliable, high-quality infrastructure solutions backed by 843 professionals and 282 units of modern vehicles, plants and machinery.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-accent inline-flex items-center gap-2">
              Get in Touch <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="btn-outline-light">Our Services</Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Home;
