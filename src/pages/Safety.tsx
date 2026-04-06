import { ShieldCheck, HardHat, Eye, Award, CheckCircle, AlertTriangle, Wrench, ClipboardCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import safetyImg from "@/assets/safety-workers.jpg";

const safetyPoints = [
  { icon: <AlertTriangle size={24} />, title: "Zero Accidents Goal", desc: "Committed to zero accidents and zero man-hours lost across all construction sites." },
  { icon: <HardHat size={24} />, title: "PPE Compliance", desc: "Mandatory use of Personal Protective Equipment (PPE) for all personnel at all times." },
  { icon: <Wrench size={24} />, title: "Safe Tools & Equipment", desc: "Use of safe, inspected tools and equipment on every project site." },
  { icon: <ShieldCheck size={24} />, title: "Trained & Competent Staff", desc: "All workers receive regular safety training and emergency response preparation." },
  { icon: <Eye size={24} />, title: "On-Site Supervision", desc: "Regular on-site safety supervisions following scientific HSE procedures." },
];

const qualityPoints = [
  { icon: <ClipboardCheck size={24} />, title: "Procurement", desc: "Quality-controlled procurement processes ensuring only certified materials enter our sites." },
  { icon: <Wrench size={24} />, title: "Construction Process Control", desc: "Standardized construction processes with continuous monitoring at every stage." },
  { icon: <CheckCircle size={24} />, title: "Inspection & Testing", desc: "Rigorous material testing and construction inspection at every phase of the project." },
  { icon: <AlertTriangle size={24} />, title: "Non-Conformity Control", desc: "Systematic control of non-conforming outputs with corrective and preventive actions." },
];

const Safety = () => (
  <main>
    <PageHero title="Safety & Quality" subtitle="Uncompromising commitment to safety and quality excellence in every project" image={safetyImg} />

    {/* Safety */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Health, Safety & Environment</span>
          <h2 className="section-title mt-3">Zero Accidents, Zero Compromise</h2>
          <p className="section-subtitle mx-auto mt-4">The corporation has undertaken safety and security by following scientific procedures and setting principles for strict implementation and follow-up. Our HSE system ensures a safe workplace.</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <img src={safetyImg} alt="Quality control on construction site" className="relative rounded-2xl shadow-2xl shadow-black/30" loading="lazy" />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Quality Policy</span>
          <h2 className="section-title mt-3 mb-4">Major Functional Areas</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            HCC is committed to operating every aspect of construction to the highest possible quality standards. Our progressive management style encourages a quality culture throughout the corporation, monitored by planned supervision, management reviews, and effective corrective and preventive actions.
          </p>
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

    {/* Customer First */}
    <AnimatedSection className="section-padding">
      <div className="container-custom">
        <div className="glass-card p-10 md:p-14 text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Eye className="text-accent" size={32} />
          </div>
          <h3 className="font-display font-semibold text-2xl mb-4 text-foreground">Customer First</h3>
          <p className="text-muted-foreground font-body leading-relaxed">
            HCC has created a system for receiving, recording, analyzing, forecasting, and taking corrective actions on all non-conformities and complaints pointed out by clients. We take pride in the high quality of our services and maintain a rigorous quality review process from outset to completion.
          </p>
        </div>
      </div>
    </AnimatedSection>

    {/* Awards */}
    <AnimatedSection className="section-padding">
      <div className="container-custom text-center">
        <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Recognition</span>
        <h2 className="section-title mt-3 mb-14">Awards & Certifications</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "National Kaizen Award — 1st Place", desc: "Awarded by Ethiopian Kaizen Institute on October 29, 2019 for implementing first-level Kaizen — ranked 1st nationally." },
            { title: "GC-1 Contractor Grade", desc: "Certified as Grade One General Contractor by Ethiopian Construction Authority (valid until 08/05/2027)." },
            { title: "ANRS Revenue Bureau Recognition", desc: "Recognized by Amhara National Regional State Bureau of Revenue for outstanding compliance and corporate responsibility." },
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
