import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import roadImg from "@/assets/road-construction.jpg";
import machineryImg from "@/assets/capacity-machinery.jpg";
import highwayImg from "@/assets/hero-highway.jpg";

/** Company history exactly as recorded in the company profile. */
const milestones = [
  {
    year: "2010",
    title: "Amhara Road Works Enterprise",
    text: "Established as Amhara Road Works Enterprise by Proclamation No. 71/2010, with a mandate to construct, improve and maintain roads across the region.",
    image: roadImg,
  },
  {
    year: "2018",
    title: "Re-established",
    text: "Re-established under Proclamation No. 170/2018, expanding the enterprise's mandate and delivery capacity across regional and national road works.",
    image: machineryImg,
  },
  {
    year: "2024",
    title: "Hibir Construction Corporation",
    text: "Upgraded and re-established as Hibir Construction Corporation by Proclamation No. 214/2024, accountable to the Regional Public Enterprises' Authority.",
    image: highwayImg,
  },
];

const Milestone = ({ item, index }: { item: (typeof milestones)[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative grid md:grid-cols-2 gap-10 lg:gap-20 items-center py-14 md:py-20">
      <ScrollReveal direction={index % 2 === 0 ? "left" : "right"} className={index % 2 === 1 ? "md:order-2" : ""}>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-display font-bold text-5xl md:text-7xl text-gradient-gold leading-none">{item.year}</span>
          <span className="h-px flex-1 bg-border" aria-hidden />
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">{item.title}</h3>
        <p className="text-muted-foreground font-body leading-relaxed max-w-lg">{item.text}</p>
      </ScrollReveal>

      <ScrollReveal
        direction="scale"
        delay={0.1}
        className={`relative overflow-hidden rounded-3xl border border-border ${index % 2 === 1 ? "md:order-1" : ""}`}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img
            src={item.image}
            alt={`${item.year} — ${item.title}`}
            loading="lazy"
            style={{ y: imgY }}
            className="w-full h-[118%] object-cover"
          />
        </div>
      </ScrollReveal>
    </div>
  );
};

const Timeline = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 65%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section aria-labelledby="company-evolution" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-30" aria-hidden />
      <div className="container-custom relative">
        <ScrollReveal className="max-w-2xl mb-8">
          <span className="label-eyebrow">Company Evolution</span>
          <h2 id="company-evolution" className="section-title mt-4">
            Fifteen years of building the region's road network
          </h2>
        </ScrollReveal>

        <div ref={trackRef} className="relative">
          {/* Progress rail */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border" aria-hidden>
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top"
              style={{ scaleY, backgroundImage: "var(--gold-gradient)" }}
            />
          </div>

          {milestones.map((m, i) => (
            <Milestone key={m.year} item={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
