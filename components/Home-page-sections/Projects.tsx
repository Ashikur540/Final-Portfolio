"use client";
import { projects } from "@/data";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionTitle } from "../ui/SectionTitle";

function Projects() {
  // 2C2C39
  return (
    <section className="py-20">
      <div className=" mb-8 md:mb-10  relative ">
        {/* <h2
          className="text-4xl sm:text-6xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-slate-500 py-8"
          // style={{
          //   WebkitTextFillColor: "transparent !",
          //   WebkitTextStroke: "2px #2C2C39",
          // }}
        >
          My Recent Projects
        </h2> */}
        <SectionTitle className="mb-4">
          My Recent <span className="text-purple">Projects</span>
        </SectionTitle>
        <div className="bg-black-100 h-4 max-h-10  absolute bottom-2 left-0 right-0"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        {projects.map((project, i) => (
          <ProjectCard {...project} key={i} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
