import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic, Tilt } from "./motion-kit";
import { ArrowDown, Mail, MapPin, Sparkles } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { profile } from "../data/profile";
import { useTypewriter } from "../lib/hooks";

export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] flex items-center px-5 sm:px-8 pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <motion.div
        className="glow-orb w-[460px] h-[460px] -top-24 -left-24"
        style={{ background: "var(--accent)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, 60, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-orb w-[380px] h-[380px] top-1/3 -right-24 opacity-30"
        style={{ background: "var(--glow)" }}
        animate={{ x: [0, -40, 20, 0], y: [0, 50, -30, 0], scale: [1, 0.92, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl w-full grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--glow)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--glow)" }} />
            </span>
            {profile.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            Hi, I'm <span className="gradient-text">Shafayat</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="font-display text-xl sm:text-2xl lg:text-3xl mt-4 font-medium"
          >
            <span className="muted">I'm a </span>
            <span className="caret">{typed}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="muted mt-6 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap items-center gap-3 mt-9"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium overflow-hidden"
                style={{ backgroundImage: "linear-gradient(100deg, var(--accent), var(--glow))" }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] ease-out"
                  style={{ backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent)" }}
                />
                <Sparkles size={17} className="relative" />
                <span className="relative">View my work</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl surface font-medium card-hover"
              >
                <Mail size={17} /> Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="flex items-center gap-5 mt-9"
          >
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="muted hover:text-accent transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="muted hover:text-accent transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={profile.socials.email} className="muted hover:text-accent transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
            <span className="h-4 w-px" style={{ background: "var(--border)" }} />
            <span className="muted text-sm inline-flex items-center gap-1.5">
              <MapPin size={14} /> Dhaka, Bangladesh
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: artY }}
          className="relative mx-auto lg:mx-0 w-full max-w-[300px]"
        >
          <Tilt max={11} scale={1.02}>
            <motion.div
              className="absolute -inset-4 rounded-[2rem] blur-2xl"
              style={{ backgroundImage: "linear-gradient(140deg, var(--accent), var(--glow))" }}
              animate={{ opacity: [0.28, 0.5, 0.28] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative rounded-[1.75rem] overflow-hidden surface aspect-[4/5]">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold opacity-10 -z-10">
                SH
              </div>
            </div>
          </Tilt>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -bottom-4 -left-4 surface rounded-xl px-3.5 py-2.5 shadow-xl"
          >
            <p className="font-mono text-[11px] muted">currently</p>
            <p className="text-sm font-medium">BSc CSE @ AIUB</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 muted hover:text-accent transition-colors"
        aria-label="Scroll to about"
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="block">
          <ArrowDown size={22} />
        </motion.span>
      </motion.a>
    </section>
  );
}
