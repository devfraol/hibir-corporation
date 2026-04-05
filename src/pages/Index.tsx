import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, HardHat, Truck, Users, ChevronRight, ChevronDown,
  Shield, Award, CheckCircle, Wrench, Factory, Building2,
  CarFront, Cog, TreePine
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

const featuredProjects = [
  { title: "Bahir Dar Airport Expansion", image: airportImg, client: "Ethiopian Airports Enterprise", status: "Ongoing", budget: "2.1B Birr" },
  { title: "Lalibela – Sekota Road Project", image: roadImg, client: "Ethiopian Roads Authority", status: "Completed", budget: "890M Birr" },
  { title: "Gondar Asphalt Road Project", image: bridgeImg, client: "Amhara Region Bureau", status: "Ongoing", budget: "1.5B Birr" },
  { title: "Integrated Agro Industry Park", image: heroImg, client: "Ministry of Industry", status: "Completed", budget: "1.2B Birr" },
];

const services = [
  { icon: <HardHat size={28} />, title: "Road Construction", desc: "We design and build durable road networks that connect communities and drive economic progress." },
  { icon: <Building2 size={28} />, title: "Asphalt & Infrastructure", desc: "High-quality asphalt and infrastructure solutions tailored for large-scale projects." },
  { icon: <Truck size={28} />, title: "Bridge Construction", desc: "Engineering safe and reliable bridge structures for long-term use." },
  { icon: <Wrench size={28} />, title: "Road Maintenance", desc: "Ensuring existing roads meet modern standards through maintenance and upgrades." },
  { icon: <Factory size={28} />, title: "Material Production", desc: "Production and supply of construction materials including aggregates and asphalt." },
  { icon: <Cog size={28} />, title: "Equipment Leasing", desc: "Providing modern construction machinery for project support." },
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
      <img src={heroImg} alt="Highway construction in Ethiopia" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40" />
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 text-accent rounded-full px-4 py-1.5 text-sm font-body mb-6">
            <HardHat size={16} /> Government-Owned Corporation
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-6">
            Building Ethiopia's Infrastructure for a{" "}
            <span className="text-gradient-gold">Stronger Tomorrow</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/70 font-body mb-10 max-w-xl leading-relaxed">
            Hibir Construction Corporation delivers large-scale road, bridge, and infrastructure projects with precision, quality, and long-term impact across Ethiopia.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/projects" className="btn-accent inline-flex items-center gap-2">
              View Our Projects <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-outline-light">Contact Us</Link>
          </div>
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-primary-foreground/50 text-xs font-body tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-accent" />
      </motion.div>
    </section>

    {/* 2. STATS */}
    <section className="bg-background py-20">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <Counter end={800} suffix="+" label="Skilled Professionals" />
        <Counter end={240} suffix="+" label="Machinery & Equipment" />
        <Counter end={2.5} suffix="B+" label="Birr Annual Turnover" decimals={1} />
        <Counter end={50} suffix="+" label="Major Projects" />
      </div>
    </section>

    {/* 3. ABOUT PREVIEW */}
    <AnimatedSection className="section-padding bg-muted/30">
      <div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Who We Are</span>
          <h2 className="section-title mt-3 mb-6">Ethiopia's Leading Construction Corporation</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Hibir Construction Corporation is a leading government-owned construction enterprise based in Bahir Dar, Ethiopia. Established through multiple national proclamations and strengthened over time, the corporation has grown into a key player in the country's infrastructure development.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            With strong technical capacity, experienced professionals, and modern machinery, we deliver high-quality road and infrastructure projects that support economic growth and national development.
          </p>
          <Link to="/about" className="btn-primary inline-flex items-center gap-2">
            Learn More About Us <ChevronRight size={18} />
          </Link>
        </div>
        <div className="relative">
          <img src={aboutImg} alt="Bridge construction project" className="rounded-xl shadow-2xl w-full" loading="lazy" width={1280} height={720} />
          <div className="absolute -bottom-6 -left-6 bg-accent rounded-xl p-6 shadow-xl hidden sm:block">
            <div className="text-3xl font-display font-bold text-accent-foreground">25+</div>
            <div className="text-sm text-accent-foreground/80 font-body">Years of Excellence</div>
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* 4. SERVICES */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Our Services</span>
          <h2 className="section-title mt-3">What We Build</h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-card rounded-xl p-7 card-hover border border-border group">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/services" className="btn-primary inline-flex items-center gap-2">
            All Services <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>

    {/* 5. FEATURED PROJECTS */}
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Featured Projects</span>
          <h2 className="section-title mt-3">Our Flagship Work</h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div className="group rounded-xl overflow-hidden bg-card border border-border card-hover">
                <div className="relative overflow-hidden h-48">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-body font-semibold ${
                    p.status === "Completed" ? "bg-green-500/90 text-primary-foreground" : "bg-accent/90 text-accent-foreground"
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-base mb-1">{p.title}</h3>
                  <p className="text-muted-foreground text-xs font-body mb-1">{p.client}</p>
                  <p className="text-accent text-sm font-body font-semibold">{p.budget}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>

    {/* 6. CAPACITY / RESOURCES */}
    <AnimatedSection className="section-padding">
      <div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Our Capacity</span>
          <h2 className="section-title mt-3 mb-6">Built for Scale</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            Hibir Construction Corporation operates with a strong foundation of advanced machinery and a highly skilled workforce, enabling efficient execution of complex infrastructure projects.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <CarFront size={24} />, val: "146", label: "Vehicles" },
              { icon: <Cog size={24} />, val: "89", label: "Heavy Machinery" },
              { icon: <Factory size={24} />, val: "7+", label: "Asphalt & Crusher Plants" },
              { icon: <Users size={24} />, val: "800+", label: "Workforce" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xl font-display font-bold">{item.val}</div>
                  <div className="text-sm text-muted-foreground font-body">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/resources" className="btn-primary inline-flex items-center gap-2 mt-8">
            View Full Capacity <ChevronRight size={18} />
          </Link>
        </div>
        <div>
          <img src={safetyImg} alt="Construction team" className="rounded-xl shadow-2xl w-full" loading="lazy" width={1280} height={720} />
        </div>
      </div>
    </AnimatedSection>

    {/* 7. SAFETY & QUALITY */}
    <section className="section-padding bg-primary">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Our Standards</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-primary-foreground mt-3">Safety & Quality</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-8">
              <Shield className="text-accent mb-4" size={32} />
              <h3 className="text-xl font-display font-semibold text-primary-foreground mb-3">Safety First</h3>
              <p className="text-primary-foreground/70 font-body leading-relaxed mb-4">
                We are committed to maintaining a safe working environment through strict adherence to health, safety, and environmental standards. Our goal is zero accidents and zero man-hours lost.
              </p>
              <ul className="space-y-2">
                {["PPE compliance on all sites", "Trained safety supervisors", "Regular safety audits"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-primary-foreground/60 text-sm font-body">
                    <CheckCircle size={14} className="text-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-8">
              <Award className="text-accent mb-4" size={32} />
              <h3 className="text-xl font-display font-semibold text-primary-foreground mb-3">Quality Assurance</h3>
              <p className="text-primary-foreground/70 font-body leading-relaxed mb-4">
                We implement rigorous quality control systems, including inspection, testing, and continuous monitoring to ensure every project meets the highest standards.
              </p>
              <ul className="space-y-2">
                {["Rigorous inspection & testing", "Process control systems", "Customer-first approach"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-primary-foreground/60 text-sm font-body">
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
    <section className="py-16 bg-background overflow-hidden">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Our Partners</span>
          <h2 className="section-title mt-3">Trusted By Leading Institutions</h2>
        </AnimatedSection>
        <div className="relative">
          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...clientLogos, ...clientLogos].map((name, i) => (
              <div
                key={i}
                className="shrink-0 px-8 py-5 bg-muted/50 border border-border rounded-lg flex items-center justify-center min-w-[220px] hover:bg-accent/10 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <TreePine size={20} className="text-muted-foreground" />
                  <span className="text-sm font-body font-medium text-muted-foreground whitespace-nowrap">{name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* 9. CTA */}
    <section className="relative py-24 overflow-hidden">
      <img src={ctaBg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-primary/85" />
      <div className="relative z-10 container-custom text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-primary-foreground mb-4">
            Let's Build the Future Together
          </h2>
          <p className="text-primary-foreground/70 font-body text-lg max-w-2xl mx-auto mb-10">
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
