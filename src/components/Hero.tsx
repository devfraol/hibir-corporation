import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import heroPoster from "@/assets/hero-highway.jpg";
import heroVideo from "@/assets/video.mp4";
import { companyStats } from "@/data/company";

const ease = [0.22, 1, 0.36, 1] as const;

/** Facts pulled from the single company data source. */
const facts = [
  { value: `${companyStats.staff}+`, label: "Staff" },
  { value: `ETB ${Math.round(companyStats.activeContractValueBirr / 1e9)}B+`, label: "Active Project Contracts" },
  { value: companyStats.contractorGrade, label: "Contractor Classification" },
  { value: "Bahir Dar", label: "Head Office" },
];

/** Thin line-drawn truss bridge used as a mid-depth layer. */
const HeroStructure = () => (
  <svg viewBox="0 0 1200 400" fill="none" className="w-full h-auto" aria-hidden>
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M0 300 H1200" />
      <path d="M0 312 H1200" opacity="0.5" />
      <path d="M80 300 Q600 40 1120 300" />
      {Array.from({ length: 21 }).map((_, i) => {
        const x = 80 + i * 52;
        const t = (x - 80) / 1040;
        const y = 300 - 4 * 260 * t * (1 - t) + 0;
        return <path key={i} d={`M${x} 300 V${y}`} opacity="0.7" />;
      })}
      {Array.from({ length: 20 }).map((_, i) => {
        const x1 = 80 + i * 52;
        const x2 = x1 + 52;
        const y2t = (x2 - 80) / 1040;
        const y2 = 300 - 4 * 260 * y2t * (1 - y2t);
        return <path key={`d${i}`} d={`M${x1} 300 L${x2} ${y2}`} opacity="0.35" />;
      })}
      <path d="M80 300 V380 M1120 300 V380 M600 300 V380" opacity="0.6" />
    </g>
  </svg>
);

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const mediaY = useTransform(smooth, [0, 1], ["0%", reduced ? "0%" : "10%"]);
  const structY = useTransform(smooth, [0, 1], ["0%", reduced ? "0%" : "-18%"]);
  const contentY = useTransform(smooth, [0, 1], ["0%", reduced ? "0%" : "-22%"]);
  const contentOpacity = useTransform(smooth, [0, 0.6], [1, 0]);

  // Pointer parallax — motion values only, no React re-renders.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 18 });
  const sy = useSpring(py, { stiffness: 40, damping: 18 });
  const mediaX = useTransform(sx, (v) => v * -10);
  const mediaPY = useTransform(sy, (v) => v * -6);
  const structX = useTransform(sx, (v) => v * 18);
  const structPY = useTransform(sy, (v) => v * 10);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduced, px, py]);

  useEffect(() => {
    const el = ref.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => undefined) : video.pause()),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = (delay: number, y = 18) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.3 : 0.9, delay: reduced ? 0 : delay, ease },
  });

  return (
    <section
      ref={ref}
      aria-label="Hibir Construction Corporation — engineering connections that shape tomorrow"
      className="relative min-h-[100svh] lg:min-h-[92vh] xl:min-h-[100svh] overflow-hidden flex flex-col"
      style={{ perspective: "1400px" }}
    >
      {/* Back layer — video */}
      <Layer x={mediaX} y={mediaY} y2={mediaPY} className="absolute -inset-6">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.12, rotateX: 4 }}
          animate={{ scale: 1.04, rotateX: 1.5 }}
          transition={{ duration: 2.4, ease }}
          style={{ transformOrigin: "50% 100%" }}
        >
          <img
            src={heroPoster}
            alt="Newly constructed highway in Ethiopia with construction machinery on site"
            fetchPriority="high"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
          />
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
            src={heroVideo}
            poster={heroPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden
            tabIndex={-1}
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
          />
        </motion.div>
      </Layer>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 hero-overlay-side" aria-hidden />
      <div className="absolute inset-0 hero-vignette" aria-hidden />
      <div className="absolute inset-0 hero-bloom" aria-hidden />

      {/* Mid layer — structural line drawing */}
      <Layer
        x={structX}
        y={structY}
        y2={structPY}
        className="absolute right-[-8%] bottom-[18%] w-[80%] max-w-[1100px] hidden md:block text-accent/25 pointer-events-none"
      >
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.1, ease }}
        >
          <HeroStructure />
        </motion.div>
      </Layer>

      {/* Front — content */}
      <div className="relative flex-1 flex items-center container-custom w-full px-5 md:px-8 pt-28 pb-10 lg:pt-32">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="max-w-4xl">
          <motion.div {...reveal(0.1, 12)} className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-accent" aria-hidden />
            <span className="text-[10px] md:text-[11px] font-body font-semibold tracking-[0.3em] uppercase on-media">
              Hibir Construction Corporation
            </span>
          </motion.div>

          <h1 className="font-display font-bold uppercase on-media leading-[1.02] tracking-[-0.025em] text-[2.1rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.4rem] xl:text-[3.9rem]">
            <motion.span {...reveal(0.3, 24)} className="block">
              Engineering Connections
            </motion.span>
            <motion.span {...reveal(0.45, 24)} className="block">
              That Shape <span className="text-gradient-gold">Tomorrow</span>
            </motion.span>
          </h1>

          <motion.p
            {...reveal(0.7)}
            className="mt-6 max-w-lg text-[15px] md:text-base leading-relaxed font-body on-media-muted"
          >
            Building roads, bridges and infrastructure that connect communities, enable economic
            activity and support Ethiopia's continued development.
          </motion.p>

          <motion.div
            {...reveal(0.85)}
            className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
          >
            <Link to="/projects" className="btn-accent text-sm w-full sm:w-auto">
              Explore Our Projects <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline-media text-sm w-full sm:w-auto">
              Discover Hibir
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating information strip */}
      <div className="relative container-custom w-full px-5 md:px-8 pb-16 md:pb-20">
        <motion.dl
          {...reveal(1.15, 24)}
          className="hero-strip grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden"
        >
          {facts.map((f) => (
            <div key={f.label} className="hero-strip-cell px-5 py-4 md:px-7 md:py-5">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-display font-bold text-xl md:text-2xl on-media leading-none">
                  {f.value}
                </span>
                <span className="block mt-2 text-[9px] md:text-[10px] font-body tracking-[0.22em] uppercase on-media-muted">
                  {f.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Soft transition into next section */}
      <div className="absolute inset-x-0 bottom-0 h-16 hero-fade pointer-events-none" aria-hidden />

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 z-10"
        aria-hidden
      >
        <span className="text-[9px] font-body tracking-[0.3em] uppercase text-muted-foreground">Scroll to explore</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          className="text-accent"
        >
          <ArrowDown size={12} />
        </motion.span>
      </motion.div>

    </section>
  );
};

interface LayerProps {
  x: MotionValue<number>;
  y: MotionValue<string>;
  y2: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
}

/** Depth layer combining scroll (y) and pointer (x, y2) offsets. */
const Layer = ({ x, y, y2, className, children }: LayerProps) => (
  <motion.div className={className} style={{ y }}>
    <motion.div className="absolute inset-0 md:relative md:inset-auto h-full" style={{ x, y: y2 }}>
      {children}
    </motion.div>
  </motion.div>
);

export default Hero;
