import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImage from "@/assets/hero-highway.jpg";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Unframed editorial hero. The existing illustrative image is a fallback,
 * not a verified photograph of a named Hibir project.
 */
const Hero = () => {
  const { t, path } = useI18n();
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease },
  });

  return (
    <section
      aria-labelledby="homepage-hero-title"
      className="homepage-editorial-hero relative isolate overflow-hidden bg-background"
    >
      <img
        src={heroImage}
        alt={t("hero.imageAlt")}
        width={1366}
        height={768}
        fetchPriority="high"
        loading="eager"
        className="homepage-editorial-photo absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="homepage-editorial-shade absolute inset-0 -z-10" aria-hidden />

      <div className="homepage-editorial-content container-custom relative w-full px-5 md:px-8">
        <div className="max-w-[620px]">
          <motion.p {...reveal(0)} className="mb-5 font-body text-[10px] font-semibold leading-relaxed on-media-muted sm:text-xs">
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1
            id="homepage-hero-title"
            {...reveal(0.08)}
            className="font-display text-[2rem] font-semibold leading-[1.12] on-media sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            <span className="block">{t("hero.headlineFirst")}</span>
            <span className="block">{t("hero.headlineSecond")}</span>
          </motion.h1>

          <motion.p {...reveal(0.16)} className="mt-6 max-w-[450px] font-body text-[15px] leading-[1.8] on-media-muted md:text-base">
            {t("hero.description")}
          </motion.p>

          <motion.div {...reveal(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 w-full bg-accent font-semibold text-accent-foreground hover:bg-accent/90 sm:w-auto">
              <Link to={path("/projects")}>{t("hero.projects")} <ArrowRight aria-hidden /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="homepage-editorial-secondary h-12 w-full font-semibold sm:w-auto">
              <Link to={path("/about")}>{t("hero.about")}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
