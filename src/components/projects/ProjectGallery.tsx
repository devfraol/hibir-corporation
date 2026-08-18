import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectImage } from "@/data/projects";

const ProjectGallery = ({ images }: { images: ProjectImage[] }) => {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <motion.button
            key={`${img.url}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-xl border border-border aspect-[4/3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Open image ${i + 1} full screen`}
          >
            <img
              src={img.url}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 media-overlay opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          </motion.button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
          className="fixed inset-0 z-[200] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close image viewer"
            className="absolute top-5 right-5 p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-accent"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 p-3 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-accent"
          >
            <ChevronLeft size={22} />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl w-full">
            <img
              src={images[open].url}
              alt={images[open].alt}
              className="w-full max-h-[78vh] object-contain rounded-lg"
            />
            <figcaption className="mt-4 text-center text-xs font-body tracking-[0.16em] uppercase text-white/60">
              {images[open].caption ?? images[open].alt} · {open + 1} / {images.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 p-3 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-accent"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectGallery;
