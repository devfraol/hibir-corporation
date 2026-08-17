import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  /** Adds a restrained 3D tilt on entry for cinematic depth. */
  depth?: boolean;
}

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 42 },
  left: { x: -42 },
  right: { x: 42 },
  scale: { scale: 0.94 },
};

const ScrollReveal = ({ children, className = "", delay = 0, direction = "up", depth = false }: Props) => {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction], rotateX: depth ? 8 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={depth ? { perspective: 1200, transformStyle: "preserve-3d" } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
