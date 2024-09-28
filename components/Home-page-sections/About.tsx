/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

// import CodeSnippetImage from "";
import { AnimatedGradientBG } from "../ui/AnimatedGradientBG";
import { CTAButton } from "../ui/CTAButton";
import { InfiniteMovingCards } from "../ui/infiniteScrollCards";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import GitStats from "./GithubStats";

// import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
// import { SiGithub, SiTiktok, SiTwitter, SiYoutube } from "react-icons/si";

export const AboutMe = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    }
  }, [isInView, controls]);

  return (
    <div className="  py-12 text-zinc-50" ref={ref}>
      <motion.div
        initial="initial"
        animate={controls}
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid  grid-flow-dense w-full grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <GitStats />
        {/* <HobbyBlock /> */}
        {/* <LocationBlock />
        <EmailListBlock /> */}
      </motion.div>
    </div>
  );
};

interface BlockProps {
  className?: string;
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const Block = ({ className, children, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg  border border-white/[0.1] p-6 md:p-10",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6 md:p-0">
    <AnimatedGradientBG className="p-8 ">
      <div className="inline-flex h-full animate-shimmer cursor-pointer items-center justify-center rounded-full border border-gray-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-xs font-medium text-gray-300 mb-4 z-20">
        <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
        <p>Available for Work</p>
      </div>
      <h1 className="mb-12 text-4xl font-medium leading-tight">
        Hi, I&apos;m Ashikur.{" "}
        <span className="text-zinc-400">I build cool stuffs for you.</span>
      </h1>
      <a
        href="/Ashikur-Rahman-Resume-Frontend-Developer.pdf"
        className="relative inline-flex items-center justify-center w-fit overflow-hidden font-bold text-white rounded-md shadow-2xl group z-10"
        download="Ashikur_Rahman_resume_Frontend_Developer.pdf"
      >
        <CTAButton className="bg-white-100">Download Resume</CTAButton>
      </a>
    </AnimatedGradientBG>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-red-500 md:col-span-3"
      style={{
        background: "red",
      }}
    >
      <a
        href="/"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M941.3 296.1a112.3 112.3 0 00-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0082.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z" />
        </svg>
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-green-600 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
        </svg>
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
          <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 11-5-5v2a3 3 0 103 3V0z" />
        </svg>
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-500 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
          <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 11-5-5v2a3 3 0 103 3V0z" />
        </svg>
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-snug overflow-hidden ">
    {/* <p className="max-w-screen-md">
      My passion is building cool stuff.{" "}
      <span className="text-zinc-400 ">
        I build primarily with React, Tailwind CSS, and Framer Motion. I love
        this stack so much that I even built a website about it. I've made over
        a hundred videos on the subject across YouTube and TikTok.
      </span>
    </p> */}
    <TextGenerateEffect
      words="My passion is building cool stuff. I build primarily with React, Tailwind CSS, and Framer Motion. I love
        this stack so much that I even built a website about it. I've made over
        a hundred videos on the subject across YouTube and TikTok."
      duration={0.5}
      className="max-w-screen-md"
    />

    <div className="flex flex-col md:flex-row justify-between items-center flex-wrap relative mt-20">
      <div
        className="w-full md:w-1/2 relative  sm:relative md:absolute -right-14 -bottom-5"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        }}
      >
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.70] bg-red-500 rounded-full blur-3xl opacity-95" />
        <img
          src={`/code-snippet.png`}
          alt="code snippet"
          className="max-w-full sm:max-w-[95%] md:max-w-[80%] ml-auto scale-[1.4]"
        />
      </div>
      <div className="flex flex-col justify-start gap-1 mt-12 sm:mt-10 md:mt-5 lg:gap-5  overflow-hidden w-full md:w-1/2">
        {/* tech stack lists */}
        {/* <div className="flex flex-col gap-3 md:gap-3 lg:gap-8"> */}
        <InfiniteMovingCards
          items={[
            { icon: "/logos/brand-html5.svg", name: "HTML" },
            { icon: "/logos/brand-css3.svg", name: "CSS" },
            { icon: "/logos/brand-javascript.svg", name: "Javascript" },
            { icon: "/logos/brand-tailwind.svg", name: "Tailwind" },
            { icon: "/logos/brand-react.svg", name: "React JS" },
            { icon: "/logos/brand-typescript.svg", name: "Typescript" },
            { icon: "/logos/chart-arcs.svg", name: "ApexChart" },
          ]}
          direction="left"
        />
        {/* </div> */}
        {/* <div className="flex flex-col gap-3 md:gap-3 lg:gap-8"> */}
        <InfiniteMovingCards
          items={[
            { icon: "/logos/brand-nextjs.svg", name: "Next JS" },
            { icon: "/logos/brand-nodejs.svg", name: "Node JS" },
            { icon: "/logos/brand-mongodb.svg", name: "Mongo DB" },
            { icon: "/logos/icons8-express-js.svg", name: "Express JS" },
            { icon: "/logos/brand-wordpress.svg", name: "Wordpress" },
            { icon: "/logos/icons8-shopify.svg", name: "Shopify" },
          ]}
          direction="right"
        />
        {/* </div> */}
      </div>
    </div>
  </Block>
);

// import React, { useState } from "react";

// const hobbies = [
//   { id: 1, name: "Photography", icon: "📷" },
//   { id: 2, name: "Trekking", icon: "🥾" },
//   { id: 3, name: "Reading", icon: "📚" },
//   { id: 4, name: "Praying", icon: "🙏" },
//   { id: 5, name: "Music", icon: "🎵" },
//   { id: 6, name: "Drawing", icon: "🎨" },
// ];

// const HobbyBadge = ({ hobby, position }) => {
//   return (
//     <motion.div
//       initial={{ y: -300, opacity: 0 }}
//       animate={{ y: position.y, x: position.x, opacity: 1 }}
//       transition={{
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//         mass: 0.5,
//       }}
//       className="absolute bg-white text-black rounded-full p-2 shadow-lg"
//       style={{ width: "fit-content" }}
//     >
//       <span className="text-2xl mr-2">{hobby.icon}</span>
//       {hobby.name}
//     </motion.div>
//   );
// };

// const HobbyBlock = () => {
//   const [positions, setPositions] = useState([]);
//   const controls = useAnimation();
//   const ref = React.useRef(null);
//   const isInView = useInView(ref, { once: true, threshold: 0.2 });

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   useEffect(() => {
//     const generatePositions = () => {
//       const containerWidth = 800; // Adjust based on your layout
//       const containerHeight = 400; // Adjust based on your layout
//       return hobbies.map(() => ({
//         x: Math.random() * (containerWidth - 100), // Subtracting badge width
//         y: Math.random() * (containerHeight - 40), // Subtracting badge height
//       }));
//     };

//     setPositions(generatePositions());
//   }, []);

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={{
//         visible: {
//           transition: {
//             staggerChildren: 0.1,
//           },
//         },
//         hidden: {},
//       }}
//       className="col-span-9 row-span-1 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-6 relative h-[400px] overflow-hidden"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-white">My Hobbies</h2>
//       {hobbies.map((hobby, index) => (
//         <HobbyBadge
//           key={hobby.id}
//           hobby={hobby}
//           position={positions[index] || { x: 0, y: 0 }}
//         />
//       ))}
//     </motion.div>
//   );
// };

// export default HobbyBlock;
