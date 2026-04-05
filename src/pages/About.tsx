import { Target, Eye, Heart, Users, Shield, Star } from "lucide-react";
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

const About = () => (
  <main>
    <PageHero title="About Us" subtitle="Learn about Ethiopia's premier government-owned construction corporation" image={heroImg} />

    <AnimatedSection className="section-padding">
      <div className="container-custom grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Company Overview</span>
          <h2 className="section-title mt-2 mb-6">Who We Are</h2>
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
        <div className="space-y-8">
          <div className="bg-primary rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-accent" size={24} />
              <h3 className="font-display font-semibold text-xl text-primary-foreground">Our Vision</h3>
            </div>
            <p className="text-primary-foreground/70 font-body leading-relaxed">
              "To be one of the best contractors in Africa by 2030"
            </p>
          </div>
          <div className="bg-muted rounded-xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-accent" size={24} />
              <h3 className="font-display font-semibold text-xl">Our Mission</h3>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed">
              "Deliver high-quality infrastructure projects on time while ensuring profitability and sustainable growth for the nation."
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>

    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Core Values</span>
          <h2 className="section-title mt-2">What Drives Us</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-card rounded-xl p-6 text-center card-hover border border-border">
                <div className="text-accent mx-auto mb-4">{v.icon}</div>
                <h3 className="font-display font-semibold mb-2">{v.title}</h3>
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
