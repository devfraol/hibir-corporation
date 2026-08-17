import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative w-10 h-10 rounded-xl grid place-items-center border border-border/70 bg-surface/60 backdrop-blur-md transition-colors duration-300 hover:border-accent/50 ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "var(--glow-gold)" }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="text-accent"
          >
            <Moon size={17} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="text-accent"
          >
            <Sun size={17} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
