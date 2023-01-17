import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import resume from "../Asset/Ashikur Rahman resume.pdf";
const Hero = () => {

    return (
        <section id="HERO" className="min-h-fit md:min-h-screen bg-radialBg bg-cover ">
            <div className="pt-28 md:pt-64 px-10 mx-auto container max-w-3xl pb-12 md:pb-20">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-6xl font-bold text-center my-2">Ashikur Rahman</h1>
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
                    <h5 className="text-center font-medium text-xl py-4">From Bangladesh </h5>
                    <p className="text-para text-center mb-8 text-xl">I help turing your imagination into real life solutions.Enhancing your digital experience.&#x1F680;
                    </p>


                    <a href={resume} class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500" download='Ashikur Rahman resume'>
                        <svg class="w-5 h-5 mr-2 hover:translate-y-1 duration-200 ease-linear" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        <span class="relative">Download resume</span>
                    </a>

                </div>
            </div>
        </section>
    )
}

export default Hero