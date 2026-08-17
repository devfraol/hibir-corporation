import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import heroImg from "@/assets/hero-highway.jpg";

/** Verified figures from the company profile. */
const dataCards = [
  { value: "GC-1", label: "Contractor Grade", pos: "top-[22%] right-[6%]", depth: 26 },
  { value: "803", label: "Professionals", pos: "top-[44%] right-[14%]", depth: 42 },
  { value: "242", label: "Plant & Machinery Units", pos: "bottom-[26%] right-[7%]", depth: 34 },
  { value: "2.5B+", label: "Birr Annual Turnover", pos: "bottom-[13%] left-[4%]", depth: 20 },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  // Hero transforms into the next section rather than simply scrolling away.
  const imageScale = useTransform(smooth, [0, 1], [1.12, 1]);
  const imageY = useTransform(smooth, [0, 1], ["0%", "12%"]);
  const titleY = useTransform(smooth, [0, 1], ["0%", "-42%"]);
  const titleOpacity = useTransform(smooth, [0, 0.7], [1, 0]);
  const cardsX = useTransform(smooth, [0, 1], [0, 120]);
  const cardsOpacity = useTransform(smooth, [0, 0.55], [1, 0]);
  const gridRotate = useTransform(smooth, [0, 1], [58, 74]);
  const gridOpacity = useTransform(smooth, [0, 0.8], [0.7, 0]);
  const veil = useTransform(smooth, [0, 1], [0, 0.55]);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setPointer({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        }),
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const px = reduced ? 0 : pointer.x;
  const py = reduced ? 0 : pointer.y;

  const words = ["Engineering", "the connections", "that move", "Ethiopia forward"];

  return (
    <section
      ref={ref}
      aria-label="Hibir Construction Corporation — infrastructure in motion"
      className="relative h-[100svh] min-h-[640px] overflow-hidden"
    >
      {/* Layer 1 — cinematic background */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
        <motion.img
          src={heroImg}
          alt="Highway infrastructure under construction in Ethiopia"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ x: px * -18, y: py * -12 }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
          style={{ scale: 1.08 }}
        />
      </motion.div>

      {/* Layer 2 — gradient overlays (keep text readable in both themes) */}
      <div className="absolute inset-0 media-overlay-side" aria-hidden />
      <div className="absolute inset-0 media-overlay" aria-hidden />
      <motion.div className="absolute inset-0 bg-background" style={{ opacity: veil }} aria-hidden />

      {/* Layer 3 — engineering blueprint plane in perspective */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
        style={{ opacity: gridOpacity, perspective: 700 }}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 origin-bottom"
          style={{
            rotateX: gridRotate,
            backgroundImage:
              "linear-gradient(hsla(0,0%,100%,0.16) 1px, transparent 1px), linear-gradient(90deg, hsla(0,0%,100%,0.16) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage: "linear-gradient(to top, black, transparent 78%)",
            WebkitMaskImage: "linear-gradient(to top, black, transparent 78%)",
            x: px * 18,
          }}
        />
      </motion.div>

      {/* Layer 4 — drifting light particles */}
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-accent/50"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                filter: "blur(0.5px)",
              }}
              animate={{ y: [0, -60, 0], opacity: [0, 0.7, 0] }}
              transition={{ duration: 9 + (i % 5) * 2, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* Layer 5 — composition */}
      <div className="relative h-full container-custom px-4 md:px-8 flex flex-col justify-center">
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden />
            <span className="text-[10px] md:text-[11px] font-body font-semibold tracking-[0.28em] uppercase on-media">
              Hibir Construction Corporation
            </span>
          </motion.div>

          <h1 className="display-xl on-media uppercase">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 44, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, delay: 0.15 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${i === 3 ? "text-gradient-gold" : ""}`}
                style={{ x: px * (i % 2 === 0 ? -6 : -10) }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to="/projects" className="btn-accent text-sm" data-cursor="VIEW PROJECTS">
              Explore Projects <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline-media text-sm">
              About the Corporation
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating interface data cards */}
        <motion.div style={{ x: cardsX, opacity: cardsOpacity }} className="pointer-events-none" aria-hidden>
          {dataCards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: px * c.depth * -1,
              }}
              transition={{ delay: 0.85 + i * 0.12, duration: 0.6, ease: "easeOut" }}
              className={`hidden lg:block absolute ${c.pos} rounded-xl border border-white/15 bg-black/35 backdrop-blur-xl px-5 py-3.5`}
              style={{ boxShadow: "0 20px 50px -30px rgba(0,0,0,0.9)" }}
            >
              <div className="font-display font-bold text-xl text-gradient-gold leading-none">{c.value}</div>
              <div className="text-[9px] font-body tracking-[0.2em] uppercase on-media-muted mt-1.5">{c.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: titleOpacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-body tracking-[0.3em] uppercase on-media-muted">Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-accent"
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Hero;
