"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export const ProjectCard = ({
  id,
  title,
  des,
  img,
  iconLists,
  link,
}: {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
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
    <div
      className="w-[95%] max-h-[520px] group mx-auto  p-2 bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black "
      style={{
        backgroundColor: "rgb(4,7,29)",
        background:
          "linear-gradient(180deg, var(--slate-800), var(--slate-900) !important)",
        border: "1px solid rgb(77 76 90 / 1)",
      }}
    >
      <figure className="w-full h-80 group-hover:h-72 transition-all duration-300 dark:bg-[#0a121a] bg-[#f0f5fa]  rounded-md relative overflow-hidden">
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-r from-black to-gray-950 px-8 py-16 shadow-2xl"
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
            src={
              "https://res.cloudinary.com/dzl9yxixg/image/upload/v1715685361/distrokings_vihqpy.jpg"
            }
            alt="shoes"
            width={600}
            height={600}
            className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  group-hover:-bottom-5  h-64 w-[80%] lg:w-[90%] group-hover:border-4 border-4 group-hover:border-[#76aaf82d] rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
          />
        </div>
      </figure>
      <article className="  p-4 ">
        <div className="flex items-center justify-between mt-7 mb-3">
          <div className="flex items-center">
            {iconLists.map((icon, index) => (
              <div
                key={index}
                className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                style={{
                  transform: `translateX(-${5 * index + 2}px)`,
                }}
              >
                <img src={icon} alt="icon5" className="p-2" />
              </div>
            ))}
          </div>
        </div>
        <h1 className="text-xl font-semibold capitalize">
          Incorporate your company
        </h1>
        <p className="text-base leading-[120%]">
          Form a legal entity, issue stock, and start accepting payments.
        </p>
        <a
          href="#"
          className=" text-base dark:text-white text-blue-600 font-normal  group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1  transition-all duration-300  "
        >
          Learn about Atlas
          <span>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M19 6.41L8.7 16.71a1 1 0 11-1.4-1.42L17.58 5H14a1 1 0 010-2h6a1 1 0 011 1v6a1 1 0 01-2 0V6.41zM17 14a1 1 0 012 0v5a2 2 0 01-2 2H5a2 2 0 01-2-2V7c0-1.1.9-2 2-2h5a1 1 0 010 2H5v12h12v-5z" />
            </svg>
          </span>
        </a>
      </article>
    </div>
  );
};
