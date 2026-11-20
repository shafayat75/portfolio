/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE.  No other file needs to change.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Md. Shafayat Hossain",
  shortName: "Shafayat",
  roles: [
    "MERN Full Stack Developer",
    "React & Next.js Engineer",
    "CSE Undergraduate @ AIUB",
    "Data Science & ML Learner",
  ],
  tagline:
    "I build practical, user-focused web applications — from database schema to the last pixel.",
  about: [
    "I'm a Computer Science and Engineering undergraduate at American International University–Bangladesh (AIUB) and a MERN full stack developer with working knowledge of data science and machine learning.",
    "Across academic and personal projects I've built full-stack web applications, designed relational and document databases, and shipped features in teams using Git and GitHub. I care about clean architecture, role-based access that actually works, and interfaces people don't have to think about.",
    "Right now I'm looking for my first professional role — an internship or junior full stack position where I can keep learning fast and contribute real features.",
  ],
  location: "Kuril, Khilkhet, Dhaka, Bangladesh",
  email: "shafayathossainpranto2025@gmail.com",
  phone: "+880 1866 448039",
  availability: "Open to internships & junior roles",
  resumeUrl: "./Shafayat_Hossain_CV.pdf", // put your PDF in /public
  avatar: "./avatar.jpg",                  // put your photo in /public
  socials: {
    github: "https://github.com/shafayat75",
    linkedin: "https://linkedin.com/in/shafayat-hossain-pranto",
    email: "mailto:shafayathossainpranto2025@gmail.com",
  },
  githubUsername: "shafayat75",
  /** Formspree endpoint — see README step 5. Leave "" to fall back to mailto. */
  formspreeEndpoint: "",
};

export const stats = [
  { label: "Projects built", value: 5, suffix: "+" },
  { label: "Technologies used", value: 20, suffix: "+" },
  { label: "Years coding", value: 3, suffix: "+" },
  { label: "CGPA", value: 3.2, suffix: "/4", decimals: 1 },
];

export type SkillGroup = {
  category: string;
  icon: string;
  items: { name: string; level: number }[];
};

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    icon: "Layout",
    items: [
      { name: "React.js", level: 88 },
      { name: "Next.js", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5 / CSS3", level: 92 },
      { name: "JavaScript (ES6+)", level: 88 },
    ],
  },
  {
    category: "Backend",
    icon: "Server",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "NestJS", level: 72 },
      { name: "REST APIs", level: 86 },
      { name: "Auth & RBAC", level: 80 },
      { name: "PHP", level: 65 },
    ],
  },
  {
    category: "Database & Cloud",
    icon: "Database",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 78 },
      { name: "Prisma ORM", level: 75 },
      { name: "SQL", level: 80 },
      { name: "Firebase", level: 78 },
    ],
  },
  {
    category: "Languages & CS",
    icon: "Code2",
    items: [
      { name: "C++", level: 82 },
      { name: "Java", level: 75 },
      { name: "Python", level: 78 },
      { name: "C#", level: 65 },
      { name: "Data Structures & Algorithms", level: 78 },
    ],
  },
  {
    category: "Data Science & ML",
    icon: "Brain",
    items: [
      { name: "Pandas", level: 72 },
      { name: "NumPy", level: 72 },
      { name: "scikit-learn", level: 65 },
    ],
  },
  {
    category: "Tools & Design",
    icon: "Wrench",
    items: [
      { name: "Git & GitHub", level: 88 },
      { name: "VS Code", level: 92 },
      { name: "Figma", level: 72 },
      { name: "Netlify / Vercel", level: 80 },
      { name: "Wireframing & Prototyping", level: 70 },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  blurb: string;
  details: string[];
  highlights: string[];
  tags: string[];
  category: "Full Stack" | "Frontend" | "Team Project";
  status: "Live" | "In progress" | "Completed";
  featured?: boolean;
  live?: string;
  repo?: string;
  repoClient?: string;
  repoServer?: string;
  /** optional screenshot in /public, e.g. "./projects/scholarstream.png" */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "scholarstream",
    title: "ScholarStream",
    subtitle: "Scholarship Management Platform",
    blurb:
      "A full-stack platform where graduate students find, apply for and track scholarships in one place — with moderator and admin review workflows.",
    details: [
      "Students search scholarships by country, degree and category, submit applications, and track their status from a personal dashboard.",
      "Three role levels — student, moderator and admin — each with their own protected routes and permissions. Moderators review and approve applications; admins manage scholarships and users.",
      "Built on the MERN stack with JWT-based authentication and protected API routes, deployed as separate client and server applications.",
    ],
    highlights: [
      "Role-based access control across 3 user types",
      "Application review & approval pipeline",
      "Separate client/server deployments",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    category: "Full Stack",
    status: "Live",
    featured: true,
    live: "https://sparkling-sable-55715c.netlify.app",
    repoClient: "https://github.com/shafayat75/Scholar-Stream-Client",
    repoServer: "https://github.com/shafayat75/Scholar-Stream-Server",
    image: "./projects/scholarstream.jpg",
  },
  {
    slug: "studycircle",
    title: "StudyCircle",
    subtitle: "Peer Study Group Finder",
    blurb:
      "An ongoing team project (Team Syntax Slayers) that helps students discover, join and manage study groups by subject, skill level and schedule.",
    details: [
      "Students create or join study groups filtered by subject, skill level and available schedule, so study partners actually match.",
      "Backend is complete: NestJS services, PostgreSQL schema modelled with Prisma, and typed REST endpoints for groups, membership and scheduling.",
      "Built collaboratively with Team Syntax Slayers using Git branching and pull-request reviews; frontend in Next.js and Tailwind is in progress.",
    ],
    highlights: [
      "NestJS + Prisma + PostgreSQL backend completed",
      "Team workflow with branches and PR review",
      "Matching by subject, level and schedule",
    ],
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "TypeScript", "Tailwind CSS"],
    category: "Team Project",
    status: "In progress",
    featured: true,
    repo: "https://github.com/codewithnill/studycircle-peer_study_group_finder",
    image: "./projects/studycircle.svg",
  },
  {
    slug: "habitflow",
    title: "HabitFlow",
    subtitle: "Habit Tracking Web App",
    blurb:
      "A habit tracker that helps users build and maintain positive daily routines by creating, tracking and managing habits over time.",
    details: [
      "Users create habits, mark daily completions and watch streaks build — the core loop that makes habit apps stick.",
      "Clean CRUD architecture with authenticated users, so every person's habits and history stay private to them.",
      "Responsive interface designed to be used in a few seconds a day, on mobile first.",
    ],
    highlights: [
      "Daily tracking with streak history",
      "Authenticated per-user data",
      "Mobile-first responsive UI",
    ],
    tags: ["React", "Node.js", "MongoDB", "Firebase", "Tailwind CSS"],
    category: "Full Stack",
    status: "Live",
    featured: true,
    live: "https://habit-flow-zz.netlify.app",
    repo: "https://github.com/shafayat75/Habit-Tracker-Client",
    image: "./projects/habitflow.jpg",
  },
  {
    slug: "rocket-cse",
    title: "Rocket_CSE",
    subtitle: "Student–Teacher Portal",
    blurb:
      "An online class portal with class video recording, MCQ tests and exam result management for both students and teachers.",
    details: [
      "Teachers upload recorded class videos, build MCQ question sets and publish results; students attend, attempt tests and see their scores.",
      "Separate student and teacher views over a shared data model, with result management handled server-side.",
      "Designed around a real need in online classes: keeping lectures, assessments and results in one portal instead of three tools.",
    ],
    highlights: [
      "Class video recording & delivery",
      "MCQ test engine with auto results",
      "Dual student / teacher interfaces",
    ],
    tags: ["JavaScript", "Node.js", "Database Design", "REST API"],
    category: "Full Stack",
    status: "Completed",
    repo: "https://github.com/shafayat75/Rocket_CSE",
    image: "./projects/rocket-cse.svg",
  },
  {
    slug: "law-website",
    title: "Law Firm Website",
    subtitle: "Responsive Informational Site",
    blurb:
      "A clean, responsive informational website presenting legal services and content with straightforward navigation.",
    details: [
      "Service pages, practice areas and contact routes laid out so a visitor finds what they need in one or two clicks.",
      "Fully responsive layout tested from small phones up to wide desktops.",
      "Focus on readability, trust-building typography and fast load times.",
    ],
    highlights: [
      "Responsive across all breakpoints",
      "Clear information architecture",
      "Performance-focused static build",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    category: "Frontend",
    status: "Live",
    live: "https://shafayat75.github.io/law-website/",
    repo: "https://github.com/shafayat75/law-website",
    image: "./projects/law-website.jpg",
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  description: string;
  meta?: string;
  type: "education" | "experience" | "volunteer";
};

export const timeline: TimelineItem[] = [
  {
    period: "Jan 2023 — Present",
    title: "BSc in Computer Science & Engineering",
    org: "American International University–Bangladesh (AIUB), Dhaka",
    description:
      "Core coursework in data structures, algorithms, database systems, software engineering and web technologies, alongside hands-on team projects.",
    meta: "CGPA 3.20",
    type: "education",
  },
  {
    period: "2025 — Present",
    title: "Organizer (Official)",
    org: "COBEG — Committee of Bangladesh eFootball Groups",
    description:
      "Coordinate community events and tournaments across multiple groups — scheduling, communication and on-the-day operations for large online communities.",
    type: "volunteer",
  },
  {
    period: "2021",
    title: "Higher Secondary Certificate (HSC)",
    org: "Cumilla Government College, Cumilla",
    description: "Science group. Completed with a perfect result.",
    meta: "GPA 5.00 / 5.00",
    type: "education",
  },
  {
    period: "2019",
    title: "Secondary School Certificate (SSC)",
    org: "Cumilla Zilla School, Cumilla",
    description: "Science group. Completed with a perfect result.",
    meta: "GPA 5.00 / 5.00",
    type: "education",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  note?: string;
  credentialId?: string;
  /** image in /public — opens in a lightbox when present */
  image?: string;
};

export const certifications: Certification[] = [
  {
    title: "Complete Web Development Course",
    issuer: "Programming Hero",
    note: "Completion with Excellence · Batch 12",
    credentialId: "WEB12-4818",
    image: "./certificates/programming-hero.jpg",
  },
  {
    title: "IT Essentials",
    issuer: "Cisco Networking Academy",
  },
];

export const softSkills = [
  "Work Ethic & Responsibility",
  "Leadership",
  "Team Collaboration",
  "Adaptability",
  "Time Management",
  "Self Motivation",
];

export const languages = [
  { name: "Bangla", level: "Native proficiency" },
  { name: "English", level: "Professional working proficiency" },
];

export const interests = ["Football", "Anime, movies & series", "Nature photography", "Cooking"];

export const references = [
  {
    name: "Dr. Md Iftekharul Mobin",
    role: "Assistant Professor, AIUB",
    email: "iftekhar.mobin@aiub.edu",
  },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];
