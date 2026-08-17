import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";

/** All figures taken from the company profile. */
const stats = [
  { end: 242, label: "Vehicles, plants & machinery", suffix: "" },
  { end: 803, label: "Human resources", suffix: "" },
  { end: 146, label: "Vehicles", suffix: "" },
  { end: 89, label: "Machinery units", suffix: "" },
  { end: 7, label: "Plants", suffix: "" },
  { end: 2.5, label: "Birr annual turnover", suffix: "B+", decimals: 1 },
  { end: 20.3, label: "Birr asphalt portfolio (incl. VAT)", suffix: "B+", decimals: 1 },
];

const StatsSection = () => (
  <section aria-labelledby="capacity" className="relative section-padding overflow-hidden">
    <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] rounded-full bg-accent/10 blur-[160px]" aria-hidden />

    <div className="container-custom relative">
      <ScrollReveal className="max-w-3xl mb-16">
        <span className="label-eyebrow">Capacity</span>
        <h2 id="capacity" className="section-title mt-4">
          The scale behind every kilometre we deliver
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`bg-background p-7 md:p-9 transition-colors duration-500 hover:bg-surface ${
              i === stats.length - 1 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <Counter end={s.end} suffix={s.suffix} label={s.label} decimals={s.decimals ?? 0} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
