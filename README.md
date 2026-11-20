# Md. Shafayat Hossain — Developer Portfolio

A production-ready personal portfolio built with **React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion**.

---

## What's inside

| Feature | Where |
|---|---|
| Animated hero with role typewriter | `src/components/Hero.tsx` |
| Dark / light theme (saved to localStorage, no flash) | `src/lib/hooks.ts` + `index.html` |
| **⌘K / Ctrl+K command palette** (jump to sections, projects, links) | `src/components/CommandPalette.tsx` |
| Scroll progress bar + active-section nav highlight | `src/components/common.tsx`, `Nav.tsx` |
| Animated count-up stats | `src/components/About.tsx` |
| **Live GitHub stats** pulled from the GitHub API | `useGithubStats` in `src/lib/hooks.ts` |
| Filterable skills with animated proficiency bars | `src/components/Skills.tsx` |
| Filterable projects + full-detail modal per project | `src/components/Projects.tsx` |
| Vertical journey timeline | `src/components/Journey.tsx` |
| Working contact form (Formspree or mailto fallback) | `src/components/Contact.tsx` |
| Resume download button | nav + mobile menu |
| SEO: meta tags, Open Graph, JSON-LD Person schema | `index.html` |
| Accessibility: reduced-motion support, aria labels, keyboard nav | throughout |

---

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

---

## Make it yours — 5 steps

### 1. Edit your content
**Everything lives in one file: `src/data/profile.ts`.** No other file needs touching.
Name, roles, about paragraphs, skills, projects, timeline, certifications, contact details.

### 2. Add your photo
Drop your photo in `public/avatar.jpg`. (If it's missing the hero shows a clean fallback.)

### 3. Add your resume
`public/Shafayat_Hossain_CV.pdf` is already there. Replace it when you update the CV.

### 4. Fill in the real project links ⚠️ important
In `src/data/profile.ts`, every `"#"` is a placeholder. Replace with your real URLs:

```ts
live: "https://scholarstream.netlify.app",
repoClient: "https://github.com/shafayat75/scholarstream-client",
repoServer: "https://github.com/shafayat75/scholarstream-server",
```
Any link left as `"#"` is hidden automatically — so no broken buttons in an interview.

### 5. Make the contact form actually deliver
1. Go to [formspree.io](https://formspree.io) → free account → **New Form**
2. Copy the endpoint (`https://formspree.io/f/xxxxxxx`)
3. Paste it into `formspreeEndpoint` in `src/data/profile.ts`

Leave it empty and the form falls back to opening the visitor's mail app — still works, just less smooth.

---

## Deploy

### Option A — Vercel (recommended for an interview portfolio)
Gives you HTTPS, a custom domain, automatic redeploys on every `git push`.

**Via dashboard (easiest):**
1. Push this folder to a GitHub repo
2. [vercel.com](https://vercel.com) → **Add New → Project** → import that repo
3. Vercel auto-detects Vite. Framework: *Vite*, Build: `npm run build`, Output: `dist`
4. **Deploy** → live at `your-project.vercel.app`

**Via CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B — Surge (fastest, matches the sample link)
```bash
npm i -g surge
npm run build
cd dist
surge . shafayat-portfolio.surge.sh
```
Or use the shortcut script: `npm run deploy:surge`

> Surge serves static files only — that's fine, this site is fully static.
> For a single-page app, Surge needs `dist/200.html`; the deploy script creates it for you.

### Custom domain
Both support it. Buy a domain (`shafayat.dev`, `shafayathossain.com`) and point it in the dashboard — a `.com` on your CV reads far better than `.vercel.app`.

---

## Before the interview — checklist

- [ ] All `"#"` project links replaced with real URLs
- [ ] `public/avatar.jpg` added
- [ ] Resume PDF up to date
- [ ] Formspree connected and tested with a real message
- [ ] Opened the live site on your phone (recruiters check on mobile)
- [ ] Tested both dark and light mode
- [ ] Lighthouse run in Chrome DevTools (aim 90+ on all four)
- [ ] Portfolio URL added to your CV, GitHub bio and LinkedIn

---

## Project structure

```
src/
├── data/profile.ts        ← ALL your content
├── lib/hooks.ts           ← theme, typewriter, count-up, GitHub API
├── components/
│   ├── common.tsx         ← Reveal, Section, SectionHeading, ScrollProgress
│   ├── Nav.tsx  Hero.tsx  About.tsx  Skills.tsx
│   ├── Projects.tsx  Journey.tsx  Contact.tsx  Footer.tsx
│   ├── CommandPalette.tsx  BrandIcons.tsx
├── index.css              ← theme tokens & utilities
└── App.tsx
```
