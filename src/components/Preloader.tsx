import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAME = "SHAFAYAT";

export default function Preloader() {
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    try {
      return sessionStorage.getItem("intro") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem("intro", "1");
      } catch {
        /* ignore */
      }
    }, 2050);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "var(--bg)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 grid-bg opacity-60" />

          <div className="relative text-center">
            <div className="flex justify-center overflow-hidden">
              {NAME.split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl sm:text-6xl font-bold tracking-[0.18em] gradient-text"
                >
                  {c}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="muted font-mono text-[11px] sm:text-xs tracking-[0.3em] mt-4 uppercase"
            >
              full stack developer
            </motion.p>

            <div className="mt-8 mx-auto h-px w-52 sm:w-64 overflow-hidden soft rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.4, 0, 0.1, 1] }}
                className="h-full origin-left"
                style={{ backgroundImage: "linear-gradient(90deg, var(--accent), var(--glow))" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
