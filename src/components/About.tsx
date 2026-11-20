import { GraduationCap, Languages as LangIcon, Star } from "lucide-react";
import { Github } from "./BrandIcons";
import { Reveal, Section, SectionHeading } from "./common";
import { interests, languages, profile, softSkills, stats } from "../data/profile";
import { useCountUp, useGithubStats } from "../lib/hooks";

function Stat({ value, label, suffix, decimals = 0 }: { value: number; label: string; suffix?: string; decimals?: number }) {
  const { ref, display } = useCountUp(value, decimals);
  return (
    <div className="surface rounded-2xl p-5 text-center card-hover">
      <p className="font-display text-3xl md:text-4xl font-bold gradient-text">
        <span ref={ref}>{display}</span>
        {suffix}
      </p>
      <p className="muted text-xs mt-1.5 font-mono">{label}</p>
    </div>
  );
}

export default function About() {
  const gh = useGithubStats(profile.githubUsername);

  return (
    <Section id="about">
      <SectionHeading
        index="01"
        title="About me"
        subtitle="A short version of who I am and what I've been building."
      />

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14">
        <div className="space-y-5">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="muted leading-relaxed text-base md:text-[17px]">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="pt-4">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <Star size={16} className="text-accent" /> How I work
              </h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          {gh && (
            <Reveal delay={0.1}>
              <div className="surface rounded-2xl p-5 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold flex items-center gap-2">
                    <Github size={17} /> GitHub
                  </h3>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-accent"
                  >
                    @{profile.githubUsername}
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="soft rounded-xl p-3">
                    <p className="font-display text-2xl font-bold">{gh.publicRepos}</p>
                    <p className="muted text-xs font-mono">public repos</p>
                  </div>
                  <div className="soft rounded-xl p-3">
                    <p className="font-display text-2xl font-bold">{gh.followers}</p>
                    <p className="muted text-xs font-mono">followers</p>
                  </div>
                </div>
                {gh.topLanguages.length > 0 && (
                  <>
                    <p className="muted text-xs font-mono mb-2">most used languages</p>
                    <div className="flex flex-wrap gap-1.5">
                      {gh.topLanguages.map((l) => (
                        <span key={l} className="chip">{l}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.16}>
            <div className="surface rounded-2xl p-5 card-hover">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <GraduationCap size={17} className="text-accent" /> Education
              </h3>
              <p className="font-medium text-sm">BSc in Computer Science & Engineering</p>
              <p className="muted text-sm mt-0.5">AIUB, Dhaka · Jan 2023 – Present</p>
              <p className="font-mono text-xs mt-2 text-accent">CGPA 3.20</p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="surface rounded-2xl p-5 card-hover">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <LangIcon size={17} className="text-accent" /> Languages
              </h3>
              <ul className="space-y-2">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{l.name}</span>
                    <span className="muted text-xs text-right">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="surface rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-3">Outside the editor</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span key={i} className="chip">{i}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
