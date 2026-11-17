export const navItems = [
  { name: "Home", link: "#hero" },
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-2 ",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Helpxon",
    type: "SaaS",
    year: "Since 2025",
    domain: "helpxon.com",
    linkLabel: "Visit live site",
    tint: "#eef2ff",
    summary: "A live support SaaS with AI replies, built from a blank page to production.",
    did: ["Designed the product and built most of the React app", "Chat widget any site adds with one script", "Laravel APIs, and edited the launch videos"],
    des: "A live customer-support SaaS with AI replies, built from scratch to production. I did the product design, most of the React app, the chat widget sites add with one script, Laravel APIs, and the launch videos.",
    img: "/projects/helpxon.jpg",
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
    did: ["Reads JSX with Babel, right in the browser", "Spots layouts like cards and pricing tables", "Exports React or HTML with Tailwind"],
    des: "Paste a React component, get a matching skeleton loader you can tweak, then copy React or HTML with Tailwind. Reads JSX with Babel, spots layouts like cards and pricing tables, and runs fully in the browser. Open source.",
    img: "/projects/skeleton-studio.png",
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
    did: ["Works offline, installs like a normal app", "Prayer times from your location"],
    des: "An offline-first app to track daily good deeds, with a heatmap, streaks, reminders and prayer times from your location. Installs on your phone like a normal app.",
    img: "/projects/hasanat.jpg",
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
    did: ["Zikr and the 99 names in the spinner", "A short authentic hadith under it"],
    des: "A Claude Code plugin that turns waiting time into remembrance: zikr and the 99 names of Allah in the spinner while Claude works, with a short authentic hadith under it.",
    img: "/projects/tadhkir-loop.jpg",
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
    did: ["RTK Query on top of localStorage", "Moving to a real API means changing one file"],
    des: "A task manager with a dashboard that shows how your week is going. RTK Query sits on top of localStorage, so moving to a real API means changing one file.",
    img: "/projects/flowmate.jpg",
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

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workHistories = [
  {
    company: "Arraytics",
    name: "Arraytics",
    yearLabel: "since 2024",
    note: "booking + AI",
    summary: "Booking, restaurant-ordering and AI products on 8,000+ sites. Main developer of two booking plugins with 2,800+ active installs. Fixed double-booking bugs and built an AI chat widget.",
    url: "https://arraytics.com/",
    title: "Frontend Developer",
    date: "Dec 2024 – Present",
    description:
      "Full-stack work on booking, restaurant-ordering and AI products used on 8,000+ sites (React, TypeScript, PHP).",
    responsibilities: [
      "Main developer of the Booktics and Timetics booking plugins since Sep 2026 (2,800+ active installs): recurring bookings, coupons, round-robin staff assignment, WooCommerce payments and WhatsApp reminders.",
      "Made bookings and payments safe: fixed race conditions that let two customers take the same slot, and moved pricing to the server so it cannot be changed in the browser.",
      "WP Cafe v3 (5,000+ installs): one-page checkout, deposit payments, daily order limits and WPML support.",
      "Built the Aisentic AI chat widget (streaming replies, Shadow DOM) and shared SDKs used in 5 products, including a React Flow automation builder.",
    ],
  },
  {
    company: "Innosoft IT (Remote)",
    name: "Innosoft IT",
    yearLabel: "2024",
    note: "fully remote",
    summary: "Analytics report pages for Shopify and WordPress stores, and an FB Pixel admin panel from Figma to launch.",
    url: "",
    title: "Frontend Developer",
    date: "May 2024 – Sep 2024",
    description:
      "Shopify and WordPress analytics apps for e-commerce stores.",
    responsibilities: [
      "Researched Shopify and WordPress GA4 plugins, then built a set of analytics report pages in React and TypeScript.",
      "Designed the Figma UI and built the admin panel for an FB Pixel app with the backend team, to launch (TypeScript, tRPC).",
    ],
  },
  {
    company: "HasTech IT",
    name: "HasTech IT",
    yearLabel: "2023",
    note: "first job",
    summary: "Split one bundle app into two products to sell instead of one, and built a new product end to end in one month.",
    url: "https://hasthemes.com/",
    title: "Junior Web Application Developer",
    date: "Jul 2023 – May 2024 (intern until Dec 2023)",
    description: "Shopify apps for online stores.",
    responsibilities: [
      "Split a third-party bundle app into two standalone Shopify apps, GP Wishlist & Upsell Suite and SalesPulse Sales Pop Up, giving the company two products to sell instead of one.",
      "Researched, designed and built a new product end to end in one month, to launch (Next.js, Node.js, Koa.js, MongoDB).",
    ],
  },
];

export const socialMedia = [
  {
    id: 1,
    name: "GitHub",
    img: "/git.svg",
    url: "https://github.com/Ashikur540",
  },
  {
    id: 2,
    name: "LinkedIn",
    img: "/link.svg",
    url: "https://www.linkedin.com/in/md-ashikurrahman/",
  },
  {
    id: 3,
    name: "Email",
    img: "/mail.svg",
    url: "mailto:meashik1000@gmail.com",
  },
];

export const personalInfo = {
  name: "Md Ashikur Rahman",
  title: "Frontend-focused Full-stack Developer",
  location: "Dhaka, Bangladesh",
  email: "meashik1000@gmail.com",
  websiteDomain: "https://ashikur-on-web.vercel.app/",
  briefInfo:
    "Frontend-focused full-stack developer with 3+ years shipping React and TypeScript products, from a SaaS built from scratch to plugins used on 8,000+ sites. React, Next.js, TypeScript, Node.js, Laravel, AI integration.",
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

/** The three lines on the notebook page on the desk. */
export const aboutNote = [
  "I like taking something rough and shaping it until it's clear.",
  "Weekends: side projects, friends, family, and too many photos.",
  "This is my desk. Go on, touch things.",
];

export type DeskPhoto = { src: string; caption: string; date?: string; position?: string; standIn?: boolean };

/** Photos in the stack on the desk. standIn = placeholder, must be replaced before launch. */
export const deskPhotos: DeskPhoto[] = [
  { src: "/desk/me3.jpg", caption: "sea day", date: "'24 12 17", position: "50% 30%" },
  { src: "/desk/saintmartin2.jpg", caption: "friends + coral", date: "'24 12 18", standIn: true },
  { src: "/desk/coxsbazar.jpg", caption: "last light", date: "'24 12 16", standIn: true },
  { src: "/desk/me1.jpg", caption: "me, probably", date: "'25 08 02" },
  { src: "/desk/natore.jpg", caption: "weekend, Natore", date: "'25 01 24", standIn: true },
  { src: "/desk/dhaka.jpg", caption: "home, Dhaka", date: "'25 03 02", standIn: true },
  { src: "/desk/rangpur.jpg", caption: "old palace", date: "'25 02 08", standIn: true },
];

export type DeskBook = { title: string; author: string; tone: "dark" | "red" | "cream"; placeholder?: boolean };

/** Books on the desk. placeholder = not confirmed by Ashik yet. */
export const deskBooks: DeskBook[] = [
  { title: "The Pragmatic Programmer", author: "Hunt & Thomas", tone: "dark", placeholder: true },
  { title: "Don't Make Me Think", author: "Steve Krug", tone: "red", placeholder: true },
  { title: "This Is Marketing", author: "Seth Godin", tone: "cream", placeholder: true },
];

export type DeskTrack = { title: string; length: string; cover: string; src?: string };

/** Phone playlist. Add src (a file in /public/desk/audio/) once a real nasheed file is supplied. */
export const deskTracks: DeskTrack[] = [
  { title: "Your nasheed 1", length: "1:36", cover: "/desk/coxsbazar.jpg" },
  { title: "Your nasheed 2", length: "1:12", cover: "/desk/natore.jpg" },
  { title: "Rain, no music", length: "2:04", cover: "/desk/saintmartin.jpg" },
];
