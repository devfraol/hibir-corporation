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
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Structure</span>
          <h2 className="section-title mt-2">Organizational Hierarchy</h2>
        </AnimatedSection>

        {/* Org Chart */}
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4">
            {/* Board */}
            <div className="bg-primary text-primary-foreground rounded-xl px-10 py-5 font-display font-semibold text-center shadow-lg">
              Board of Management
            </div>
            <div className="w-px h-8 bg-border" />

            {/* CEO */}
            <div className="rounded-xl px-10 py-5 font-display font-semibold text-center shadow-lg border-2 border-accent" style={{ background: "var(--gold-gradient)" }}>
              Chief Executive Officer
            </div>
            <div className="w-px h-8 bg-border" />

            {/* Deputy CEOs */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 font-display font-semibold text-center shadow-md text-sm">
                Deputy CEO – Operations
              </div>
              <div className="hidden md:block w-16 h-px bg-border" />
              <div className="bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 font-display font-semibold text-center shadow-md text-sm">
                Deputy CEO – Support
              </div>
            </div>
            <div className="w-px h-8 bg-border" />

            {/* Departments */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
              {departments.map((d, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="bg-card rounded-lg p-4 text-center border border-border card-hover">
                    <p className="font-body font-medium text-sm">{d}</p>
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
