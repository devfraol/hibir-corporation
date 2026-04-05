import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-construction.jpg";

const departments = [
  "Finance & Procurement",
  "Human Resources",
  "Engineering & Design",
  "Project Management",
  "Plant & Equipment",
  "Safety & Environment",
  "Legal Affairs",
  "Audit & Inspection",
];

const Organization = () => (
  <main>
    <PageHero title="Organization" subtitle="Our governance and organizational structure" image={heroImg} />

    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-20">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Structure</span>
          <h2 className="section-title mt-3">Organizational Hierarchy</h2>
        </AnimatedSection>

        {/* Org Chart */}
        <AnimatedSection>
          <div className="flex flex-col items-center gap-5">
            {/* Board */}
            <div className="glass-card px-10 py-6 font-display font-semibold text-center text-foreground"
              style={{ borderColor: "hsla(38, 92%, 50%, 0.3)", boxShadow: "0 0 30px hsla(38, 92%, 50%, 0.1)" }}>
              Board of Management
            </div>
            <div className="w-px h-10 bg-border" />

            {/* CEO */}
            <div className="rounded-2xl px-10 py-6 font-display font-bold text-center text-accent-foreground shadow-lg"
              style={{ background: "var(--gold-gradient)", boxShadow: "0 0 40px hsla(38, 92%, 50%, 0.2)" }}>
              Chief Executive Officer
            </div>
            <div className="w-px h-10 bg-border" />

            {/* Deputy CEOs */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="glass-card px-8 py-5 font-display font-semibold text-center text-sm text-foreground">
                Deputy CEO – Operations
              </div>
              <div className="hidden md:block w-20 h-px bg-border" />
              <div className="glass-card px-8 py-5 font-display font-semibold text-center text-sm text-foreground">
                Deputy CEO – Support
              </div>
            </div>
            <div className="w-px h-10 bg-border" />

            {/* Departments */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
              {departments.map((d, i) => (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <div className="glass-card p-4 text-center">
                    <p className="font-body font-medium text-sm text-muted-foreground">{d}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Organization;
