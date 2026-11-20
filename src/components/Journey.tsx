import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, HeartHandshake, Maximize2, X } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./common";
import { certifications, timeline, type Certification } from "../data/profile";

const typeIcon = {
  education: GraduationCap,
  experience: Briefcase,
  volunteer: HeartHandshake,
};

function Lightbox({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8 backdrop-blur-sm"
      style={{ backgroundColor: "color-mix(in srgb, #000 70%, transparent)" }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full"
      >
        <img src={cert.image} alt={`${cert.title} certificate`} className="w-full rounded-2xl shadow-2xl" />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 p-2.5 rounded-full surface shadow-xl"
          aria-label="Close certificate"
        >
          <X size={18} />
        </button>
        <p className="text-center text-white/80 text-sm mt-4">
          {cert.title} — {cert.issuer}
          {cert.credentialId && <span className="font-mono"> · {cert.credentialId}</span>}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Journey() {
  const [zoom, setZoom] = useState<Certification | null>(null);

  return (
    <Section id="journey">
      <SectionHeading
        index="04"
        title="Journey"
        subtitle="Education, community work and certifications so far."
      />

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14">
        <div className="relative pl-7">
          <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "var(--border)" }} />
          {timeline.map((t, i) => {
            const Icon = typeIcon[t.type];
            return (
              <Reveal key={t.title + t.period} delay={i * 0.08}>
                <div className="relative pb-9">
                  <span
                    className="absolute -left-7 top-1.5 h-[15px] w-[15px] rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: "var(--accent)", background: "var(--bg)" }}
                  />
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <span className="chip" style={{ color: "var(--accent)" }}>
                      <Icon size={12} /> {t.period}
                    </span>
                    {t.meta && <span className="chip">{t.meta}</span>}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                  <p className="text-sm text-accent mt-0.5">{t.org}</p>
                  <p className="muted text-sm mt-2 leading-relaxed">{t.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="space-y-4">
          <Reveal>
            <div className="surface rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Award size={17} className="text-accent" /> Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((c) => (
                  <li key={c.title}>
                    {c.image ? (
                      <button
                        onClick={() => setZoom(c)}
                        className="group w-full text-left soft rounded-xl overflow-hidden transition-colors hover:ring-1"
                        style={{ outlineColor: "var(--accent)" }}
                      >
                        <div className="relative h-28 overflow-hidden">
                          <img
                            src={c.image}
                            alt={c.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: "color-mix(in srgb, #000 45%, transparent)" }}
                          >
                            <span className="chip" style={{ color: "#fff", borderColor: "#fff6" }}>
                              <Maximize2 size={12} /> View certificate
                            </span>
                          </div>
                        </div>
                        <div className="p-3.5">
                          <p className="font-medium text-sm">{c.title}</p>
                          <p className="muted text-xs mt-0.5">{c.issuer}</p>
                          {c.note && <p className="muted text-xs mt-0.5">{c.note}</p>}
                          {c.credentialId && (
                            <p className="font-mono text-[11px] text-accent mt-1.5">ID {c.credentialId}</p>
                          )}
                        </div>
                      </button>
                    ) : (
                      <div className="soft rounded-xl p-3.5">
                        <p className="font-medium text-sm">{c.title}</p>
                        <p className="muted text-xs mt-0.5">{c.issuer}</p>
                        {c.note && <p className="muted text-xs mt-0.5">{c.note}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ backgroundImage: "linear-gradient(140deg, var(--accent), var(--glow))" }}
            >
              <div className="relative text-white">
                <h3 className="font-display font-semibold text-lg">Looking for my first role</h3>
                <p className="text-sm opacity-90 mt-2 leading-relaxed">
                  Open to internships, junior full stack positions and graduate programs. I learn
                  fast, ship consistently, and I'd rather ask a good question than guess.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-white text-sm font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  Let's talk
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {zoom && <Lightbox cert={zoom} onClose={() => setZoom(null)} />}
      </AnimatePresence>
    </Section>
  );
}
