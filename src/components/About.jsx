import React from 'react'
import aboutImg from "../Asset/IMG.jpg"

export const About = () => {
    return (
        <section id="about" className="container  mt-10 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <h1 className="text-3xl md:pl-10  md:text-[52px] font-semibold text-center my-8 text-white md:text-left">Introducing my self_
                <img src="https://cdn-icons-png.flaticon.com/512/924/924915.png" alt="" className="inline-block w-10 animate-pulse" />
            </h1>
            <div className="flex  flex-col-reverse items-center justify-between lg:flex-row-reverse">
                <div className="mb-10 lg:max-w-lg lg:pr-5 lg:mb-0 ">
                    <div className="max-w-xl mb-6 flex flex-col items-start px-4 md:px-8 mt-6 md:mt-4 text-para">
                        <div>
                            <p className="inline-block px-0 py-px mb-4 text-xs font-semibold tracking-wider text-sky-400 uppercase rounded-full bg-teal-accent-400">
                                About me
                            </p>
                        </div>
                        <p className="text-base text-para md:text-lg ">
                            Assalamu alikum,&#128512;
                            <br />
                            <span className="text-sky-400 font-semibold text-xl ">I'm Ashikur Rahman.</span> <br />
                            Bogura is where I was born and raised.
                            I'm now studying software engineering at Daffodil International University. <br />

                            My passion has always been creating new things, and coding adds an added spark to that.
                            I first became interested in web development in 2021 when I chose to learn more about it.After then, I became familiar with the MERN stack and worked on various projects.
                            <br />
                            <br />
                            I particularly enjoy watching korean drama series.
                            I also enjoy painting, drawing, and taking pictures.
                            I enjoy keeping things straightforward and simple.

                        </p>
                    </div>

                </div>
                <div className="relative lg:w-1/2">
                    <img
                        className="object-cover w-[80%]  rounded shadow-lg sm:h-96 mx-auto"
                        src={aboutImg}
                        alt="mypic"
                    />
                </div>
            </div>
        </section>
    )
}
