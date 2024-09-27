import Image from "next/image";
import { CTAButton } from "../ui/CTAButton";
import { FlipWords } from "../ui/Flipwords";
import { Spotlight } from "../ui/Spotlight";

export const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      {/* Spotlight effect */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen animate-ping"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* grid bg */}
      <div
        className="h-[60vh] w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <img
        className="relative size-[62px] rounded-full mx-auto object-cover"
        src="/me.jpg"
        alt="Avatar"
      ></img>
      <div className="flex justify-center relative mt-8 mb-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="text-center md:tracking-wider mb-4 text-md md:text-lg lg:text-xl">
            Hi! I&apos;m Ashikur Rahman
          </p>
          <FlipWords
            className="text-center font-bold text-[40px] md:text-5xl lg:text-6xl"
            words={[
              "Frontend Web Developer",
              "MERN Stack Developer",
              "UI-UX Designer",
              "Enthusiastic Learner ",
            ]}
          />
          <div className="flex gap-1 justify-center items-center my-4">
            <p className="text-center md:tracking-wider  text-base md:text-md ">
              A passionate developer serving over 2 years from Bangladesh
            </p>
            <Image
              src="https://flagsapi.com/BD/shiny/32.png"
              alt="country-flag"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>

          <a href="#about">
            <CTAButton>Explore my work</CTAButton>
          </a>
        </div>
      </div>
    </div>
  );
};
