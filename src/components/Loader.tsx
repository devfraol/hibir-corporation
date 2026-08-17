import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Very short architectural intro — shown once per browser session. */
const Loader = () => {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("hibir-intro") !== "seen";
  });

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem("hibir-intro", "seen");
    const t = setTimeout(() => setVisible(false), reduced ? 250 : 1250);
    return () => clearTimeout(t);
  }, [visible, reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-background grid place-items-center"
          aria-hidden
        >
          <div className="absolute inset-0 blueprint-grid opacity-40" />
          <div className="relative text-center px-6">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.28em" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="font-display font-bold text-3xl md:text-5xl text-foreground uppercase"
            >
              Hibir
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-px my-4 origin-left"
              style={{ backgroundImage: "var(--gold-gradient)" }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-[10px] md:text-xs font-body tracking-[0.4em] uppercase text-muted-foreground"
            >
              Construction Corporation
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
