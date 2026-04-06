import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-construction.jpg";

const deputyCEOs = [
  {
    title: "Deputy CEO — Construction / Projects",
    departments: [
      "Claim Office",
      "Construction Operation Directorate",
      "Design & Contract Admin Directorate",
      "Manpower Development & Admin Directorate",
    ],
  },
  {
    title: "Deputy CEO — Administrative",
    departments: [
      "Finance Directorate",
      "Procurement Directorate",
      "Property Administration Directorate",
    ],
  },
  {
    title: "Deputy CEO — Machinery & Production / AA Branch / Mega Projects",
    departments: [
      "Machinery Administration Directorate",
      "Machinery Maintenance Directorate",
      "Plant & Production Unit Directorate",
    ],
  },
];

const ceoDirectReports = [
  "Chief Technical Advisory",
  "Marketing & Promotion Directorate",
  "Business Development & Planning",
  "Legal Service Directorate",
  "Internal Audit Directorate",
];

const Organization = () => (
  <main>
    <PageHero title="Organization" subtitle="Our governance structure and organizational hierarchy" image={heroImg} />

    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-20">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Structure</span>
          <h2 className="section-title mt-3">Organizational Hierarchy</h2>
          <p className="section-subtitle mx-auto mt-4">The corporation is governed by the Board of Management, led by the CEO with three Deputy CEOs overseeing key operational areas</p>
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
              <div>Chief Executive Officer</div>
              <div className="text-xs font-body font-normal mt-1 opacity-80">Ato Mebit Admas</div>
            </div>
            <div className="w-px h-6 bg-border" />

            {/* CEO Direct Reports */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full max-w-5xl">
              {ceoDirectReports.map((d, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className="glass-card p-3 text-center">
                    <p className="font-body font-medium text-xs text-muted-foreground">{d}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div className="w-px h-8 bg-border" />

            {/* Deputy CEOs */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
              {deputyCEOs.map((dep, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="glass-card p-6 h-full">
                    <div className="glass-card px-4 py-3 font-display font-semibold text-center text-sm text-foreground mb-5"
                      style={{ borderColor: "hsla(38, 92%, 50%, 0.2)" }}>
                      {dep.title}
                    </div>
                    <div className="space-y-2">
                      {dep.departments.map((dept, j) => (
                        <div key={j} className="px-3 py-2.5 rounded-lg bg-secondary/50 text-center">
                          <p className="font-body text-xs text-muted-foreground">{dept}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Board Responsibilities */}
        <AnimatedSection className="mt-20">
          <div className="glass-card p-8 md:p-10 max-w-4xl mx-auto">
            <h3 className="font-display font-semibold text-xl mb-6 text-center text-foreground">Key Board Responsibilities</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Recruit and appoint CEO and Deputy CEOs",
                "Approve organizational structure and salaries",
                "Examine and approve work plans and budgets",
                "Approve long-term loans and fixed asset sales",
                "Ensure proper maintenance of books of account",
                "Submit capital recommendations to the Authority",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <p className="text-muted-foreground text-sm font-body">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Organization;
