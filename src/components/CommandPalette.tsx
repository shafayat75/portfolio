import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, FileText, Mail, Moon, Search, Sun, Hash, FolderGit2 } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { navLinks, profile, projects } from "../data/profile";
import { useTheme } from "../lib/hooks";

type Item = {
  id: string;
  label: string;
  hint: string;
  icon: (props: { size?: number; className?: string }) => React.ReactNode;
  run: () => void;
};

export default function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const { dark, toggle } = useTheme();

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => {
      setOpen(false);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };
    const openUrl = (url: string) => () => {
      setOpen(false);
      window.open(url, "_blank", "noopener");
    };

    return [
      ...navLinks.map((l) => ({
        id: `nav-${l.href}`,
        label: `Go to ${l.label}`,
        hint: "Section",
        icon: Hash,
        run: go(l.href),
      })),
      ...projects.map((p) => ({
        id: `proj-${p.slug}`,
        label: p.title,
        hint: p.subtitle,
        icon: FolderGit2,
        run: go("#projects"),
      })),
      {
        id: "theme",
        label: dark ? "Switch to light mode" : "Switch to dark mode",
        hint: "Appearance",
        icon: dark ? Sun : Moon,
        run: () => {
          toggle();
          setOpen(false);
        },
      },
      {
        id: "resume",
        label: "Download resume (PDF)",
        hint: "File",
        icon: FileText,
        run: () => {
          setOpen(false);
          window.open(profile.resumeUrl, "_blank");
        },
      },
      { id: "gh", label: "Open GitHub profile", hint: "External", icon: Github, run: openUrl(profile.socials.github) },
      { id: "li", label: "Open LinkedIn profile", hint: "External", icon: Linkedin, run: openUrl(profile.socials.linkedin) },
      { id: "mail", label: `Email ${profile.email}`, hint: "External", icon: Mail, run: openUrl(profile.socials.email) },
    ];
  }, [dark, setOpen, toggle]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => (i.label + i.hint).toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => setCursor(0), [query, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c + 1) % Math.max(filtered.length, 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (c - 1 + filtered.length) % Math.max(filtered.length, 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[cursor]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, cursor, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[12vh] px-4 backdrop-blur-sm"
          style={{ backgroundColor: "color-mix(in srgb, #000 50%, transparent)" }}
        >
          <motion.div
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="surface w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b" style={{ borderColor: "var(--border)" }}>
              <Search size={17} className="muted shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, project or link…"
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <kbd className="chip">ESC</kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="muted text-sm text-center py-8">No matches.</p>
              )}
              {filtered.map((item, i) => {
                const Icon = item.icon;
                const activeRow = i === cursor;
                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setCursor(i)}
                    onClick={item.run}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                    style={{ backgroundColor: activeRow ? "var(--bg-soft)" : "transparent" }}
                  >
                    <Icon size={16} className={activeRow ? "text-accent" : "muted"} />
                    <span className="flex-1 min-w-0">
                      <span className="text-sm block truncate">{item.label}</span>
                      <span className="muted text-xs block truncate">{item.hint}</span>
                    </span>
                    {activeRow && <CornerDownLeft size={14} className="muted" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 px-4 py-2.5 border-t muted text-[11px] font-mono" style={{ borderColor: "var(--border)" }}>
              <span>↑↓ navigate</span>
              <span>⏎ select</span>
              <span className="ml-auto">⌘K / Ctrl K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
