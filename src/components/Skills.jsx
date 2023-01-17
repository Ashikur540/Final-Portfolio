import React from 'react';
import { FcEngineering } from "react-icons/fc";
import "react-tooltip/dist/react-tooltip.css";
import Bootstrap from "../Asset/Developer logo/bootstrap-5-1.svg";
import CSS from "../Asset/Developer logo/css-3-svgrepo-com.svg";
import Express from "../Asset/Developer logo/express-js-icon.svg";
import Figma from "../Asset/Developer logo/figma-svgrepo-com.svg";
import Firebase from "../Asset/Developer logo/firebase-svgrepo-com.svg";
import Github from "../Asset/Developer logo/github-svgrepo-com.svg";
import html from "../Asset/Developer logo/html-svgrepo-com.svg";
import JS from "../Asset/Developer logo/js-svgrepo-com.svg";
import Mongo from "../Asset/Developer logo/mongodb-svgrepo-com.svg";
import Netlify from "../Asset/Developer logo/netlify.svg";
import Node from "../Asset/Developer logo/node-svgrepo-com.svg";
import SASS from "../Asset/Developer logo/sass-svgrepo-com.svg";
import Tailwind from "../Asset/Developer logo/tailwind-css-2.svg";
import Vercel from "../Asset/Developer logo/vercel.svg";
import SkillBlob from './Small/SkillBlob';
const Skills = () => {

    const skills = [
        {
            name: "HTML",
            img: html,
            level: "Advance"
        },
        {
            name: "CSS",
            img: CSS,
            level: "Advance"
        },
        {
            name: "Javascript",
            img: JS,
            level: "Advance"
        },
        {
            name: "Bootstrap",
            img: Bootstrap,
            level: "Advance"
        },
        {
            name: "Tailwind CSS",
            img: Tailwind,
            level: "Advance"
        },
        {
            name: "SASS",
            img: SASS,
            level: "Moderate"
        },
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
    const familier = [
        {
            name: "Node js",
            img: Node,
            level: "Beginner"
        },
        {
            name: "Express js",
            img: Express,
            level: "Beginner"
        },
        {
            name: "Firebase",
            img: Firebase,
            level: "Moderate"
        },
        {
            name: "Mongo DB",
            img: Mongo,
            level: "Beginner"
        },
        {
            name: "Netlify",
            img: Netlify,
            level: "Moderate"
        },
        {
            name: "Vercel",
            img: Vercel,
            level: "Moderate"
        },

    ]

    return (
        <div className='container mx-auto mt-8 md:mt-20'>
            <div class="mb-[50px] sm:mb-[50px] flex flex-col items-start md:pl-10 mx-auto">
                <h1 className="text-3xl md:text-[52px] font-semibold text-center my-8 text-white md:text-left md:leading-[4.25rem] w-full">Technologies <br class="hidden md:block" />I have expertise_ <FcEngineering className="inline-block text-4xl animate-spin" /></h1>
                <p class="text-center md:text-left text-para text-lg  ">I know a lot of technologies &amp; Tools, but I have expertise in following</p>
            </div>


            <div className="mt-4 flex flex-wrap items-center justify-center gap-10 mx-auto expertise sm:gap-14  cursor-pointer">
                {
                    skills.map((skill, i) =>
                        <SkillBlob skill={skill} key={i} />
                    )
                }

            </div>
            <div class="mb-[50px] sm:mb-[50px] flex flex-col items-start md:pl-10 mx-auto">
                <h1 className="text-xl md:text-[52px] font-semibold text-center my-8 text-white md:text-left md:leading-[4.25rem] w-full"> <br class="hidden md:block" />Others technologies_  <FcEngineering className="inline-block text-4xl animate-spin" /></h1>
                <p class="text-center md:text-left text-para text-lg  ">Tools, but I have less experience in following</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-10 mx-auto expertise sm:gap-14  cursor-pointer">
                {
                    familier.map((skill, i) =>
                        <SkillBlob skill={skill} key={i} />
                    )
                }

            </div>
        </div>
    )
}

export default Skills