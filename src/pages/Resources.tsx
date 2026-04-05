import { motion } from "framer-motion";
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
    <section className="relative -mt-16 z-20 px-4 md:px-8 mb-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { end: 800, suffix: "+", label: "Total Staff" },
            { end: 242, suffix: "", label: "Total Machinery" },
            { end: 7, suffix: "", label: "Production Plants" },
            { end: 25, suffix: "+", label: "Years Experience" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card p-6 md:p-8 text-center"
            >
              <Counter end={s.end} suffix={s.suffix} label={s.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Machinery */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Machinery & Equipment</span>
          <h2 className="section-title mt-3">Our Fleet</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-8">
          {machinery.map((m, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div className="glass-card p-8 text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-5">
                  {m.icon}
                </div>
                <div className="text-4xl font-display font-bold text-gradient-gold mb-2">{m.count}</div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{m.label}</h3>
                <p className="text-muted-foreground text-sm font-body">{m.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Human Resources */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Human Resources</span>
          <h2 className="section-title mt-3">Our Team</h2>
          <p className="section-subtitle mx-auto mt-4">Over 800 skilled professionals dedicated to building Ethiopia's infrastructure</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {staff.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="glass-card p-6 text-center h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                  {s.icon}
                </div>
                <div className="text-3xl font-display font-bold text-foreground mb-1">{s.count}</div>
                <p className="text-muted-foreground text-sm font-body">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Progress bars */}
        <AnimatedSection className="mt-16">
          <div className="glass-card p-8 md:p-10">
            <h3 className="font-display font-semibold text-xl mb-10 text-center text-foreground">Workforce Distribution</h3>
            <div className="space-y-8">
              {staff.map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm font-body text-muted-foreground w-36 shrink-0">{s.label}</span>
                  <div className="flex-1 bg-secondary rounded-full h-8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(s.count / 800) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
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

export default Resources;
