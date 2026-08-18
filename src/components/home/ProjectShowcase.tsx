import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { formatBirr, projects } from "@/data/projects";

const featured = projects.slice(0, 6);

const Panel = ({ project }: { project: (typeof featured)[number] }) => (
  <article
    className="group relative shrink-0 w-[82vw] sm:w-[58vw] lg:w-[38vw] xl:w-[32vw] h-[62vh] max-h-[560px] rounded-3xl overflow-hidden border border-border transition-colors duration-500 hover:border-accent/60"
  >
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/35 to-transparent" />

    <div className="absolute inset-0 p-7 flex flex-col justify-end">
      <span
        className={`self-start px-3 py-1 rounded-full text-[10px] font-body font-bold tracking-[0.18em] uppercase backdrop-blur-md border mb-5 ${
          project.status === "Completed"
            ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
            : "bg-accent/20 text-accent border-accent/40"
        }`}
      >
        {project.status}
      </span>

      <h3 className="font-display font-bold text-xl md:text-2xl on-media leading-snug mb-4">{project.title}</h3>

      <div className="overflow-hidden">
        <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <dl className="space-y-1.5 text-xs font-body on-media-muted">
            <div className="flex gap-2">
              <dt className="uppercase tracking-[0.14em] opacity-70">Client</dt>
              <dd className="on-media">{project.client}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="uppercase tracking-[0.14em] opacity-70">Value</dt>
              <dd className="text-accent font-semibold">{formatBirr(project.budget)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-body font-bold tracking-[0.18em] uppercase text-accent">
        Details
        <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1.5" />
      </span>
    </div>
  </article>
);

const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches && !reduced);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduced]);

  useEffect(() => {
    if (!isDesktop) return;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 26, mass: 0.5 });

  const header = (
    <div className="container-custom px-4 md:px-8 flex flex-wrap items-end justify-between gap-6 mb-10">
      <div>
        <span className="label-eyebrow">Selected Works</span>
        <h2 id="project-showcase" className="section-title mt-4 max-w-xl">
          A portfolio exceeding 20.3 billion Birr
        </h2>
      </div>
      <Link to="/projects" className="btn-outline-light text-sm px-6 py-3">
        All projects <ArrowRight size={16} />
      </Link>
    </div>
  );

  if (!isDesktop) {
    return (
      <section aria-labelledby="project-showcase" className="py-24 md:py-28 overflow-hidden">
        {header}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 md:px-8 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((p) => (
            <div key={p.title} className="snap-center">
              <Panel project={p} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-labelledby="project-showcase" style={{ height: `${distance + window.innerHeight}px` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {header}
        <motion.div ref={trackRef} style={{ x: smoothX }} className="flex gap-6 pl-4 md:pl-8 will-change-transform">
          {featured.map((p) => (
            <Panel key={p.title} project={p} />
          ))}
          <div className="shrink-0 w-16" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
