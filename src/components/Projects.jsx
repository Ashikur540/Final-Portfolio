import React from 'react';
import { FcBriefcase } from "react-icons/fc";
import Express from "../Asset/Developer logo/express-js-icon.svg";
import Firebase from "../Asset/Developer logo/firebase-svgrepo-com.svg";
import Mongo from "../Asset/Developer logo/mongodb-svgrepo-com.svg";
import Node from "../Asset/Developer logo/node-svgrepo-com.svg";
import REACT from "../Asset/Developer logo/react-2.svg";
import SectionHeader from './Small/SectionHeader';
const Projects = () => {
    const images = [
        REACT, Node, Express, Mongo, Firebase
    ]
    return (
        <section id="PROJECTS" className='container mx-auto mt-8 md:mt-36'>
            <SectionHeader
                title="I work Hard_  " FcBriefcase={FcBriefcase}
                subtitle="Showcasing some of my awesome projects."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                <div className="w-[380px] border-[#ffffff83] border-[1px] h-[460px] rounded-sm bg-project relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] ">
                    {/* <img src="https://ashikonweb.netlify.app/static/media/autohunt%20ss.c026b6d0acf6f16f0795.png" alt="" className="w-full h-full object-cover" /> */}
                    <div className="p-2 absolute left-0 bottom-0 bg-white/20 backdrop-blur-md w-11/12 rounded-sm">
                        <h1 className="text-2xl py-4 font-semibold">Autohunt Automobile Marketplace</h1>
                        <p className="text-sm text-para">Its a common market place where user can buy and sell secondhand cars.</p>
                        <div className="mt-4 flex flex-wrap items-center justify-start gap-4 mx-auto expertise   cursor-pointer">

                            {
                                images.map(img => <img src={img} alt="" className="w-5" />)
                            }
                        </div>
                    </div>
                </div>
                <div className="w-[380px] border-[#ffffff83] border-[1px] h-[460px] rounded-sm bg-project relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] ">
                    {/* <img src="https://ashikonweb.netlify.app/static/media/autohunt%20ss.c026b6d0acf6f16f0795.png" alt="" className="w-full h-full object-cover" /> */}
                    <div className="p-2 absolute left-0 bottom-0 bg-white/20 backdrop-blur-md w-11/12 rounded-sm">
                        <h1 className="text-2xl py-4 font-semibold">Autohunt Automobile Marketplace</h1>
                        <p className="text-sm text-para">Its a common market place where user can buy and sell secondhand cars.</p>
                        <div className="mt-4 flex flex-wrap items-center justify-start gap-4 mx-auto expertise   cursor-pointer">

                            {
                                images.map(img => <img src={img} alt="" className="w-5" />)
                            }
                        </div>
                    </div>
                </div>
                <div className="w-[380px] border-[#ffffff83] border-[1px] h-[460px] rounded-sm bg-project relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] ">
                    {/* <img src="https://ashikonweb.netlify.app/static/media/autohunt%20ss.c026b6d0acf6f16f0795.png" alt="" className="w-full h-full object-cover" /> */}
                    <div className="p-2 absolute left-0 bottom-0 bg-white/20 backdrop-blur-md w-11/12 rounded-sm">
                        <h1 className="text-2xl py-4 font-semibold">Autohunt Automobile Marketplace</h1>
                        <p className="text-sm text-para">Its a common market place where user can buy and sell secondhand cars.</p>
                        <div className="mt-4 flex flex-wrap items-center justify-start gap-4 mx-auto expertise   cursor-pointer">

                            {
                                images.map(img => <img src={img} alt="" className="w-5" />)
                            }
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Projects