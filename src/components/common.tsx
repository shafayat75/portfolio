import { motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { AnimatedText } from "./motion-kit";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
    >
      <div
        className="h-full w-full"
        style={{ backgroundImage: "linear-gradient(90deg, var(--accent), var(--glow))" }}
      />
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-sm text-accent">{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-px flex-1 max-w-24 origin-left"
          style={{ backgroundImage: "linear-gradient(90deg, var(--accent), transparent)" }}
        />
      </div>
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
        <AnimatedText text={title} />
      </h2>
      {subtitle && <p className="muted mt-4 max-w-2xl text-base md:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 px-5 sm:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
