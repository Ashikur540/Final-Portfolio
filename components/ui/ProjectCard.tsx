"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variant, Variants } from "framer-motion";
import { useRef, useState } from "react";

import { AnimatedToolTip } from "./AnimatedTooltip";
import { GradientBorderBtn } from "./GradientBorderBtn";

export const ProjectCard = ({
  id,
  title,
  des,
  img,
  iconLists,
  link,
  githubLink,
  variants,
}: {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: { name: string; image: string }[];
  link: string;
  githubLink: string;
  variants: Variants;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };
  return (
    <motion.a
      variants={variants}
      key={id}
      href={link}
      className="w-[95%] max-h-[520px] group mx-auto  p-2 bg-white dark:border-0 border overflow-hidden rounded-xl dark:text-white text-black "
      style={{
        backgroundColor: "rgb(4,7,29)",
        background:
          "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
        border: "0.2px solid rgb(77 76 90 / 0.5)",
      }}
    >
      <figure className="w-full h-80 group-hover:h-72 transition-all duration-300 dark:bg-[#131e29] bg-[#f0f5fa]  rounded-xl relative overflow-hidden">
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-r from-black to-gray-950  p-4  lg:px-8 lg:py-16 shadow-2xl "
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, #2C2C39, transparent 40%)`,
            }}
          />
          {/* <p className="text-sm text-gray-200">Card Content</p> */}
          <Image
            src={img}
            alt={`${title}-project-image`}
            width={600}
            height={600}
            className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  group-hover:-bottom-5  h-64 w-[86%] lg:w-[90%] group-hover:border-4 border-4 group-hover:border-[#76aaf82d] rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
          />
        </div>
      </figure>
      <article className="p-4 ">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {iconLists.map((icon, index) => (
              <AnimatedToolTip tooltipText={icon.name} key={index}>
                <div
                  className="border border-white/[.2] rounded-full bg-black-200 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                  style={{
                    transform: `translateX(-${5 * index + 2}px)`,
                  }}
                >
                  <Image
                    src={icon.image}
                    alt={`${icon.name}-icon}`}
                    className="w-[60%]"
                    width={10}
                    height={10}
                  />
                </div>
              </AnimatedToolTip>
            ))}
          </div>
        </div>
        <h4 className="text-lg sm:text-xl font-semibold capitalize mb-3.5 sm:mb-4">
          {title}
        </h4>
        <p className="text-sm leading-[120%] text-zinc-300 mb-4">{des}</p>
        <Link
          href={githubLink}
          target="_blank"
          className=" text-base dark:text-white text-blue-600 font-normal  group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1  transition-all duration-300  "
        >
          <GradientBorderBtn text="View on Github" />
        </Link>
      </article>
    </motion.a>
  );
};
