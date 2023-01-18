import React from 'react';
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { FcBriefcase } from "react-icons/fc";
import BOOTSTRAP from "../Asset/Developer logo/bootstrap-5-1.svg";
import CSS from "../Asset/Developer logo/css-3-svgrepo-com.svg";
import Express from "../Asset/Developer logo/express-js-icon.svg";
import Firebase from "../Asset/Developer logo/firebase-svgrepo-com.svg";
import HTML from "../Asset/Developer logo/html-svgrepo-com.svg";
import Mongo from "../Asset/Developer logo/mongodb-svgrepo-com.svg";
import Node from "../Asset/Developer logo/node-svgrepo-com.svg";
import REACT from "../Asset/Developer logo/react-2.svg";
import Tail from "../Asset/Developer logo/tailwind-css-2.svg";
import SectionHeader from './Small/SectionHeader';
const Projects = () => {
    const images = [
        REACT, Tail, Node, Express, Mongo, Firebase
    ]
    const fashion = [
        HTML, CSS, BOOTSTRAP
    ]

    return (
        <section id="PROJECTS" className='container  my-10  md:mt-36 last'>
            <SectionHeader
                title="I work Hard_  " FcBriefcase={FcBriefcase}
                subtitle="Showcasing some of my awesome projects."
            />


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">


                {/* 1 */}
                <div className={`w-[100%] border-[#ffffff83] border-[1px] h-[460px] rounded-md   relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] bg-projectOne text-white mx-auto`}>
                    {/* <img src="https://ashikonweb.netlify.app/static/media/autohunt%20ss.c026b6d0acf6f16f0795.png" alt="" className="w-full h-full object-cover" /> */}
                    <div className={`group p-2 absolute left-4 bottom-4 bg-white/20 backdrop-blur-md w-11/12 rounded-md  hover:duration-300 ease-in-out hover:h-[50%] hover:w-[100%] overflow-hidden hover:left-0 hover:bottom-0 `}>
                        <h1 className="text-2xl py-4 font-semibold">Autohunt Automobile Marketplace</h1>
                        <p className={`text-sm text-para hidden group-hover:block`}>Its a common market place where user can buy and sell secondhand cars.</p>
                        <div className="mt-4 hidden group-hover:flex flex-wrap items-center justify-start gap-4 mx-auto expertise  cursor-pointer">

                            {
                                images.map((img, i) => <img key={i} src={img} alt="" className="w-5" />)
                            }
                        </div>
                        <div className="flex gap-3 py-2">
                            <a target="_blank" href="http://autohunt-f5b1c.web.app" rel="noreferrer" aria-label="live link" ><FaExternalLinkAlt /></a>
                            <a target="_blank" href="https://github.com/Ashikur540/AutoHunt-Resell-MarketPlace-Client-" rel="noreferrer" aria-label="github"><FaGithub /></a>


                        </div>
                    </div>
                </div>
                {/* 1 */}


                {/* 2 */}
                <div className={`w-[100%] border-[#ffffff83] border-[1px] h-[460px] rounded-md  relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] bg-projectTwo text-white mx-auto`}>
                    {/* <img src="https://ashikonweb.netlify.app/static/media/autohunt%20ss.c026b6d0acf6f16f0795.png" alt="" className="w-full h-full object-cover" /> */}
                    <div className={`group p-2 absolute left-4 bottom-4 bg-white/20 backdrop-blur-md w-11/12 rounded-md  hover:duration-300 ease-in-out hover:h-[50%] hover:w-[100%] overflow-hidden hover:left-0 hover:bottom-0 text-black`}>
                        <h1 className="text-2xl py-4 font-semibold">Banglar photographer</h1>
                        <p className={`text-sm  hidden group-hover:block`}>Its a service review website where users can see famous photographers and their services and also can add their revires too.</p>
                        <div className="mt-4 hidden group-hover:flex flex-wrap items-center justify-start gap-4 mx-auto expertise  cursor-pointer">

                            {
                                images.map((img, i) => <img key={i} src={img} alt="" className="w-5" />)
                            }
                        </div>
                        <div className="flex gap-3 py-2">
                            <a target="_blank" href="https://ashikur-photographer.web.app/" rel="noreferrer" aria-label="live link" ><FaExternalLinkAlt /></a>
                            <a target="_blank" href="https://github.com/Ashikur540/Ashikur-Photographer-Client" rel="noreferrer" aria-label="github"><FaGithub /></a>


                        </div>
                    </div>
                </div>
                {/* 2 */}

                {/* 3 */}
                <div className={`w-[100%] border-[#ffffff83] border-[1px] h-[460px] rounded-md  relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] bg-projectThree text-white shadow-black shadow-lg mx-auto`}>

                    <div className={`group p-2 absolute left-4 bottom-4 bg-white/20 backdrop-blur-md w-11/12 rounded-md  hover:duration-300 ease-in-out hover:h-[50%] hover:w-[100%] overflow-hidden hover:left-0 hover:bottom-0 text-black`}>
                        <h1 className="text-2xl py-4 font-semibold">Womens fashion house</h1>
                        <p className={`text-sm  hidden group-hover:block`}>This is just a Fashion cloth outlet website .Its just a clone project i did while learning boostrap.</p>
                        <div className="mt-4 hidden group-hover:flex flex-wrap items-center justify-start gap-4 mx-auto expertise  cursor-pointer">

                            {
                                fashion.map((img, i) => <img key={i} src={img} alt="" className="w-5" />)
                            }
                        </div>
                        <div className="flex gap-3 py-2">
                            <a target="_blank" href="https://ashikur-photographer.web.app/" rel="noreferrer" aria-label="live link" ><FaExternalLinkAlt /></a>
                            <a target="_blank" href="https://github.com/Ashikur540/Ashikur-Photographer-Client" rel="noreferrer" aria-label="github"><FaGithub /></a>


                        </div>
                    </div>
                </div>
                {/* 3 */}
                {/* 4 */}
                <div className={`w-[100%] border-[#ffffff83] border-[1px] h-[460px] rounded-md  relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] bg-projectFour text-white shadow-black shadow-lg mx-auto`}>

                    <div className={`group p-2 absolute left-4 bottom-4 bg-white/20 backdrop-blur-md w-11/12 rounded-md  hover:duration-300 ease-in-out hover:h-[50%] hover:w-[100%] overflow-hidden hover:left-0 hover:bottom-0 text-white`}>
                        <h1 className="text-2xl py-4 font-semibold">Learners Hut</h1>
                        <p className={`text-sm text-para hidden group-hover:block`}>This is an online learning portal where customers may browse numerous category-based online courses and buy them.</p>
                        <div className="mt-4 hidden group-hover:flex flex-wrap items-center justify-start gap-4 mx-auto expertise  cursor-pointer">

                            {
                                images.map((img, i) => <img key={i} src={img} alt="" className="w-5" />)
                            }
                        </div>
                        <div className="flex gap-3 py-2">
                            <a target="_blank" href="https://ashikur-photographer.web.app/" rel="noreferrer" aria-label="live link" ><FaExternalLinkAlt /></a>
                            <a target="_blank" href="https://github.com/Ashikur540/Ashikur-Photographer-Client" rel="noreferrer" aria-label="github"><FaGithub /></a>


                        </div>
                    </div>
                </div>
                {/* 4 */}

            </div>

        </section>
    )
}

export default Projects