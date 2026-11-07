import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImage from "@/assets/hero-highway.jpg";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * ACS-inspired editorial hero: full-width project imagery, lightweight
 * headline with accent-highlighted words, and a floating information
 * panel anchored to the lower-left. Single polished slide — no
 * fabricated carousel content. The image is illustrative, not a
 * verified photograph of a named Hibir project.
 */
const Hero = () => {
  const { t, path } = useI18n();
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease },
  });

  return (
    <section
      aria-labelledby="homepage-hero-title"
      className="homepage-editorial-hero relative isolate overflow-hidden bg-background"
    >
      <img
        src={heroImage}
        alt={t("hero.imageAlt")}
        width={1920}
        height={1080}
        fetchPriority="high"
        loading="eager"
        className="homepage-editorial-photo absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="homepage-editorial-shade absolute inset-0 -z-10" aria-hidden />

      <div className="homepage-editorial-content container-custom relative flex w-full flex-col px-5 md:px-8">
        <div className="max-w-[720px]">
          <motion.p {...reveal(0)} className="mb-5 font-body text-[10px] font-semibold leading-relaxed tracking-[0.22em] on-media-muted sm:text-xs">
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1
            id="homepage-hero-title"
            {...reveal(0.08)}
            className="font-display text-[2.4rem] font-light leading-[1.08] on-media sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.4rem]"
          >
            <span className="block">
              {t("hero.headlineFirstLead")} <span className="text-accent">{t("hero.headlineFirstAccent")}</span>
            </span>
            <span className="block">
              {t("hero.headlineSecondLead")} <span className="text-accent">{t("hero.headlineSecondAccent")}</span>
            </span>
          </motion.h1>

          <motion.p {...reveal(0.16)} className="mt-6 max-w-[480px] font-body text-[15px] leading-[1.8] on-media-muted md:text-base">
            {t("hero.description")}
          </motion.p>

          <motion.div {...reveal(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 w-full bg-accent font-semibold text-accent-foreground hover:bg-accent/90 sm:w-auto">
              <Link to={path("/projects")}>{t("hero.projects")} <ArrowRight aria-hidden /></Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-12 w-full border border-[hsl(var(--on-media)/0.5)] bg-transparent font-semibold text-[hsl(var(--on-media))] hover:border-[hsl(var(--on-media))] hover:bg-[hsl(var(--on-media)/0.12)] hover:text-[hsl(var(--on-media))] sm:w-auto">
              <Link to={path("/about")}>{t("hero.about")}</Link>
            </Button>
          </motion.div>
        </div>

        {/* Floating information panel, lower-left */}
        <motion.aside
          {...reveal(0.36)}
          className="homepage-editorial-panel mt-14 w-full max-w-[440px] p-6 md:mt-20 md:p-8"
        >
          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
            {t("hero.panelLabel")}
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed on-media-muted">
            {t("hero.panelText")}
          </p>
          <Link
            to={path("/about")}
            className="mt-5 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--on-media))] transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {t("hero.panelLink")} <ArrowRight size={14} aria-hidden />
          </Link>
        </motion.aside>
      </div>
    </section>
  );
};

export default Hero;
