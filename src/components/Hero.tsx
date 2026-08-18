import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import heroPoster from "@/assets/hero-highway.jpg";
import heroVideo from "@/assets/hero-infrastructure.mp4.asset.json";

/** Verified figures from the company profile. */
const indicators = [
  { value: "GC-1", label: "Contractor Grade" },
  { value: "803+", label: "Professionals" },
  { value: "242", label: "Plant & Machinery Units" },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const mediaScale = useTransform(smooth, [0, 1], [1.06, 0.94]);
  const mediaY = useTransform(smooth, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(smooth, [0, 1], ["0%", "-32%"]);
  const contentOpacity = useTransform(smooth, [0, 0.65], [1, 0]);
  const panelY = useTransform(smooth, [0, 1], ["0%", "-14%"]);
  const panelOpacity = useTransform(smooth, [0, 0.55], [1, 0]);
  const veil = useTransform(smooth, [0, 1], [0, 0.6]);

  /** Pause playback when the hero leaves the viewport (performance). */
  useEffect(() => {
    const el = ref.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;
  const lines = [
    { text: "Engineering", accent: false },
    { text: "the connections", accent: false },
    { text: "that move", accent: false },
    { text: "Ethiopia forward", accent: true },
  ];

  return (
    <section
      ref={ref}
      aria-label="Hibir Construction Corporation — infrastructure in motion"
      className="relative h-[100svh] min-h-[620px] overflow-hidden"
    >
      {/* Layer 1 — cinematic video (poster fallback) */}
      <motion.div className="absolute inset-0" style={{ scale: mediaScale, y: mediaY }}>
        <img
          src={heroPoster}
          alt="Newly constructed highway in Ethiopia with construction machinery on site"
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
          src={heroVideo.url}
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

      {/* Layer 2 — cinematic gradients, bloom and vignette */}
      <div className="absolute inset-0 media-overlay-side" aria-hidden />
      <div className="absolute inset-0 media-overlay" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 45% at 78% 28%, hsl(var(--accent) / 0.20), transparent 70%), radial-gradient(50% 40% at 10% 85%, hsl(var(--accent) / 0.10), transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ boxShadow: "inset 0 0 220px 60px rgba(0,0,0,0.55)" }}
      />
      <motion.div className="absolute inset-0 bg-background" style={{ opacity: veil }} aria-hidden />

      {/* Layer 3 — very light atmospheric particles */}
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-accent/35"
              style={{
                width: 2 + (i % 2),
                height: 2 + (i % 2),
                left: `${(i * 41) % 100}%`,
                top: `${(i * 59) % 100}%`,
                filter: "blur(0.6px)",
              }}
              animate={{ y: [0, -70, 0], opacity: [0, 0.5, 0] }}
              transition={{ duration: 12 + (i % 4) * 3, repeat: Infinity, delay: i * 1.1, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* Layer 4 — composition */}
      <div className="relative h-full container-custom px-4 md:px-8 flex items-center">
        <div className="w-full grid lg:grid-cols-12 gap-10 items-center">
          <motion.div style={{ y: contentY, opacity: contentOpacity }} className="lg:col-span-7 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
              <span className="text-[10px] font-body font-semibold tracking-[0.28em] uppercase on-media">
                Hibir Construction Corporation
              </span>
            </motion.div>

            <h1 className="hero-display on-media uppercase">
              {lines.map((l, i) => (
                <motion.span
                  key={l.text}
                  initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.95, delay: 0.25 + i * 0.14, ease }}
                  className={`block ${l.accent ? "text-accent" : ""}`}
                >
                  {l.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8, ease }}
              className="mt-7 max-w-md text-sm md:text-[15px] leading-relaxed font-body on-media-muted"
            >
              Building roads, bridges and infrastructure that connect communities, enable economic
              activity and support Ethiopia's continued development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link to="/projects" className="btn-accent text-sm">
                Explore Projects <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-outline-media text-sm">
                About Hibir
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — restrained data panel */}
          <motion.div
            style={{ y: panelY, opacity: panelOpacity }}
            className="hidden lg:flex lg:col-span-5 xl:col-span-4 xl:col-start-9 justify-end"
          >
            <div className="w-full max-w-xs rounded-2xl border border-white/12 bg-black/30 backdrop-blur-xl divide-y divide-white/10">
              {indicators.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.15 + i * 0.14, duration: 0.75, ease }}
                  className="px-6 py-5"
                >
                  <div className="font-display font-bold text-2xl xl:text-3xl text-gradient-gold leading-none">
                    {c.value}
                  </div>
                  <div className="text-[9px] font-body tracking-[0.22em] uppercase on-media-muted mt-2">
                    {c.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-body tracking-[0.3em] uppercase on-media-muted">Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="text-accent"
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Hero;
