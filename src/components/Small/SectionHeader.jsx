import React from 'react'

const SectionHeader = ({ title, subtitle, FcBriefcase }) => {
    return (
        <>
            <div className="mb-[50px] sm:mb-[50px] flex flex-col items-start md:pl-10 mx-auto" data-aos="fade-right" data-aos-duration="1000"
                data-aos-easing="ease-in-cubic">
                <h1 className="text-xl md:text-[52px] font-semibold text-center my-8 text-white md:text-left md:leading-[4.25rem] w-full">{title} <FcBriefcase className="inline-block text-4xl animate-pulse" /></h1>
                <p className="text-center md:text-left text-para text-lg  ">{subtitle}</p>
            </div>
        </>
    )
}

export default SectionHeader