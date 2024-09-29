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
    title: "SpeedXpress Logistic system",
    des: "A full-stack web application that helps logistics manage their shipments and deliveries",
    img: "/projects/project-1.webp",
    iconLists: [
      { name: "React", image: "/react-2.svg" },
      { name: "Tailwind CSS", image: "/tailwind-css-2.svg" },
      { name: "React Query", image: "/react-query-seeklogo.svg" },
      { name: "Node.js", image: "/node-svgrepo-com.svg" },
      { name: "Firebase", image: "/firebase-svgrepo-com.svg" },
      { name: "MongoDB", image: "/mongodb-svgrepo-com.svg" },
      { name: "Express js", image: "/logos/icons8-express-js.svg" },
      { name: "Chart js", image: "/chartjs_icon_132506.svg" },
    ],
    link: "https://speed-xpress-cb80b.web.app/",
    githubLink: "https://github.com/Team-Code-Artisans/speedXpress-client",
  },
  {
    id: 2,
    title: "AutoHunt car Resell Market",
    des: "A full-stack e-commerce site where users can buy, sell, and advertise their used cars.",
    img: "/projects/project-2.webp",
    iconLists: [
      { name: "React", image: "/react-2.svg" },
      { name: "Tailwind CSS", image: "/tailwind-css-2.svg" },
      { name: "React Query", image: "/react-query-seeklogo.svg" },
      { name: "Node js", image: "/node-svgrepo-com.svg" },
      { name: "Firebase", image: "/firebase-svgrepo-com.svg" },
      { name: "MongoDB", image: "/mongodb-svgrepo-com.svg" },
      { name: "Express js", image: "/logos/icons8-express-js.svg" },
    ],
    link: "https://autohunt-f5b1c.web.app/",
    githubLink:
      "https://github.com/Ashikur540/AutoHunt-Resell-MarketPlace-Client-",
  },
  {
    id: 3,
    title: "Learners Hut",
    des: "A full-stack e-learning platform offering a variety of courses on different categories.",
    img: "/projects/project-3.webp",
    iconLists: [
      { name: "React", image: "/react-2.svg" },
      { name: "Tailwind CSS", image: "/tailwind-css-2.svg" },
      { name: "Node js", image: "/node-svgrepo-com.svg" },
      { name: "Firebase", image: "/firebase-svgrepo-com.svg" },
      { name: "MongoDB", image: "/mongodb-svgrepo-com.svg" },
      { name: "Express js", image: "/logos/icons8-express-js.svg" },
    ],
    link: "https://learners-hut.web.app/",
    githubLink: "https://github.com/Ashikur540/Learners-Hut-Client",
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
    company: "InnoSoft IT",
    url: "https://innosoftit.com/",
    title: "Frontend Developer",
    date: "4 May 24 - 22 Sep 24",
    description:
      "Designed and developed the UI for Shopify apps with a focus on creating intuitive and user-friendly admin panels. Improved code management and collaborated closely with cross-functional teams.",
    responsibilities: [
      "Developed responsive UI for Shopify admin panels using TypeScript and React.",
      "Integrated tRPC for efficient communication between frontend and backend.",
      "Contributed 3 of their shopify apps that enhances the conversions of e-commerce stores.",
      "Learned about wordpress and developed their website.",
    ],
  },
  {
    company: "Hastech IT",
    url: "https://hasthemes.com/",
    title: "Webflow Template Developer.",
    date: "1 jan 24 - 30 April 24",
    description:
      "Gained hands-on experience with the Webflow platform, developing live templates for the Webflow marketplace.",
    responsibilities: [
      "Developed three Webflow templates, now live in the Webflow marketplace.",
      "Mastered advanced Webflow animations to create visually appealing designs.",
      "Collaborated with the design team to ensure seamless user experiences.",
      "Learned the intricacies of the Webflow platform and streamlined template development for scalability.",
    ],
  },
  {
    company: "Hastech IT",
    url: "https://hasthemes.com/",
    title: "Junior Shopify App Developer",
    date: "8 june 23 - 31 December 23",
    description:
      "I pursued my first internship here and gained hands-on experience with the Shopify platform, developing apps and exploring its technical aspects.",
    responsibilities: [
      "Developed two Shopify apps now live on the Shopify store, both receiving positive reviews.",
      "Gained practical technical understanding of the Shopify ecosystem, from storefronts to backend integration.",
      "Collaborated with the support team to ensure seamless customer experiences.",
      "Wrote app documentations for their shopify apps by collaborating with seniors.",
    ],
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    url: "https://github.com/Ashikur540",
  },
  {
    id: 2,
    img: "/link.svg",
    url: "https://www.linkedin.com/in/md-ashikurrahman/",
  },
  {
    id: 3,
    img: "/facebook-01-stroke-rounded.svg",
    url: "https://www.facebook.com/ashik.201.35.540",
  },
  {
    id: 4,
    img: "/brand-leetcode.svg",
    url: "https://leetcode.com/u/ashikur35-540/",
  },
];

export const personalInfo = {
  name: "Md Ashikur Rahman",
  title: "Frontend Developer",
  location: "Dhaka, Bangladesh",
  email: "meashik1000@gmail.com",
};
