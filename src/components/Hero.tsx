import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImage from "@/assets/hero-highway.jpg";
import constructionImage from "@/assets/hero-construction.jpg";
import bridgeImage from "@/assets/bridge-construction.jpg";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { useHeroSlideshow } from "./useHeroSlideshow";

const ease = [0.22, 1, 0.36, 1] as const;

// Existing illustrative imagery; no slide claims a named Hibir project.
const slides = [heroImage, constructionImage, bridgeImage];

const Hero = () => {
  const { t, path } = useI18n();
  const reduced = useReducedMotion();
  const { active, navigate, setHovered, setFocused } = useHeroSlideshow(slides.length, !!reduced);

  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease },
  });

  return (
    <section
      aria-labelledby="homepage-hero-title"
      className="homepage-editorial-hero relative isolate overflow-hidden bg-background"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {slides.map((src, index) => <motion.img
        key={src}
        src={src}
        alt={t("hero.imageAlt")}
        aria-hidden={index !== active}
        width={1920}
        height={1080}
        fetchPriority={index === 0 ? "high" : "auto"}
        loading="eager"
        initial={false}
        animate={{ opacity: index === active ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.8, ease: "easeInOut" }}
        className="homepage-editorial-photo absolute inset-0 -z-20 h-full w-full object-cover"
      />)}

      {/* Subtle navy overlay: above the photos, below all text and navigation */}
      <div aria-hidden className="homepage-editorial-overlay pointer-events-none absolute inset-0 -z-10" />

      <div className="homepage-editorial-content container-custom relative flex w-full flex-col px-5 md:px-8">
        <div className="homepage-editorial-headline w-full max-w-[1120px]">
          <motion.p {...reveal(0)} className="mb-5 font-body text-[10px] font-semibold leading-relaxed tracking-[0.22em] on-media-muted sm:text-xs">
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1
            key={active}
            id="homepage-hero-title"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease }}
            className="homepage-editorial-title font-display font-normal on-media"
          >
            <span className="block">{t("hero.headlineFirstLead")}</span>
            <span className="block text-accent">{t("hero.headlineFirstAccent")}</span>
            <span className="block">
              {t("hero.headlineSecondLead")} <span className="text-accent">{t("hero.headlineSecondAccent")}</span>
            </span>
          </motion.h1>

        </div>

        {/* Floating information panel, lower-left */}
        <motion.aside
          {...reveal(0.36)}
          className="homepage-editorial-panel mt-12 w-full max-w-[440px] p-6 md:mt-14 md:p-8"
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
            {t("hero.panelLink")}
          </Link>
          {slides.length > 1 && <div className="mt-4 flex gap-3">
            <Button type="button" variant="ghost" size="icon" aria-label={t("hero.previousSlide")} title={t("hero.previousSlide")} onClick={() => navigate(-1)} className="homepage-editorial-control h-11 w-11 rounded-none">
              <ArrowLeft size={20} aria-hidden />
            </Button>
            <Button type="button" variant="ghost" size="icon" aria-label={t("hero.nextSlide")} title={t("hero.nextSlide")} onClick={() => navigate(1)} className="homepage-editorial-control h-11 w-11 rounded-none">
              <ArrowRight size={20} aria-hidden />
            </Button>
          </div>}
        </motion.aside>
      </div>
    </section>
  );
};

export default Hero;
