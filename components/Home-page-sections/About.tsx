/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { socialMedia } from "@/data";
import { AnimatedGradientBG } from "../ui/AnimatedGradientBG";
import { CTAButton } from "../ui/CTAButton";
import { InfiniteMovingCards } from "../ui/infiniteScrollCards";
import GitStats from "./GithubStats";

export const AboutMe = () => {
  return (
    <section className="  py-12 md:py-20 lg:py-24 text-zinc-50" id="about">
      <motion.div
        initial="initial"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid  grid-flow-dense w-full grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <GitStats />
      </motion.div>
    </section>
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
      className={twMerge(
        "col-span-4 rounded-lg  border border-white/[0.1] p-6 md:p-12 my-auto",
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
  <Block className="col-span-12 row-span-2 md:col-span-8 p-0 md:p-0">
    <AnimatedGradientBG className="p-5 md:p-8 ">
      <div className="inline-flex h-full animate-shimmer cursor-pointer items-center justify-center rounded-full border border-gray-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-xs font-medium text-gray-300 mb-4 z-20">
        <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
        <p>Available for Work</p>
      </div>
      <h1 className="mb-6 md:mb-8 text-2xl sm:text-3xl  leading-tight text-white-100">
        I&apos;m committed to continuous{" "}
        <span className="text-zinc-50 font-medium">improvement</span> and
        detail-oriented work, I strive to build solutions that bridge{" "}
        <span className="text-zinc-50 font-medium">user needs</span> and{" "}
        <span className="text-zinc-50 font-medium">business objectives</span>
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
    {socialMedia.map((data) => {
      return (
        <Block
          key={data.id}
          className="col-span-6 md:col-span-2"
          style={{
            background: "rgb(4,7,29)",
            backgroundColor:
              "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
          }}
        >
          <Link
            href={data.url}
            className="w-10 md:w-16 h-10 md:h-16 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 mx-auto"
            style={{
              backgroundColor: "rgb(4,7,29)",
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
              border: "0.2px solid rgb(77 76 90 / 0.5)",
            }}
          >
            <img
              src={data.img}
              alt="icons"
              width={20}
              height={20}
              className="w-6 h-6 md:w-8 md:h-8"
            />
          </Link>
        </Block>
      );
    })}
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-snug overflow-hidden ">
    <h3 className="font-semibold">My Technical Skills ✨</h3>
    <p className="mt-4 mb-6 max-w-screen-sm text-base text-slate-900 dark:text-neutral-300">
      With a love for exploring new development tools and applying them in
      real-world projects, I’m a huge fan of JavaScript and its frameworks. Here
      are the tech stacks I’m currently working with.
    </p>

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
