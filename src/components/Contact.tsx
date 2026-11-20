import { useState, type FormEvent } from "react";
import { Check, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { Reveal, Section, SectionHeading } from "./common";
import { profile, references } from "../data/profile";

type State = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!profile.formspreeEndpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setState("sending");
    try {
      const res = await fetch(profile.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      setState("sent");
      form.reset();
      setTimeout(() => setState("idle"), 5000);
    } catch {
      setState("error");
    }
  }

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors soft focus:ring-2";

  return (
    <Section id="contact">
      <SectionHeading
        index="05"
        title="Get in touch"
        subtitle="Hiring, collaborating, or just want to talk code — my inbox is open."
      />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14">
        <div className="space-y-4">
          <Reveal>
            <a href={profile.socials.email} className="surface rounded-2xl p-5 flex items-center gap-4 card-hover">
              <span className="p-2.5 rounded-xl soft text-accent"><Mail size={18} /></span>
              <span className="min-w-0">
                <span className="muted text-xs font-mono block">email</span>
                <span className="text-sm font-medium break-all">{profile.email}</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.06}>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="surface rounded-2xl p-5 flex items-center gap-4 card-hover">
              <span className="p-2.5 rounded-xl soft text-accent"><Phone size={18} /></span>
              <span>
                <span className="muted text-xs font-mono block">phone</span>
                <span className="text-sm font-medium">{profile.phone}</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="surface rounded-2xl p-5 flex items-center gap-4">
              <span className="p-2.5 rounded-xl soft text-accent"><MapPin size={18} /></span>
              <span>
                <span className="muted text-xs font-mono block">location</span>
                <span className="text-sm font-medium">{profile.location}</span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex gap-3">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="flex-1 surface rounded-2xl p-4 flex items-center justify-center gap-2 text-sm font-medium card-hover">
                <Github size={17} /> GitHub
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex-1 surface rounded-2xl p-4 flex items-center justify-center gap-2 text-sm font-medium card-hover">
                <Linkedin size={17} /> LinkedIn
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="surface rounded-2xl p-5">
              <h3 className="font-display font-semibold text-sm mb-3">Reference</h3>
              {references.map((r) => (
                <div key={r.name}>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="muted text-xs mt-0.5">{r.role}</p>
                  <a href={`mailto:${r.email}`} className="text-xs text-accent font-mono mt-1 inline-block break-all">
                    {r.email}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="surface rounded-2xl p-6 md:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="muted text-xs font-mono block mb-1.5">your name</label>
                <input id="name" name="name" required placeholder="Jane Doe" className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="muted text-xs font-mono block mb-1.5">your email</label>
                <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="muted text-xs font-mono block mb-1.5">subject</label>
              <input id="subject" name="subject" placeholder="Internship opportunity" className={inputClass} />
            </div>
            <div>
              <label htmlFor="message" className="muted text-xs font-mono block mb-1.5">message</label>
              <textarea id="message" name="message" required rows={6} placeholder="Tell me about the role or project…" className={`${inputClass} resize-none`} />
            </div>

            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-medium transition-transform hover:scale-[1.01] disabled:opacity-60"
              style={{ backgroundImage: "linear-gradient(100deg, var(--accent), var(--glow))" }}
            >
              {state === "sending" ? (
                <><Loader2 size={17} className="animate-spin" /> Sending…</>
              ) : state === "sent" ? (
                <><Check size={17} /> Message sent</>
              ) : (
                <><Send size={17} /> Send message</>
              )}
            </button>

            {state === "error" && (
              <p className="text-sm text-center" style={{ color: "#f06a6a" }}>
                Something went wrong — email me directly at {profile.email}.
              </p>
            )}
            {!profile.formspreeEndpoint && (
              <p className="muted text-xs text-center">
                This form opens your mail app. Connect Formspree in <code className="font-mono">src/data/profile.ts</code> to receive messages directly.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
