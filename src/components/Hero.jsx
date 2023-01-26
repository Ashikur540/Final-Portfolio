import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import resume from "../Asset/Ashikur Rahman resume.pdf";

const Hero = ({ textEnter, textLeave }) => {



    return (
        <section id="HERO" className="min-h-fit md:min-h-screen bg-radialBg bg-cover ">
            <div className="pt-28 md:pt-44 px-10 mx-auto container max-w-3xl pb-12 md:pb-20">
                <div className="flex flex-col justify-center items-center" data-aos="zoom-out" data-aos-duration="1000"
                    data-aos-easing="ease-out-cubic">
                    <h1 id="head1" className="text-6xl font-bold text-center my-2"
                        onMouseEnter={textEnter}
                        onMouseLeave={textLeave}
                    >Ashikur Rahman</h1>
                    <h2 className="text-4xl font-bold text-center">
                        <Typewriter
                            words={['Front end developer', 'MERN Web Developer', 'UI designer', 'Learner🤍']}
                            loop={5}
                            cursor
                            cursorStyle='{}'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}

                        />
                    </h2>
                    <h5 className="text-center font-medium text-xl py-4">From Bangladesh &#127463;&#127465; </h5>
                    <p className="text-para text-center mb-8 text-xl">I help turing your imagination into real life solutions.Enhancing your digital experience.&#x1F680;
                    </p>


                    <a href={resume} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500" download='Ashikur Rahman resume'>
                        <svg className="w-5 h-5 mr-2 hover:translate-y-1 duration-200 ease-linear" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        <span className="relative">Download resume</span>
                    </a>

                </div>
            </div>
        </section>
    )
}

export default Hero