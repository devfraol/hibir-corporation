import { Target, Eye, Heart, Users, Shield, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-construction.jpg";

const values = [
  { icon: <Users size={28} />, title: "Teamwork", desc: "Collaborative effort across all departments and project sites." },
  { icon: <Target size={28} />, title: "Cost-effectiveness", desc: "Maximizing value while maintaining highest quality standards." },
  { icon: <Shield size={28} />, title: "Honesty", desc: "Transparent operations and ethical business practices." },
  { icon: <Heart size={28} />, title: "Loyalty", desc: "Dedicated to our nation, clients, and employees." },
  { icon: <Star size={28} />, title: "Hard Work", desc: "Relentless commitment to excellence in every project." },
];

const timeline = [
  { year: "2010", title: "Establishment", desc: "Founded as a government-owned construction enterprise in Bahir Dar." },
  { year: "2015", title: "Major Expansion", desc: "Fleet expanded to 200+ machinery units. Workforce surpassed 500." },
  { year: "2018", title: "Re-establishment", desc: "Re-established through new proclamation with expanded mandate and resources." },
  { year: "2024", title: "Industry Leader", desc: "Recognized as one of Ethiopia's top infrastructure contractors with 800+ staff." },
];

const About = () => (
  <main>
    <PageHero title="About Us" subtitle="Learn about Ethiopia's premier government-owned construction corporation" image={heroImg} />

    {/* Overview + Vision/Mission */}
    <AnimatedSection className="section-padding">
      <div className="container-custom grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Company Overview</span>
          <h2 className="section-title mt-3 mb-6">Who We Are</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Hibir Construction Corporation is a government-owned enterprise headquartered in Bahir Dar, Ethiopia. Established and re-established through multiple proclamations, the corporation has grown into one of the largest construction entities in the Amhara Region and beyond.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            With over 800 employees and 240+ pieces of heavy machinery, we specialize in road construction, bridge building, asphalt production, and large-scale infrastructure development.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            Our projects span billions of Ethiopian Birr in value, contributing directly to the nation's economic development and connectivity.
          </p>
        </div>
        <div className="space-y-6">
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-accent" size={24} />
              <h3 className="font-display font-semibold text-xl text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed italic">
              "To be one of the best contractors in Africa by 2030"
            </p>
          </div>
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-accent" size={24} />
              <h3 className="font-display font-semibold text-xl text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed italic">
              "Deliver high-quality infrastructure projects on time while ensuring profitability and sustainable growth for the nation."
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* Timeline */}
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Our Journey</span>
          <h2 className="section-title mt-3">Key Milestones</h2>
        </AnimatedSection>
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {timeline.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <h3 className="font-display font-bold text-lg text-foreground">{t.title}</h3>
                  <p className="text-muted-foreground text-sm font-body mt-1">{t.desc}</p>
                </div>
                <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-display font-bold text-sm"
                  style={{ background: "var(--gold-gradient)", color: "hsl(220 60% 8%)" }}>
                  <Calendar size={18} />
                </div>
                <div className={`flex-1 ${i % 2 === 0 ? "pl-0 md:pl-8" : "pr-0 md:pr-8"}`}>
                  <span className="text-accent font-display font-bold text-2xl">{t.year}</span>
                  <div className="md:hidden mt-2">
                    <h3 className="font-display font-bold text-lg text-foreground">{t.title}</h3>
                    <p className="text-muted-foreground text-sm font-body mt-1">{t.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Core Values</span>
          <h2 className="section-title mt-3">What Drives Us</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="glass-card p-6 text-center h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-display font-semibold mb-2 text-foreground">{v.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
