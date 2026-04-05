import { ShieldCheck, HardHat, Eye, Award, CheckCircle, AlertTriangle } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import safetyImg from "@/assets/safety-workers.jpg";

const safetyPoints = [
  { icon: <AlertTriangle size={24} />, title: "Zero Accidents Goal", desc: "Committed to zero accidents and zero man-hours lost across all sites." },
  { icon: <HardHat size={24} />, title: "PPE Compliance", desc: "Mandatory personal protective equipment for all personnel at all times." },
  { icon: <Eye size={24} />, title: "Safety Supervision", desc: "Dedicated safety officers at every active construction site." },
  { icon: <ShieldCheck size={24} />, title: "Trained Staff", desc: "Regular safety training and emergency response drills for all workers." },
];

const qualityPoints = [
  { icon: <CheckCircle size={24} />, title: "Inspection & Testing", desc: "Rigorous material testing and construction inspection at every phase." },
  { icon: <Award size={24} />, title: "Process Control", desc: "Standardized processes with continuous monitoring and improvement." },
  { icon: <Eye size={24} />, title: "Customer-First Approach", desc: "Exceeding client expectations through superior quality deliverables." },
];

const Safety = () => (
  <main>
    <PageHero title="Safety & Quality" subtitle="Uncompromising commitment to safety and quality excellence" image={safetyImg} />

    {/* Safety */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Safety Policy</span>
          <h2 className="section-title mt-3">Zero Accidents, Zero Compromise</h2>
          <p className="section-subtitle mx-auto mt-4">Safety is not just a policy — it's a core value embedded in every operation.</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyPoints.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="glass-card p-7 h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5">
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold mb-2 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Quality */}
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      <div className="container-custom relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl" />
            <img src={safetyImg} alt="Safety on construction site" className="relative rounded-2xl shadow-2xl shadow-black/30" loading="lazy" />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Quality Assurance</span>
          <h2 className="section-title mt-3 mb-8">Our Quality Policy</h2>
          <div className="space-y-6">
            {qualityPoints.map((q, i) => (
              <div key={i} className="flex gap-4 glass-card p-5">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  {q.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{q.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{q.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Awards */}
    <AnimatedSection className="section-padding">
      <div className="container-custom text-center">
        <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Recognition</span>
        <h2 className="section-title mt-3 mb-14">Awards & Certifications</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "ISO 9001:2015", desc: "Quality Management System Certified" },
            { title: "National Safety Award", desc: "Recognized for outstanding site safety record" },
            { title: "Best Contractor Award", desc: "Amhara Region Best Performing Contractor" },
          ].map((a, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="glass-card p-8 h-full">
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
    </AnimatedSection>
  </main>
);

export default Safety;
