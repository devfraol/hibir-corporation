import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import { companyStatCards } from "@/data/company";

/** All figures taken from the 2026 company profile. */
const groups = [companyStatCards.slice(0, 5), companyStatCards.slice(5)];

const StatsSection = () => (
  <section id="at-a-glance" aria-labelledby="capacity" className="relative section-padding overflow-hidden scroll-mt-24">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] rounded-full bg-accent/10 blur-[160px]" aria-hidden />

    <div className="container-custom relative">
      <ScrollReveal className="max-w-3xl mb-14">
        <span className="label-eyebrow">Company at a Glance</span>
        <h2 id="capacity" className="section-title mt-4">
          The scale behind every kilometre we deliver
        </h2>
      </ScrollReveal>

      <div className="space-y-6">
        {groups.map((group, gi) => (
          <div
            key={gi}
            className={`grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border ${
              gi === 0 ? "md:grid-cols-5" : "md:grid-cols-3"
            }`}
          >
            {group.map((s) => (
              <div
                key={s.label}
                className="bg-background p-7 md:p-8 transition-colors duration-500 hover:bg-surface"
              >
                <Counter end={s.end} suffix={s.suffix} label={s.label} decimals={s.decimals ?? 0} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
