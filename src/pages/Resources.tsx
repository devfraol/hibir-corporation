import { motion } from "framer-motion";
import { Truck, Users, Wrench, Factory, GraduationCap, Briefcase, CarFront, Cog } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import equipmentImg from "@/assets/equipment-fleet.jpg";

const machinery = [
  { icon: <CarFront size={28} />, label: "Vehicles", count: 146, desc: "82 light vehicles + 64 heavy duty vehicles including dump trucks, water tankers, and fuel tankers" },
  { icon: <Factory size={28} />, label: "Plants", count: 7, desc: "5 crusher & sand making plants + 2 asphalt plants for in-house material production" },
  { icon: <Wrench size={28} />, label: "Machinery", count: 89, desc: "39 earth moving machines + 50 machines with tyre including excavators, graders, bulldozers, and rollers" },
];

const staffByPosition = [
  { icon: <Briefcase size={28} />, label: "Top Managements", count: 5 },
  { icon: <Users size={28} />, label: "Directors", count: 13 },
  { icon: <Cog size={28} />, label: "Project Managers", count: 12 },
  { icon: <Wrench size={28} />, label: "Professionals & Technical", count: 773 },
];

const staffByEducation = [
  { label: "Master's Degree", count: 63 },
  { label: "Bachelor's Degree", count: 348 },
  { label: "Advanced Diploma", count: 82 },
  { label: "Diploma", count: 78 },
  { label: "Certificate", count: 29 },
  { label: "10th/12th Grade", count: 203 },
];

const Resources = () => (
  <main>
    <PageHero title="Our Resources" subtitle="242 units of machinery and 803 skilled professionals powering Ethiopia's development" image={equipmentImg} />

    {/* Stats */}
    <section className="relative -mt-16 z-20 px-4 md:px-8 mb-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { end: 803, suffix: "", label: "Total Staff" },
            { end: 242, suffix: "", label: "Total Machinery" },
            { end: 7, suffix: "", label: "Production Plants" },
            { end: 348, suffix: "", label: "Bachelor's+ Holders" },
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
          <p className="section-subtitle mx-auto mt-4">Built through gradual investment expansion to strategically grow capacity</p>
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

    {/* Human Resources by Position */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Human Resources</span>
          <h2 className="section-title mt-3">Our Team by Position</h2>
          <p className="section-subtitle mx-auto mt-4">803 skilled professionals across management, engineering, and technical roles</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {staffByPosition.map((s, i) => (
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

        {/* Progress bars by position */}
        <AnimatedSection className="mt-16">
          <div className="glass-card p-8 md:p-10">
            <h3 className="font-display font-semibold text-xl mb-10 text-center text-foreground">Workforce Distribution by Position</h3>
            <div className="space-y-8">
              {staffByPosition.map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm font-body text-muted-foreground w-44 shrink-0">{s.label}</span>
                  <div className="flex-1 bg-secondary rounded-full h-8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(s.count / 803) * 100}%` }}
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

    {/* Education Breakdown */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Education Profile</span>
          <h2 className="section-title mt-3">Staff by Educational Level</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {staffByEducation.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div className="glass-card p-6 text-center h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                  <GraduationCap size={22} />
                </div>
                <div className="text-2xl font-display font-bold text-foreground mb-1">{s.count}</div>
                <p className="text-muted-foreground text-xs font-body">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16">
          <div className="glass-card p-8 md:p-10">
            <h3 className="font-display font-semibold text-xl mb-10 text-center text-foreground">Education Distribution</h3>
            <div className="space-y-6">
              {staffByEducation.map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm font-body text-muted-foreground w-36 shrink-0">{s.label}</span>
                  <div className="flex-1 bg-secondary rounded-full h-7 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(s.count / 803) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full flex items-center justify-end pr-3"
                      style={{ background: "var(--gold-gradient)" }}
                    >
                      <span className="text-[10px] font-body font-bold text-accent-foreground">{s.count}</span>
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
