import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
  decimals?: number;
}

const Counter = ({ end, suffix = "", label, duration = 2, decimals = 0 }: Props) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * Math.pow(10, decimals)) / Math.pow(10, decimals));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration, decimals]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold">
        {decimals > 0 ? count.toFixed(decimals) : count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground font-body mt-2 tracking-wide">{label}</div>
    </motion.div>
  );
};

export default Counter;
