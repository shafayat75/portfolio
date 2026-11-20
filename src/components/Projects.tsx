import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Server, X } from "lucide-react";
import { Github } from "./BrandIcons";
import { Reveal, Section, SectionHeading } from "./common";
import { projects, type Project } from "../data/profile";

const filters = ["All", "Full Stack", "Frontend", "Team Project"] as const;

function hasLink(url?: string) {
  return !!url && url !== "#";
}

function StatusDot({ status }: { status: Project["status"] }) {
  const color =
    status === "Live" ? "var(--glow)" : status === "In progress" ? "#f0b429" : "var(--fg-muted)";
  return (
    <span className="chip" style={{ color }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}

function ProjectCard({ p, onOpen, index }: { p: Project; onOpen: () => void; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), spring);
  const sheen = useTransform(
    [useSpring(mx, spring), useSpring(my, spring)],
    ([x, y]: number[]) =>
      `radial-gradient(360px circle at ${x * 100}% ${y * 100}%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 60%)`
  );

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative surface rounded-2xl overflow-hidden card-hover flex flex-col group"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: sheen }}
      />
      <button onClick={onOpen} className="text-left flex-1 flex flex-col">
        <div className="relative h-40 overflow-hidden soft flex items-center justify-center">
          {p.image ? (
            <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <>
              <div className="absolute inset-0 grid-bg opacity-60" />
              <span
                className="relative font-display text-4xl font-bold opacity-80 gradient-text"
              >
                {p.title.slice(0, 2).toUpperCase()}
              </span>
            </>
          )}
          <div className="absolute top-3 right-3">
            <StatusDot status={p.status} />
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-semibold leading-tight">{p.title}</h3>
              <p className="muted text-xs mt-0.5">{p.subtitle}</p>
            </div>
            <ArrowUpRight size={18} className="muted shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="muted text-sm mt-3 leading-relaxed line-clamp-3 flex-1">{p.blurb}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {p.tags.slice(0, 4).map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
            {p.tags.length > 4 && <span className="chip">+{p.tags.length - 4}</span>}
          </div>
        </div>
      </button>

      <div className="flex gap-2 px-5 pb-5">
        {hasLink(p.live) && (
          <a href={p.live} target="_blank" rel="noreferrer" className="chip hover:text-accent transition-colors">
            <ExternalLink size={12} /> Live
          </a>
        )}
        {hasLink(p.repo) && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="chip hover:text-accent transition-colors">
            <Github size={12} /> Code
          </a>
        )}
        {hasLink(p.repoClient) && (
          <a href={p.repoClient} target="_blank" rel="noreferrer" className="chip hover:text-accent transition-colors">
            <Github size={12} /> Client
          </a>
        )}
        {hasLink(p.repoServer) && (
          <a href={p.repoServer} target="_blank" rel="noreferrer" className="chip hover:text-accent transition-colors">
            <Server size={12} /> Server
          </a>
        )}
      </div>
    </motion.article>
  );
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6 backdrop-blur-sm"
      style={{ backgroundColor: "color-mix(in srgb, #000 55%, transparent)" }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="surface w-full max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[88vh] overflow-y-auto"
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 p-6 pb-4 backdrop-blur-xl" style={{ backgroundColor: "color-mix(in srgb, var(--bg-elev) 88%, transparent)" }}>
          <div>
            <StatusDot status={p.status} />
            <h3 className="font-display text-2xl font-bold mt-2">{p.title}</h3>
            <p className="muted text-sm">{p.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg soft shrink-0" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {p.details.map((d, i) => (
            <p key={i} className="muted text-sm leading-relaxed">{d}</p>
          ))}

          <div>
            <h4 className="font-display font-semibold text-sm mb-2.5">Highlights</h4>
            <ul className="space-y-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm muted">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--glow)" }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-2.5">Built with</h4>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {hasLink(p.live) && (
              <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium" style={{ backgroundImage: "linear-gradient(100deg, var(--accent), var(--glow))" }}>
                <ExternalLink size={15} /> Live demo
              </a>
            )}
            {hasLink(p.repo) && (
              <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl soft text-sm font-medium">
                <Github size={15} /> Repository
              </a>
            )}
            {hasLink(p.repoClient) && (
              <a href={p.repoClient} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl soft text-sm font-medium">
                <Github size={15} /> Client repo
              </a>
            )}
            {hasLink(p.repoServer) && (
              <a href={p.repoServer} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl soft text-sm font-medium">
                <Server size={15} /> Server repo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        title="Selected projects"
        subtitle="Things I've built end to end — click any card for the full story."
      />

      <Reveal>
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => {
            const isActive = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative px-4 py-1.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  color: isActive ? "#fff" : "var(--fg-muted)",
                  border: `1px solid ${isActive ? "transparent" : "var(--border)"}`,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundImage: "linear-gradient(100deg, var(--accent), var(--glow))" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  );
}
