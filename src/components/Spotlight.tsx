import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft glow that trails the cursor, plus a small ring that grows
 * over interactive elements. Desktop only — hidden on touch devices
 * and when the visitor prefers reduced motion.
 */
export default function Spotlight() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glowX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });
  const ringX = useSpring(x, { stiffness: 450, damping: 32 });
  const ringY = useSpring(y, { stiffness: 450, damping: 32 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHot(!!el?.closest("a, button, [role='button'], input, textarea"));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none fixed top-0 left-0 z-[5] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 62%)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{ scale: hot ? 2.1 : 1, opacity: hot ? 0.5 : 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="h-3.5 w-3.5 rounded-full border-2"
          style={{ borderColor: "#fff" }}
        />
      </motion.div>
    </>
  );
}
