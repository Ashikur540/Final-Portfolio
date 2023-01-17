import React from 'react';
import { FcBriefcase } from "react-icons/fc";
import SectionHeader from './Small/SectionHeader';
const Projects = () => {
    return (
        <div className='container mx-auto mt-8 md:mt-36'>
            <SectionHeader
                title="I work Hard_  " FcBriefcase={FcBriefcase}
                subtitle="Showcasing some of my awesome projects."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                <div className="w-[380px] border-2 h-[460px] rounded-sm bg-project relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] ">
                    {/* <img src="https://ashikonweb.netlify.app/static/media/autohunt%20ss.c026b6d0acf6f16f0795.png" alt="" className="w-full h-full object-cover" /> */}
                    <div className="p-2 absolute left-0 bottom-0 bg-white/20 backdrop-blur-md w-11/12">
                        <p className="text-sm text-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat mollitia molestias reprehenderit nihil ad aut similique quasi voluptatem consectetur, itaque est quae perferendis consequuntur minus neque cupiditate atque eaque. At.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Projects