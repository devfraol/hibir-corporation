import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, HardHat, Truck, Users, Award, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import roadImg from "@/assets/road-construction.jpg";
import airportImg from "@/assets/airport-project.jpg";
import Counter from "@/components/Counter";
import AnimatedSection from "@/components/AnimatedSection";

const featuredProjects = [
  { title: "Bahir Dar Airport Expansion", image: airportImg, status: "Ongoing", budget: "2.1B Birr" },
  { title: "Lalibela Road Project", image: roadImg, status: "Completed", budget: "890M Birr" },
  { title: "Gondar Bridge Construction", image: bridgeImg, status: "Ongoing", budget: "1.5B Birr" },
];

const Home = () => (
  <main>
    {/* Hero */}
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <img src={heroImg} alt="Highway construction project" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 overlay-gradient" />
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent rounded-full px-4 py-1.5 text-sm font-body mb-6">
            <HardHat size={16} /> Government-Owned Corporation
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Building the Future of{" "}
            <span className="text-gradient-gold">Infrastructure</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 font-body mb-10 max-w-xl leading-relaxed">
            Delivering world-class road, bridge, and infrastructure projects across Ethiopia with quality, reliability, and scale.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/projects" className="btn-accent inline-flex items-center gap-2">
              View Projects <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-outline-light">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-primary py-16">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
        <Counter end={800} suffix="+" label="Employees" />
        <Counter end={240} suffix="+" label="Machinery" />
        <Counter end={50} suffix="+" label="Projects Completed" />
        <Counter end={15} suffix="B+" label="Birr in Projects" />
      </div>
    </section>

    {/* About Preview */}
    <AnimatedSection className="section-padding">
      <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">About Us</span>
          <h2 className="section-title mt-2 mb-6">Ethiopia's Premier Construction Corporation</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-6">
            Hibir Construction Corporation is a government-owned enterprise headquartered in Bahir Dar, Ethiopia. Established and re-established through multiple proclamations, we are committed to delivering large-scale infrastructure projects that drive national development.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            Our vision is to become one of the best contractors in Africa by 2030, delivering high-quality infrastructure on time while ensuring profitability and sustainable growth.
          </p>
          <Link to="/about" className="btn-primary inline-flex items-center gap-2">
            Learn More <ChevronRight size={18} />
          </Link>
        </div>
        <div className="relative">
          <img src={bridgeImg} alt="Bridge construction" className="rounded-lg shadow-2xl" loading="lazy" width={1280} height={720} />
          <div className="absolute -bottom-6 -left-6 bg-accent rounded-lg p-6 shadow-xl">
            <div className="text-3xl font-display font-bold text-accent-foreground">25+</div>
            <div className="text-sm text-accent-foreground/80 font-body">Years of Excellence</div>
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* Services Preview */}
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Our Services</span>
          <h2 className="section-title mt-2">What We Build</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <HardHat size={32} />, title: "Road Construction", desc: "Multi-lane highways, asphalt roads, and gravel roads across Ethiopia's terrain." },
            { icon: <Truck size={32} />, title: "Bridge Construction", desc: "Reinforced concrete bridges and overpasses connecting communities." },
            { icon: <Users size={32} />, title: "Infrastructure Development", desc: "Airport expansions, urban development, and public infrastructure." },
          ].map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-card rounded-xl p-8 card-hover border border-border">
                <div className="text-accent mb-4">{s.icon}</div>
                <h3 className="font-display font-semibold text-xl mb-3">{s.title}</h3>
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

    {/* Featured Projects */}
    <AnimatedSection className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Featured Projects</span>
          <h2 className="section-title mt-2">Our Flagship Work</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="group rounded-xl overflow-hidden bg-card border border-border card-hover">
                <div className="relative overflow-hidden h-56">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-body font-semibold ${
                    p.status === "Completed" ? "bg-green-500/90 text-primary-foreground" : "bg-accent/90 text-accent-foreground"
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">Budget: {p.budget}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* Testimonials */}
    <section className="section-padding bg-primary">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-primary-foreground mt-2">What Our Clients Say</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { quote: "Hibir Construction delivered our road project ahead of schedule with exceptional quality. Their professionalism is unmatched.", author: "Ethiopian Roads Authority" },
            { quote: "The bridge construction project was completed with meticulous attention to safety and engineering standards. Truly impressive.", author: "Amhara Region Transport Bureau" },
          ].map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-8">
                <Award className="text-accent mb-4" size={28} />
                <p className="text-primary-foreground/80 font-body leading-relaxed mb-6 italic">"{t.quote}"</p>
                <p className="text-accent font-body font-semibold text-sm">{t.author}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <AnimatedSection className="section-padding text-center">
      <div className="container-custom">
        <h2 className="section-title mb-4">Ready to Build Together?</h2>
        <p className="section-subtitle mx-auto mb-10">
          Partner with Ethiopia's leading construction corporation for your next infrastructure project.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-accent inline-flex items-center gap-2">Get in Touch <ArrowRight size={18} /></Link>
          <Link to="/services" className="btn-primary">Our Services</Link>
        </div>
      </div>
    </AnimatedSection>
  </main>
);

export default Home;
