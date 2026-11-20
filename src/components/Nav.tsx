import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, Moon, Sun, X, FileText } from "lucide-react";
import { navLinks, profile } from "../data/profile";
import { useActiveSection, useTheme } from "../lib/hooks";

const ids = navLinks.map((l) => l.href.slice(1));

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
              scrolled ? "surface shadow-lg backdrop-blur-xl" : ""
            }`}
            style={scrolled ? { backgroundColor: "color-mix(in srgb, var(--bg-elev) 80%, transparent)" } : {}}
          >
            <a href="#home" className="font-display font-bold text-lg tracking-tight shrink-0">
              <span className="gradient-text">{"<"}SH{" />"}</span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className="relative px-3.5 py-1.5 text-sm rounded-lg transition-colors"
                    style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg soft"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenPalette}
                className="hidden sm:flex items-center gap-2 text-xs font-mono px-2.5 py-1.5 rounded-lg soft muted hover:text-accent transition-colors"
                aria-label="Open command palette"
              >
                <Command size={13} />K
              </button>
              <button
                onClick={toggle}
                className="p-2 rounded-lg soft hover:text-accent transition-colors"
                aria-label="Toggle theme"
              >
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <a
                href={profile.resumeUrl}
                download
                className="hidden sm:flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 rounded-lg text-white transition-transform hover:scale-[1.03]"
                style={{ backgroundImage: "linear-gradient(100deg, var(--accent), var(--glow))" }}
              >
                <FileText size={15} /> Resume
              </a>
              <button
                onClick={() => setOpen(true)}
                className="md:hidden p-2 rounded-lg soft"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] md:hidden"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg soft" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-8 pt-6">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl font-semibold py-2"
                >
                  <span className="font-mono text-sm text-accent mr-3">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
              <a
                href={profile.resumeUrl}
                download
                className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium"
                style={{ backgroundImage: "linear-gradient(100deg, var(--accent), var(--glow))" }}
              >
                <FileText size={17} /> Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
