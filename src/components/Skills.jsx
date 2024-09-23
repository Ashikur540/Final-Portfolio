import React from 'react';
import { FcEngineering } from "react-icons/fc";
import "react-tooltip/dist/react-tooltip.css";

import { ExpressJS, Figma, Github, Javascript, MongoDB, NodeJS, ReactJS, TailwindCSS, Typescript } from '../assets';
import SkillCardWithIcon from './Small/SkillBlob';



const Skills = () => {

    const skills = [
        // {
        //     name: "HTML",
        //     img: html,
        //     level: "Advance"
        // },
        // {
        //     name: "CSS",
        //     img: CSS,
        //     level: "Advance"
        // },
        {
            name: "Javascript",
            img: Javascript,
            level: "Advance"
        },
        {
            name: "Typescript",
            img: Typescript,
            level: "Moderate"
        },
        {
            name: "React JS",
            img: ReactJS,
            level: "Advance"
        },
        // {
        //     name: "Bootstrap",
        //     img: Bootstrap,
        //     level: "Advance"
        // },
        {
            name: "Tailwind CSS",
            img: TailwindCSS,
            level: "Advance"
        },
        {
            name: "Node js",
            img: NodeJS,
            level: "Moderate"
        },
        {
            name: "Express js",
            img: ExpressJS,
            level: "Beginner"
        },
        {
            name: "Mongo DB",
            img: MongoDB,
            level: "Moderate"
        },
        // {
        //     name: "SASS",
        //     img: SASS,
        //     level: "Moderate"
        // },
        {
            name: "Github",
            img: Github,
            level: "Moderate"
        },
        {
            name: "Figma",
            img: Figma,
            level: "Advance"
        },
    ]


    return (
        <section id="SKILLS" className='container mx-auto mt-8 md:mt-20'>
            <div className="mb-[50px] sm:mb-[50px] flex flex-col items-start md:pl-10 mx-auto"
                data-aos="fade-right" data-aos-duration="1000"
                data-aos-easing="ease-in-cubic"
            >
                <h1 className="text-3xl md:text-[52px] font-semibold text-center my-8 text-white md:text-left md:leading-[4.25rem] w-full">Technologies <br className="hidden md:block" />I have expertise_ <FcEngineering className="inline-block text-4xl animate-spin" /></h1>
                <p className="text-center md:text-left text-para text-lg  ">I know a lot of technologies &amp; Tools, but I have expertise in following</p>
            </div>


            <div className="mt-4 flex flex-wrap items-center justify-center gap-10 mx-auto expertise sm:gap-14  cursor-pointer">
                {
                    skills.map((skill, i) =>
                        <SkillCardWithIcon skill={skill} key={i} />
                    )
                }

            </div>
            {/* <div className="mb-[50px] sm:mb-[50px] flex flex-col items-start md:pl-10 mx-auto">
                <h1 className="text-xl md:text-[52px] font-semibold text-center my-8 text-white md:text-left md:leading-[4.25rem] w-full"> <br className="hidden md:block" />Others technologies_  <FcEngineering className="inline-block text-4xl animate-spin" /></h1>
                <p className="text-center md:text-left text-para text-lg  ">Tools, but I have less experience in following</p>
            </div> */}
            {/* <div className="mt-4 flex flex-wrap items-center justify-center gap-10 mx-auto expertise sm:gap-14  cursor-pointer">
                {
                    familier.map((skill, i) =>
                        <SkillBlob skill={skill} key={i} />
                    )
                }

            </div> */}
        </section>
    )
}

export default Skills