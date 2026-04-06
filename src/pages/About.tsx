import { Target, Eye, Heart, Users, Shield, Star, Calendar, Zap } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-construction.jpg";

const values = [
  { icon: <Users size={28} />, title: "Team Work", desc: "Collaborative effort across all departments and project sites." },
  { icon: <Target size={28} />, title: "Cost Effectiveness", desc: "Maximizing value while maintaining the highest quality standards." },
  { icon: <Zap size={28} />, title: "Industriousness", desc: "Relentless commitment and hard work in every project we undertake." },
  { icon: <Shield size={28} />, title: "Honesty", desc: "Transparent operations and ethical business practices at all levels." },
  { icon: <Heart size={28} />, title: "Loyalty", desc: "Dedicated to our nation, clients, and employees with unwavering commitment." },
];

const timeline = [
  { year: "2010", title: "Establishment", desc: "Founded as 'Amhara Road Works Enterprise' by Proclamation No. 71/2010 on January 26, 2010, with authorized capital of Birr 500 Million (115M cash + 186.7M in kind)." },
  { year: "2018", title: "Re-establishment", desc: "Re-established by Proclamation No. 170/2018 on March 31, 2018 with recorded capital of Birr 929.3 Million (220.2M cash + 709M in kind)." },
  { year: "2024", title: "Corporation Upgrade", desc: "Upgraded to corporation level by Proclamation No. 214/2024, renamed to 'Hibir Construction Corporation' with expanded mandate and resources." },
];

const About = () => (
  <main>
    <PageHero title="About Us" subtitle="Ethiopia's premier government-owned construction corporation since 2010" image={heroImg} />

    {/* Overview + Vision/Mission */}
    <AnimatedSection className="section-padding">
      <div className="container-custom grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Company Overview</span>
          <h2 className="section-title mt-3 mb-6">Who We Are</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Hibir Construction Corporation is a government-owned construction enterprise headquartered in Bahir Dar, Amhara Regional State, Ethiopia — near Bahir Dar University, Gish Abay Campus. The corporation is entirely owned and run by Ethiopian professionals.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            With 803 employees, 242 units of machinery, and a current project portfolio exceeding 20.3 billion Birr, we specialize in road construction, bridge building, asphalt production, and large-scale infrastructure development. Our annual construction turnover exceeds 2.5 billion Birr.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            The corporation supports national and regional development by constructing quality roads with economic feasibility, maintaining existing infrastructure, and upgrading road standards — accountable to the Regional Public Enterprises' Authority.
          </p>
        </div>
        <div className="space-y-6">
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-accent" size={24} />
              <h3 className="font-display font-semibold text-xl text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed italic">
              "To be one of the best contractors in Africa's construction industry by 2030."
            </p>
          </div>
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-accent" size={24} />
              <h3 className="font-display font-semibold text-xl text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed italic">
              "Building infrastructures with the desired quality, timely, and thereby creating a profitable corporation."
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* Objectives */}
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Our Approach</span>
          <h2 className="section-title mt-3">How We Work</h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Target size={24} />, title: "Strict Scheduling", desc: "Rigorous project scheduling and planning for on-time delivery." },
            { icon: <Users size={24} />, title: "Stakeholder Partnership", desc: "Partnering and good communication with all project stakeholders." },
            { icon: <Eye size={24} />, title: "Monitoring & Evaluation", desc: "Strong and timely project monitoring and evaluation systems." },
            { icon: <Shield size={24} />, title: "Contract Management", desc: "Professional contractual project management at every stage." },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="glass-card p-7 h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Our Journey</span>
          <h2 className="section-title mt-3">Key Milestones</h2>
        </AnimatedSection>
        <div className="relative max-w-3xl mx-auto">
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

    {/* Registration Info */}
    <AnimatedSection className="section-padding">
      <div className="container-custom">
        <div className="glass-card p-8 md:p-10">
          <h3 className="font-display font-semibold text-xl mb-8 text-center text-foreground">Corporate Registration</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Registration No.", value: "980/2008" },
              { label: "TIN", value: "0013324621" },
              { label: "VAT Registration", value: "3028900006" },
              { label: "Contractor Grade", value: "GC-1 (Grade One)" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-muted-foreground text-xs font-body uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-display font-bold text-foreground text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  </main>
);

export default About;
