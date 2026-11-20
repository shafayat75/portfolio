import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Code2, Database, Layout, Server, Wrench } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./common";
import { skills } from "../data/profile";

const icons: Record<string, typeof Code2> = { Layout, Server, Database, Code2, Brain, Wrench };

const marqueeItems = skills.flatMap((g) => g.items.map((i) => i.name));

export default function Skills() {
  const [active, setActive] = useState(0);
  const group = skills[active];

  return (
    <Section id="skills" className="overflow-hidden">
      <SectionHeading
        index="02"
        title="Skills & tools"
        subtitle="The stack I reach for, grouped by where it sits in the application."
      />

      <Reveal>
        <div className="flex flex-wrap gap-2 mb-8">
          {skills.map((g, i) => {
            const Icon = icons[g.icon] ?? Code2;
            const isActive = i === active;
            return (
              <button
                key={g.category}
                onClick={() => setActive(i)}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                style={{
                  color: isActive ? "#fff" : "var(--fg-muted)",
                  border: `1px solid ${isActive ? "transparent" : "var(--border)"}`,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundImage: "linear-gradient(100deg, var(--accent), var(--glow))" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon size={15} /> {g.category}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.div
        key={group.category}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {group.items.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="surface rounded-2xl p-5 card-hover"
          >
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-medium text-sm">{s.name}</span>
              <span className="font-mono text-xs muted">{s.level}%</span>
            </div>
            <div className="h-1.5 rounded-full soft overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ backgroundImage: "linear-gradient(90deg, var(--accent), var(--glow))" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mt-14 -mx-5 sm:-mx-8 overflow-hidden py-4" aria-hidden>
        <div className="flex w-max marquee gap-3">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="chip whitespace-nowrap">{t}</span>
          ))}
        </div>
      </div>
    </Section>
  );
}
