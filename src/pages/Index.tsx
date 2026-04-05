import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, HardHat, Truck, Users, ChevronDown,
  Shield, Award, CheckCircle, Wrench, Factory, Building2,
  CarFront, Cog, TreePine, ChevronRight
} from "lucide-react";
import heroImg from "@/assets/hero-highway.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import roadImg from "@/assets/road-construction.jpg";
import airportImg from "@/assets/airport-project.jpg";
import aboutImg from "@/assets/capacity-machinery.jpg";
import safetyImg from "@/assets/safety-quality.jpg";
import ctaBg from "@/assets/cta-background.jpg";
import Counter from "@/components/Counter";
import AnimatedSection from "@/components/AnimatedSection";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const featuredProjects = [
  { title: "Bahir Dar Airport Expansion", image: airportImg, client: "Ethiopian Airports Enterprise", status: "Ongoing", budget: "2.1B Birr" },
  { title: "Lalibela – Sekota Road Project", image: roadImg, client: "Ethiopian Roads Authority", status: "Completed", budget: "890M Birr" },
  { title: "Gondar Asphalt Road Project", image: bridgeImg, client: "Amhara Region Bureau", status: "Ongoing", budget: "1.5B Birr" },
  { title: "Integrated Agro Industry Park", image: heroImg, client: "Ministry of Industry", status: "Completed", budget: "1.2B Birr" },
];

const services = [
  { icon: <HardHat size={28} />, title: "Road Construction", desc: "Durable road networks connecting communities and driving economic progress." },
  { icon: <Building2 size={28} />, title: "Asphalt & Infrastructure", desc: "High-quality asphalt solutions for large-scale development projects." },
  { icon: <Truck size={28} />, title: "Bridge Construction", desc: "Safe, reliable bridge structures engineered for long-term durability." },
  { icon: <Wrench size={28} />, title: "Road Maintenance", desc: "Modern upgrades and maintenance ensuring road safety standards." },
  { icon: <Factory size={28} />, title: "Material Production", desc: "In-house aggregates and asphalt from our own quarries and plants." },
  { icon: <Cog size={28} />, title: "Equipment Leasing", desc: "Modern construction machinery available for project support." },
];

const clientLogos = [
  "Ethiopian Roads Authority",
  "Ministry of Transport",
  "Amhara Region Bureau",
  "Ethiopian Airports Enterprise",
  "Ministry of Industry",
  "Bahir Dar City Admin",
];

const Home = () => (
  <main>
    {/* 1. HERO */}
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <img src={heroImg} alt="Highway construction in Ethiopia" className="absolute inset-0 w-full h-full object-cover scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[300px] rounded-full bg-primary/30 blur-[120px]" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsla(210,20%,95%,0.1) 1px, transparent 1px), linear-gradient(90deg, hsla(210,20%,95%,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 container-custom">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-body mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs tracking-widest uppercase">Government-Owned Corporation</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-6">
            Building Ethiopia's Infrastructure for a{" "}
            <span className="text-gradient-gold">Stronger Tomorrow</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base md:text-lg text-muted-foreground font-body mb-10 max-w-xl leading-relaxed">
            Large-scale road, bridge, and infrastructure projects delivered with precision, quality, and long-term impact across Ethiopia.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link to="/projects" className="btn-accent inline-flex items-center gap-2">
              View Our Projects <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-outline-light">Contact Us</Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-muted-foreground text-xs font-body tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-accent" />
      </motion.div>
    </section>

    {/* 2. STATS - Floating glass cards */}
    <section className="relative -mt-20 z-20 px-4 md:px-8 mb-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { end: 800, suffix: "+", label: "Skilled Professionals" },
            { end: 240, suffix: "+", label: "Machinery & Equipment" },
            { end: 2.5, suffix: "B+", label: "Birr Annual Turnover", decimals: 1 },
            { end: 50, suffix: "+", label: "Major Projects" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card p-6 md:p-8 text-center"
            >
              <Counter end={s.end} suffix={s.suffix} label={s.label} decimals={s.decimals || 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. ABOUT PREVIEW */}
    <AnimatedSection className="section-padding">
      <div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Who We Are</span>
          <h2 className="section-title mt-3 mb-6">Ethiopia's Leading Construction Corporation</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Hibir Construction Corporation is a leading government-owned construction enterprise based in Bahir Dar, Ethiopia. Established through multiple national proclamations, the corporation has grown into a key player in national infrastructure development.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            With strong technical capacity, experienced professionals, and modern machinery, we deliver high-quality road and infrastructure projects that support economic growth.
          </p>
          <Link to="/about" className="btn-primary inline-flex items-center gap-2">
            Learn More <ChevronRight size={18} />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl" />
          <img src={aboutImg} alt="Construction machinery" className="relative rounded-2xl w-full shadow-2xl shadow-black/30" loading="lazy" />
          <div className="absolute -bottom-6 -left-6 glass-card p-6 hidden sm:block">
            <div className="text-3xl font-display font-bold text-gradient-gold">25+</div>
            <div className="text-sm text-muted-foreground font-body">Years of Excellence</div>
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

    {/* 5. FEATURED PROJECTS */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Featured Projects</span>
          <h2 className="section-title mt-3">Our Flagship Work</h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="group rounded-2xl overflow-hidden glass-card">
                <div className="relative overflow-hidden h-52">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-body font-semibold backdrop-blur-sm ${
                    p.status === "Completed" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-accent/20 text-accent border border-accent/30"
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-sm mb-1 text-foreground">{p.title}</h3>
                  <p className="text-muted-foreground text-xs font-body mb-1">{p.client}</p>
                  <p className="text-accent text-sm font-body font-semibold">{p.budget}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>

    {/* 6. CAPACITY */}
    <AnimatedSection className="section-padding">
      <div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Our Capacity</span>
          <h2 className="section-title mt-3 mb-6">Built for Scale</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10">
            Advanced machinery and a highly skilled workforce enabling efficient execution of complex infrastructure projects across Ethiopia.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <CarFront size={22} />, val: "146", label: "Vehicles" },
              { icon: <Cog size={22} />, val: "89", label: "Heavy Machinery" },
              { icon: <Factory size={22} />, val: "7+", label: "Production Plants" },
              { icon: <Users size={22} />, val: "800+", label: "Workforce" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-foreground">{item.val}</div>
                  <div className="text-xs text-muted-foreground font-body">{item.label}</div>
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
                Strict adherence to health, safety, and environmental standards. Our goal is zero accidents and zero man-hours lost.
              </p>
              <ul className="space-y-3">
                {["PPE compliance on all sites", "Trained safety supervisors", "Regular safety audits"].map((item, i) => (
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
                Rigorous quality control including inspection, testing, and continuous monitoring for the highest standards.
              </p>
              <ul className="space-y-3">
                {["Rigorous inspection & testing", "Process control systems", "Customer-first approach"].map((item, i) => (
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

    {/* 8. CLIENTS / PARTNERS */}
    <section className="py-20 overflow-hidden">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-14">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Our Partners</span>
          <h2 className="section-title mt-3">Trusted By Leading Institutions</h2>
        </AnimatedSection>
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...clientLogos, ...clientLogos].map((name, i) => (
              <div
                key={i}
                className="shrink-0 px-8 py-5 glass-card flex items-center justify-center min-w-[220px]"
              >
                <div className="flex items-center gap-3">
                  <TreePine size={18} className="text-muted-foreground" />
                  <span className="text-sm font-body font-medium text-muted-foreground whitespace-nowrap">{name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* 9. CTA */}
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
            Partner with Hibir Construction Corporation for reliable, high-quality infrastructure solutions.
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
