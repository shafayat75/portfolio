import { ArrowUp, Heart, Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { navLinks, profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="relative px-5 sm:px-8 py-10 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <a href="#home" className="font-display font-bold text-lg gradient-text">{"<"}SH{" />"}</a>
          <p className="muted text-xs mt-1.5">
            © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind & Framer Motion.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="muted text-sm hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="muted hover:text-accent transition-colors" aria-label="GitHub"><Github size={18} /></a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="muted hover:text-accent transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href={profile.socials.email} className="muted hover:text-accent transition-colors" aria-label="Email"><Mail size={18} /></a>
          <a href="#home" className="p-2 rounded-lg soft hover:text-accent transition-colors" aria-label="Back to top"><ArrowUp size={16} /></a>
        </div>
      </div>
      <p className="muted text-[11px] text-center mt-7 flex items-center justify-center gap-1.5">
        Made with <Heart size={11} className="text-accent" fill="currentColor" /> in Dhaka
      </p>
    </footer>
  );
}
