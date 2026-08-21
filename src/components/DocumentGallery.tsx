import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";

export interface GalleryDocument {
  id: string;
  title: string;
  documentType: string;
  description: string;
  image?: string;
  meta?: string;
}

interface Props {
  documents: GalleryDocument[];
  /** Label prefix used for placeholder previews, e.g. "Legal Entity Document". */
  placeholderLabel: string;
  columns?: 2 | 3;
}

const Placeholder = ({ index, label }: { index: number; label: string }) => (
  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-border/60 bg-surface flex flex-col items-center justify-center gap-3">
    <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(0deg,currentColor_0_1px,transparent_1px_14px)] text-foreground" aria-hidden />
    <FileText className="text-accent/70" size={30} />
    <span className="relative text-[10px] font-body tracking-[0.24em] uppercase text-muted-foreground text-center px-4">
      {label} {String(index + 1).padStart(2, "0")}
    </span>
    <span className="relative text-[9px] font-body tracking-[0.18em] uppercase text-muted-foreground/60">
      Document preview pending
    </span>
  </div>
);

/** CMS-ready document gallery with lightbox. Replace `image` to swap placeholders for real scans. */
const DocumentGallery = ({ documents, placeholderLabel, columns = 3 }: Props) => {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) =>
      setActive((cur) => (cur === null ? cur : (cur + dir + documents.length) % documents.length)),
    [documents.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const doc = active === null ? null : documents[active];

  return (
    <>
      <div
        className={`grid gap-6 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
      >
        {documents.map((d, i) => (
          <motion.button
            key={d.id}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
            className="text-left rounded-2xl border border-border bg-background p-4 hover:border-accent/50 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group"
          >
            {d.image ? (
              <img
                src={d.image}
                alt={d.title}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover rounded-xl border border-border/60"
              />
            ) : (
              <Placeholder index={i} label={placeholderLabel} />
            )}
            <div className="pt-4">
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-accent">
                {d.documentType}
              </span>
              <h3 className="font-display font-semibold text-base text-foreground mt-1.5 leading-snug">
                {d.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body mt-2 leading-relaxed line-clamp-2">
                {d.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-body font-semibold text-foreground group-hover:text-accent transition-colors">
                View Document <ChevronRight size={14} />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {doc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-background/95 backdrop-blur-xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={doc.title}
            onClick={close}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="min-w-0">
                <p className="text-[10px] font-body tracking-[0.2em] uppercase text-accent">
                  {doc.documentType}
                </p>
                <h3 className="font-display font-semibold text-foreground truncate">{doc.title}</h3>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close document viewer"
                className="w-10 h-10 rounded-xl grid place-items-center border border-border text-foreground shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="flex-1 flex items-center justify-center gap-4 p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous document"
                className="hidden sm:grid w-11 h-11 rounded-full border border-border place-items-center text-foreground hover:border-accent"
              >
                <ChevronLeft size={18} />
              </button>

              <motion.div
                key={doc.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
              >
                {doc.image ? (
                  <img src={doc.image} alt={doc.title} className="w-full rounded-xl border border-border" />
                ) : (
                  <Placeholder index={active as number} label={placeholderLabel} />
                )}
                <p className="text-sm text-muted-foreground font-body mt-5 leading-relaxed">
                  {doc.description}
                </p>
                {doc.meta && (
                  <p className="text-xs text-muted-foreground/70 font-body mt-2">{doc.meta}</p>
                )}
              </motion.div>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next document"
                className="hidden sm:grid w-11 h-11 rounded-full border border-border place-items-center text-foreground hover:border-accent"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="sm:hidden flex items-center justify-center gap-6 pb-6" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => step(-1)} aria-label="Previous document" className="w-11 h-11 rounded-full border border-border grid place-items-center text-foreground">
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-body text-muted-foreground">
                {(active as number) + 1} / {documents.length}
              </span>
              <button type="button" onClick={() => step(1)} aria-label="Next document" className="w-11 h-11 rounded-full border border-border grid place-items-center text-foreground">
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DocumentGallery;
