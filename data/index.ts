export const projects = [
  {
    id: 1,
    title: "Helpxon",
    type: "SaaS",
    year: "Since 2025",
    domain: "helpxon.com",
    linkLabel: "Visit live site",
    tint: "#eef2ff",
    summary: "A help desk for small teams, with AI that drafts the replies. Built from a blank page to production.",
    did: ["Designed the product and built most of the React app", "Made a chat widget any site can add with one script", "Wrote the Laravel APIs and edited the launch videos"],
    img: "/projects/helpxon-hd.jpg",
    iconLists: [
      { name: "React", image: "/logos/brand-react.svg" },
      { name: "TypeScript", image: "/logos/brand-typescript.svg" },
      { name: "Laravel", image: "/logos/brand-laravel.svg" },
      { name: "PostgreSQL", image: "/logos/database.svg" },
      { name: "Docker", image: "/logos/brand-docker.svg" },
    ],
    link: "https://helpxon.com",
  },
  {
    id: 2,
    title: "Skeleton Studio",
    type: "Open source",
    year: "2026",
    domain: "skeletons-studio.vercel.app",
    linkLabel: "Try it live",
    tint: "#ecf7f1",
    summary: "Paste a React component, get a matching skeleton loader you can tweak.",
    did: ["Parsed JSX with Babel, right in the browser", "Taught it to spot layouts like cards and pricing tables", "Added export to React or HTML with Tailwind"],
    img: "/projects/skeleton-studio-hd.jpg",
    iconLists: [
      { name: "Next.js", image: "/logos/brand-nextjs.svg" },
      { name: "React", image: "/logos/brand-react.svg" },
      { name: "TypeScript", image: "/logos/brand-typescript.svg" },
      { name: "Tailwind CSS", image: "/logos/brand-tailwind.svg" },
    ],
    link: "https://skeletons-studio.vercel.app",
    githubLink: "https://github.com/Ashikur540/skeleton-studio",
  },
  {
    id: 3,
    title: "Hasanat",
    type: "PWA",
    year: "2026",
    domain: "hasanat-3375b.web.app",
    linkLabel: "Open the app",
    tint: "#fdf4e4",
    summary: "Track daily good deeds, with a heatmap, streaks, reminders and prayer times.",
    did: ["Made it work offline and install like a normal app", "Added prayer times from your location"],
    img: "/projects/hasanat-hd.jpg",
    iconLists: [
      { name: "React", image: "/logos/brand-react.svg" },
      { name: "TypeScript", image: "/logos/brand-typescript.svg" },
      { name: "Vite", image: "/logos/brand-vite.svg" },
      { name: "Firebase", image: "/logos/brand-firebase.svg" },
    ],
    link: "https://hasanat-3375b.web.app",
    githubLink: "https://github.com/Ashikur540/hasanat",
  },
  {
    id: 4,
    title: "Tadhkir Loop",
    type: "Plugin",
    year: "2026",
    domain: "github.com/Ashikur540/tadhkir-loop",
    linkLabel: "View on GitHub",
    tint: "#f4eefc",
    summary: "Turns waiting time into remembrance while Claude Code works.",
    did: ["Put dhikr and the 99 names in the spinner", "Added a short authentic hadith under it"],
    img: "/projects/tadhkir-loop.jpg",
    // portrait image: centre it on the terminal (a wider, larger image would be sharper)
    imgPosition: "50% 50%",
    iconLists: [
      { name: "JavaScript", image: "/logos/brand-javascript.svg" },
      { name: "Node.js", image: "/logos/brand-nodejs.svg" },
    ],
    link: "https://github.com/Ashikur540/tadhkir-loop",
    githubLink: "https://github.com/Ashikur540/tadhkir-loop",
  },
  {
    id: 5,
    title: "FlowMate",
    type: "Web app",
    year: "2024",
    domain: "flowmate-task-manager.vercel.app",
    linkLabel: "Open the app",
    tint: "#ecf5fb",
    summary: "A task manager with a dashboard that shows how your week is going.",
    did: ["Used RTK Query on top of localStorage", "Set it up so a real API means changing one file"],
    img: "/projects/flowmate-hd.jpg",
    iconLists: [
      { name: "Next.js", image: "/logos/brand-nextjs.svg" },
      { name: "TypeScript", image: "/logos/brand-typescript.svg" },
      { name: "Redux Toolkit", image: "/logos/brand-redux.svg" },
      { name: "Tailwind CSS", image: "/logos/brand-tailwind.svg" },
    ],
    link: "https://flowmate-task-manager.vercel.app",
    githubLink: "https://github.com/Ashikur540/Next-todo-dashboard",
  },
];

export const workHistories = [
  {
    company: "Arraytics",
    name: "Arraytics",
    yearLabel: "since 2024",
    note: "booking + AI",
    summary: "Worked on booking, restaurant-ordering and AI products used on 8,000+ sites. Main developer of two booking plugins with 2,800+ active installs. Fixed double-booking bugs and built an AI chat widget.",
    title: "Frontend Developer",
  },
  {
    company: "Innosoft IT (Remote)",
    name: "Innosoft IT",
    yearLabel: "2024",
    note: "fully remote",
    summary: "Researched, designed and built the frontend of GA4 and Meta Pixel apps for Shopify and WordPress stores, from Figma to launch: complex dashboards that pull real-time analytics from store owners' sites.",
    title: "Frontend Developer",
  },
  {
    company: "HasTech IT",
    name: "HasTech IT",
    yearLabel: "2023",
    note: "first job",
    summary: "Split a bundle app into two standalone Shopify apps, so the company had two products to sell instead of one. Built a new product end to end in one month.",
    title: "Junior Web Application Developer",
  },
];

export const socialMedia = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/Ashikur540",
  },
  {
    id: 2,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/md-ashikurrahman/",
  },
  {
    id: 3,
    name: "Email",
    url: "mailto:meashik1000@gmail.com",
  },
];

/** A social profile url by name, e.g. socialUrl("GitHub"). */
export const socialUrl = (name: string) => socialMedia.find((m) => m.name === name)?.url || "#";

/** My Timetics booking page: a free 20 minute intro call (Mon to Fri, 3 to 10 PM Dhaka time). */
export const bookingUrl = "https://app.timetics.ai/ashik1000/intro-call";

export const personalInfo = {
  name: "Ashikur Rahman",
  title: "Frontend-focused Full-stack Developer",
  location: "Dhaka, Bangladesh",
  email: "meashik1000@gmail.com",
  websiteDomain: "https://ashikur-on-web.vercel.app/",
  // search result snippet: keep it under about 155 characters so Google shows all of it
  briefInfo:
    "Frontend-focused full-stack developer in Dhaka with 3+ years of React, Next.js and TypeScript, from a SaaS built from scratch to plugins on 8,000+ sites.",
};

/* ---------- redesign: shared types and desk content ---------- */

export type Post = { title: string; url: string; date: string; summary: string };

export const hashnodeUrl = "https://ashik1000.hashnode.dev";

/** Shown when the Hashnode feed cannot be reached. */
export const fallbackPosts: Post[] = [
  {
    title: "How ChatGPT and Claude Actually Work",
    url: "https://ashik1000.hashnode.dev/how-chatgpt-and-claude-actually-work",
    date: "3 Apr 2026",
    summary: "How attention and transformers let ChatGPT and Claude keep track of context.",
  },
  {
    title: "How AI Trains Itself, and What It Actually Produces",
    url: "https://ashik1000.hashnode.dev/how-ai-trains-itself-and-what-it-actually-produces",
    date: "3 Apr 2026",
    summary: "Neural network training step by step: loss, backpropagation and weight updates.",
  },
  {
    title: "What Is a Neural Network, and How Does It Actually Think?",
    url: "https://ashik1000.hashnode.dev/what-is-a-neural-network-and-how-does-it-actually-think",
    date: "3 Apr 2026",
    summary: "How neural networks work, through simple analogies and real examples.",
  },
];

/** The ones I use every day; they get the yellow marker. */
export const dailySkills = ["React", "Next.js", "TypeScript", "Node.js"];

/** Tools I use, shown under Experience. Only what is on the resume. */
export const skills = [
  { label: "frontend", items: ["React", "Next.js", "TypeScript", "TanStack Query", "Redux", "Tailwind CSS"] },
  { label: "backend", items: ["Node.js", "Express", "Laravel", "PHP", "PostgreSQL", "MongoDB"] },
  { label: "AI", items: ["LLM APIs", "streaming chat", "AI widgets"] },
  { label: "tools", items: ["Playwright", "Vitest", "Docker", "Figma", "Git"] },
];

/** The three lines on the notebook page on the desk. */
export const aboutNote = [
  "I like taking a messy idea and shaping it until it's simple to use.",
  "Weekends: side projects, family, trips, books, and too many photos.",
  "This is my desk. Go on, touch things.",
];

export type DeskPhoto = { src: string; caption: string; date?: string; position?: string; standIn?: boolean };

/** Photos in the stack on the desk. standIn = placeholder, must be replaced before launch. */
export const deskPhotos: DeskPhoto[] = [
  { src: "/clicks/1000080447.webp", caption: "ball, beach, me", date: "'26 01 13" },
  { src: "/clicks/1000017350.webp", caption: "last light", date: "'25 01 16" },
  { src: "/clicks/1000006684.webp", caption: "village morning", date: "'22 12 16" },
  { src: "/clicks/1000027701.webp", caption: "green, everywhere", date: "'25 04 03" },
  { src: "/clicks/1000019501.webp", caption: "dates and spices", date: "'25 02 26" },
  { src: "/clicks/1000039787.webp", caption: "evening walk", date: "'25 07 02" },
  { src: "/clicks/1000060956.webp", caption: "balcony garden", date: "'25 11 06" },
  { src: "/clicks/1000157525.webp", caption: "old palace", date: "'26 10 09" },
  { src: "/clicks/1000080439.webp", caption: "big red truck", date: "'26 01 14" },
  { src: "/clicks/1000080445.webp", caption: "low tide", date: "'26 01 14" },
  { src: "/clicks/1000026360.webp", caption: "sun nap", date: "'25 04 03" },
  { src: "/clicks/1000157529.webp", caption: "quiet garden", date: "'26 10 09" },
];

export type JobMoment = { src?: string; caption: string; alt?: string };

/**
 * Photos that appear when a job row in Experience is hovered (keyed by job name).
 * No src = an empty placeholder frame; yarn check:launch fails until each one has a real photo.
 * One photo stays still; two or more swap every 1.5 seconds.
 */
export const jobMoments: Record<string, JobMoment[]> = {
  "HasTech IT": [{ src: "/clicks/1000176389.webp", caption: "first team", alt: "Group photo of the HasTech IT team in the office" }],
  "Innosoft IT": [{ src: "/clicks/1000003112.webp", caption: "with the founder", alt: "Selfie of Ashik with the founder of Innosoft IT" }],
  Arraytics: [{ src: "/clicks/1000076964-prize.webp", caption: "prize from our CEO", alt: "Ashik receiving a prize from the CEO of Arraytics" }],
};

export type DeskBook = { title: string; author: string; tone: "dark" | "red" | "cream"; placeholder?: boolean };

/** Books on the desk. placeholder = not confirmed by Ashik yet. */
export const deskBooks: DeskBook[] = [
  { title: "The Pragmatic Programmer", author: "Hunt & Thomas", tone: "dark" },
  { title: "Don't Make Me Think", author: "Steve Krug", tone: "red" },
  { title: "This Is Marketing", author: "Seth Godin", tone: "cream" },
];

/**
 * A track on the desk phone. src = an audio file I am allowed to host (public/desk/audio/).
 * generated = made by the desk's own sound engine, no file needed.
 * A track with neither plays a stand-in tone, and yarn check:launch fails until it has a file.
 */
export type DeskTrack = {
  title: string;
  artist: string;
  length: string;
  cover: string;
  src?: string;
  generated?: boolean;
};

/** Phone playlist. Add src (a file in /public/desk/audio/) once a real nasheed file is supplied. */
export const deskTracks: DeskTrack[] = [
  { title: "Maula Ya Salli Wa Sallim", artist: "Abu Ubayda, slowed + reverb", length: "3:58", cover: "/clicks/1000017350.webp", src: "/desk/audio/maula-ya-salli.m4a" },
  { title: "Kun Anta", artist: "Humood, slowed + reverb", length: "4:55", cover: "/clicks/1000027701.webp", src: "/desk/audio/kun-anta.m4a" },
  { title: "Allahu Hu Allah", artist: "CFN release", length: "7:23", cover: "/clicks/1000060956.webp", src: "/desk/audio/allahu-hu-allah.m4a" },
  { title: "Make Me Strong", artist: "Sami Yusuf, vocals only", length: "4:13", cover: "/clicks/1000080445.webp", src: "/desk/audio/make-me-strong.m4a" },
  { title: "Rain, no music", artist: "made by the desk", length: "2:04", cover: "/clicks/1000157529.webp", generated: true },
];
