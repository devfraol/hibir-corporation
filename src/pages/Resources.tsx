import { Truck, Users, Wrench, Factory, GraduationCap, Briefcase } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import equipmentImg from "@/assets/equipment-fleet.jpg";

const machinery = [
  { icon: <Truck size={28} />, label: "Vehicles", count: 146, desc: "Dump trucks, water tankers, fuel tankers, and support vehicles" },
  { icon: <Factory size={28} />, label: "Plants", count: 7, desc: "Asphalt plants, crushing plants, concrete batching plants" },
  { icon: <Wrench size={28} />, label: "Equipment", count: 89, desc: "Excavators, graders, bulldozers, loaders, rollers" },
];

const staff = [
  { icon: <GraduationCap size={28} />, label: "Engineers", count: 120 },
  { icon: <Briefcase size={28} />, label: "Managers & Admin", count: 85 },
  { icon: <Users size={28} />, label: "Technical Staff", count: 250 },
  { icon: <Wrench size={28} />, label: "Operators & Workers", count: 345 },
];

const Resources = () => (
  <main>
    <PageHero title="Our Resources" subtitle="State-of-the-art machinery and skilled workforce powering Ethiopia's development" image={equipmentImg} />

    {/* Stats */}
    <section className="bg-primary py-16">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
        <Counter end={800} suffix="+" label="Total Staff" />
        <Counter end={242} label="Total Machinery" />
        <Counter end={7} label="Production Plants" />
        <Counter end={25} suffix="+" label="Years Experience" />
      </div>
    </section>

    {/* Machinery */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Machinery & Equipment</span>
          <h2 className="section-title mt-2">Our Fleet</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-8">
          {machinery.map((m, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-card rounded-xl p-8 border border-border card-hover text-center">
                <div className="text-accent mx-auto mb-4">{m.icon}</div>
                <div className="text-4xl font-display font-bold text-foreground mb-2">{m.count}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{m.label}</h3>
                <p className="text-muted-foreground text-sm font-body">{m.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Human Resources */}
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Human Resources</span>
          <h2 className="section-title mt-2">Our Team</h2>
          <p className="section-subtitle mx-auto mt-4">Over 800 skilled professionals dedicated to building Ethiopia's infrastructure</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {staff.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-card rounded-xl p-6 border border-border text-center card-hover">
                <div className="text-accent mx-auto mb-3">{s.icon}</div>
                <div className="text-3xl font-display font-bold mb-1">{s.count}</div>
                <p className="text-muted-foreground text-sm font-body">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bar Chart Visual */}
        <AnimatedSection className="mt-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="font-display font-semibold text-xl mb-8 text-center">Workforce Distribution</h3>
            <div className="space-y-6">
              {staff.map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm font-body text-muted-foreground w-36 shrink-0">{s.label}</span>
                  <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(s.count / 800) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className="h-full rounded-full flex items-center justify-end pr-3"
                      style={{ background: "var(--gold-gradient)" }}
                    >
                      <span className="text-xs font-body font-bold text-accent-foreground">{s.count}</span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

import { motion } from "framer-motion";
export default Resources;
