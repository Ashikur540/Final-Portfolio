import React from 'react';

const ProjectCard = ({ images, thumb, color, head, subHead }) => {
    console.log(thumb);
    return (
        <div className={`w-[380px] border-[#ffffff83] border-[1px] h-[460px] rounded-sm  relative bg-top bg-no-repeat bg-cover hover:bg-bottom ease-linear duration-[5000ms] bg-${thumb} text-${color}`}>
            {/* <img src="https://ashikonweb.netlify.app/static/media/autohunt%20ss.c026b6d0acf6f16f0795.png" alt="" className="w-full h-full object-cover" /> */}
            <div className={`p-2 absolute left-0 bottom-0 bg-white/20 backdrop-blur-md w-11/12 rounded-sm `}>
                <h1 className="text-2xl py-4 font-semibold">{head}</h1>
                <p className={`text-sm text-${color}`}>{subHead}</p>
                <div className="mt-4 flex flex-wrap items-center justify-start gap-4 mx-auto expertise   cursor-pointer">

                    {
                        images.map((img, i) => <img key={i} src={img} alt="" className="w-5" />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectCard