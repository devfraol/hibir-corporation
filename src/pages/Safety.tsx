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

    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Safety Policy</span>
          <h2 className="section-title mt-2">Zero Accidents, Zero Compromise</h2>
          <p className="section-subtitle mx-auto mt-4">
            Safety is not just a policy — it's a core value embedded in every operation.
          </p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyPoints.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-card rounded-xl p-6 border border-border card-hover h-full">
                <div className="text-accent mb-4">{s.icon}</div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-primary">
      <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <img src={safetyImg} alt="Safety on construction site" className="rounded-xl shadow-2xl" loading="lazy" width={1280} height={720} />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Quality Assurance</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mt-2 mb-8">Our Quality Policy</h2>
          <div className="space-y-6">
            {qualityPoints.map((q, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-accent shrink-0 mt-1">{q.icon}</div>
                <div>
                  <h3 className="font-display font-semibold text-primary-foreground mb-1">{q.title}</h3>
                  <p className="text-primary-foreground/60 text-sm font-body">{q.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    <AnimatedSection className="section-padding bg-muted/50">
      <div className="container-custom text-center">
        <h2 className="section-title mb-6">Awards & Certifications</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "ISO 9001:2015", desc: "Quality Management System Certified" },
            { title: "National Safety Award", desc: "Recognized for outstanding site safety record" },
            { title: "Best Contractor Award", desc: "Amhara Region Best Performing Contractor" },
          ].map((a, i) => (
            <div key={i} className="bg-card rounded-xl p-8 border border-border card-hover">
              <Award className="text-accent mx-auto mb-4" size={40} />
              <h3 className="font-display font-semibold text-lg mb-2">{a.title}</h3>
              <p className="text-muted-foreground text-sm font-body">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  </main>
);

export default Safety;
