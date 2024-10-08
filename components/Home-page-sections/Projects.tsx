"use client";
import { projects, socialMedia } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionTitle } from "../ui/SectionTitle";
import { BlurFadeEffectWrapper } from "../ui/BlurFadeEffectWarpper";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-10 md:py-20" id="projects" ref={ref}>
      <div className=" mb-8 md:mb-10  relative ">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <BlurFadeEffectWrapper inView inViewMargin="1%" delay={0.2}>
            <SectionTitle className="">
              My Recent <span className="text-purple">Projects</span>
            </SectionTitle>
          </BlurFadeEffectWrapper>

          <Link
            href={
              socialMedia?.find((data) => data.url.includes("git"))?.url || ""
            }
            target="_blank"
            className="flex items-center gap-2"
          >
            <div className="text-base md:text-xl cursor-pointer relative before:absolute before:bg-purple before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.35] hover:before:scale-y-100 before:transition-transform before:ease-in-out before:duration-500">
              <span className="relative">View More</span>
            </div>
            <Image
              src="/click.svg"
              alt="view-more-projects-icon"
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </Link>
        </div>
        {/* <div className="bg-black-100 h-4 max-h-10  absolute bottom-2 left-0 right-0"></div> */}
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projects.map((project, i) => (
          <ProjectCard {...project} key={i} variants={cardVariants} />
        ))}
      </motion.div>
    </section>
  );
}

export default Projects;
