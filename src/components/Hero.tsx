import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImage from "@/assets/hero-highway.jpg";
import { companyStats } from "@/data/company";
import { useI18n } from "@/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial homepage hero: a real road-construction photograph fills the frame,
 * text sits on the left over a restrained overlay. No video or decorative layers.
 */
const Hero = () => {
  const { locale, path } = useI18n();
  const isAm = locale === "am";
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.2 : 0.8, delay: reduced ? 0 : delay, ease },
  });

  return (
    <section
      aria-label={isAm ? "ሂቢር ኮንስትራክሽን ኮርፖሬሽን" : "Hibir Construction Corporation"}
      className="relative min-h-[88svh] md:min-h-[86vh] overflow-hidden flex items-end md:items-center"
    >
      <img
        src={heroImage}
        alt={isAm ? "በኢትዮጵያ በግንባታ ላይ ያለ አውራ መንገድ" : "Highway under construction in Ethiopia with construction machinery on site"}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay-side" aria-hidden />
      <div className="absolute inset-0 hero-vignette" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-16 hero-fade pointer-events-none" aria-hidden />

      <div className="relative container-custom w-full px-5 md:px-8 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-2xl">
          <motion.div {...reveal(0.1)} className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent" aria-hidden />
            <span className="text-[10px] md:text-[11px] font-body font-semibold tracking-[0.28em] uppercase on-media">
              {isAm
                ? `የመንግሥት የመንገድና መሠረተ ልማት ተቋራጭ · ${companyStats.contractorGrade}`
                : `Government-owned road & infrastructure contractor · ${companyStats.contractorGrade}`}
            </span>
          </motion.div>

          <motion.h1
            {...reveal(0.25)}
            className="font-display font-bold on-media leading-[1.05] tracking-[-0.02em] text-[2.1rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.5rem]"
          >
            {isAm ? (
              <>መሠረተ ልማትን እንገነባለን።<br /><span className="text-gradient-gold">ማህበረሰቦችን እናገናኛለን።</span></>
            ) : (
              <>Building Infrastructure.<br /><span className="text-gradient-gold">Connecting Communities.</span></>
            )}
          </motion.h1>

          <motion.p {...reveal(0.4)} className="mt-5 max-w-xl text-[15px] md:text-base leading-relaxed font-body on-media-muted">
            {isAm
              ? "ከባሕር ዳር ዋና መሥሪያ ቤቱ ሂቢር ኮንስትራክሽን ኮርፖሬሽን በመላው ኢትዮጵያ መንገዶችን፣ ድልድዮችን፣ ሕንፃዎችንና የከተማ መሠረተ ልማቶችን ይገነባል።"
              : "From its head office in Bahir Dar, Hibir Construction Corporation builds roads, bridges, buildings and urban infrastructure that support Ethiopia's development."}
          </motion.p>

          <motion.div {...reveal(0.55)} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to={path("/projects")} className="btn-accent text-sm w-full sm:w-auto">
              {isAm ? "ፕሮጀክቶቻችንን ይመልከቱ" : "Explore Our Projects"} <ArrowRight size={16} />
            </Link>
            <Link to={path("/about")} className="btn-outline-media text-sm w-full sm:w-auto">
              {isAm ? "ሂቢርን ይወቁ" : "About Hibir"}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
