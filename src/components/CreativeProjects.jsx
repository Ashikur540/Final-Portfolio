import React from 'react';
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { FcBriefcase } from "react-icons/fc";
import arrow from "../Asset/Developer logo/ARROW.png";
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
const CreativeProjects = () => {
    const images = [
        REACT, Tail, Node, Express, Mongo, Firebase
    ]
    const fashion = [
        HTML, CSS, BOOTSTRAP
    ]
    return (
        <section id="PROJECTS" className='container relative my-10  md:mt-36 mb-[100px]'>
            <SectionHeader
                title="I work Hard_  " FcBriefcase={FcBriefcase}
                subtitle="Showcasing some of my awesome projects."
            />
            <img src={arrow} alt="" className="hidden md:block absolute lg:-top-[10%] lg:-right-[10%] lg:w-[13%] xl:-right-[12%] xl:w-[13%]" />
            <div className="flex flex-col md:flex-row w-full gap-14">
                <div className="flex flex-col justify-center gap-8 items-end w-1/2">
                    <div className="w-[70%] border-[#ffffff83] border-[1px] h-[460px] rounded-md   relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] text-white mx-auto mt-8" data-aos="zoom-in-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-easing="ease-in-out"
                    >
                        <div className="w-[100%]   h-full rounded-md   relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] bg-projectOne text-white mx-auto"></div>
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
                    <div className="w-[100%] border-[#ffffff83] border-[1px] h-[460px] rounded-md   relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] text-white mx-auto" data-aos="zoom-in-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-easing="ease-in-out"
                    >
                        <div className="w-[100%]   h-full rounded-md   relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] bg-projectOne text-white mx-auto"></div>
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
                </div>
                <div className="flex flex-col justify-center gap-8 items-start w-1/2">
                    <div className="w-[100%] border-[#ffffff83] border-[1px] h-[460px] rounded-md   relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] text-white mx-auto" data-aos="zoom-in-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-easing="ease-in-out"
                    >
                        <div className="w-[100%]   h-full rounded-md   relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] bg-projectOne text-white mx-auto"></div>
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
                    <div className="w-[100%] border-[#ffffff83] border-[1px] h-[460px] rounded-md   relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] text-white mx-auto" data-aos="zoom-in-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-easing="ease-in-out"
                    >
                        <div className="w-[100%]   h-full rounded-md   relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] bg-projectOne text-white mx-auto"></div>
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
                </div>
            </div>

        </section>
    )
}

export default CreativeProjects