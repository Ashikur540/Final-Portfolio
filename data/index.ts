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
