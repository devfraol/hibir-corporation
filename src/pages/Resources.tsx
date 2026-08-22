import { motion } from "framer-motion";
import { Truck, Users, Wrench, Factory, GraduationCap, Briefcase, CarFront, Cog } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import equipmentImg from "@/assets/equipment-fleet.jpg";

const machinery = [
  { id: "vehicles", icon: <CarFront size={28} />, label: "Vehicles", count: 155, desc: "Light and heavy duty vehicles including dump trucks, water tankers and fuel tankers" },
  { id: "plants", icon: <Factory size={28} />, label: "Plants", count: 10, desc: "Crusher, sand making and asphalt plants for in-house material production" },
  { id: "machinery", icon: <Wrench size={28} />, label: "Machinery", count: 117, desc: "Earth moving and tyre machines including excavators, graders, bulldozers and rollers" },
];

const staffByPosition = [
  { icon: <Briefcase size={28} />, label: "Top Managements", count: 5 },
  { icon: <Users size={28} />, label: "Directors", count: 13 },
  { icon: <Cog size={28} />, label: "Project Managers", count: 12 },
  { icon: <Wrench size={28} />, label: "Professionals & Technical", count: 813 },
];

const staffByEducation = [
  { label: "Master's Degree", count: 66 },
  { label: "Bachelor's Degree", count: 365 },
  { label: "Advanced Diploma", count: 86 },
  { label: "Diploma", count: 82 },
  { label: "Certificate", count: 30 },
  { label: "10th/12th Grade", count: 214 },
];

const Resources = () => (
  <main>
    <PageHero title="Our Resources" subtitle="282 vehicles, plants and machinery units and 843 skilled professionals powering Ethiopia's development" image={equipmentImg} />

    {/* Stats */}
    <section className="relative -mt-16 z-20 px-4 md:px-8 mb-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { end: 843, suffix: "", label: "Total Staff" },
            { end: 282, suffix: "", label: "Vehicles, Plants & Machinery" },
            { end: 10, suffix: "", label: "Production Plants" },
            { end: 365, suffix: "", label: "Bachelor's+ Holders" },
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
    <section id="equipment-capacity" className="section-padding scroll-mt-24">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Machinery & Equipment</span>
          <h2 className="section-title mt-3">Our Fleet</h2>
          <p className="section-subtitle mx-auto mt-4">Built through gradual investment expansion to strategically grow capacity</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-8">
          {machinery.map((m, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div id={m.id} className="glass-card p-8 text-center h-full scroll-mt-28">
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
    <section id="human-resources" className="section-padding scroll-mt-24">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Human Resources</span>
          <h2 className="section-title mt-3">Our Team by Position</h2>
          <p className="section-subtitle mx-auto mt-4">843 skilled professionals across management, engineering, and technical roles</p>
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
                      whileInView={{ width: `${(s.count / 843) * 100}%` }}
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
                      whileInView={{ width: `${(s.count / 843) * 100}%` }}
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

    {/* Financial capacity */}
    <section id="financial-capacity" className="section-padding scroll-mt-24">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-14">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Financial Capacity</span>
          <h2 className="section-title mt-3">The Balance Sheet Behind Delivery</h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { value: "ETB 3.4B+", label: "Average annual construction turnover" },
            { value: "ETB 25B+", label: "Active project contract value" },
            { value: "ETB 929M+", label: "Recorded capital" },
          ].map((f) => (
            <div key={f.label} className="glass-card p-8 text-center">
              <div className="text-3xl font-display font-bold text-gradient-gold">{f.value}</div>
              <p className="text-sm text-muted-foreground font-body mt-2">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Construction experience */}
    <section id="construction-experience" className="section-padding pt-0 scroll-mt-24">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-14">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Construction Experience</span>
          <h2 className="section-title mt-3">Fifteen Years of Infrastructure Delivery</h2>
          <p className="section-subtitle mx-auto mt-4">
            From the 2010 establishment as Amhara Road Works Enterprise to corporation status under Proclamation
            No. 214/2024, HCC has delivered asphalt and gravel roads, bridges, urban infrastructure and building
            works as a GC-1 classified general contractor.
          </p>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Resources;
