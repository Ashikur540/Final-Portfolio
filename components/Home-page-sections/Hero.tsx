import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { getCurrentAge } from "@/lib/utils";
import { AnimatedToolTip } from "../ui/AnimatedTooltip";
import { CTAButton } from "../ui/CTAButton";
import { FlipWords } from "../ui/Flipwords";
import { Spotlight } from "../ui/Spotlight";
import { useSmoothScrollToSection } from "@/hooks/useSmoothScrollToSection";
import IconScrollDown from "@/assets/icons/IconDoubleArrowDown";
import { BlurFadeEffectWrapper } from "../ui/BlurFadeEffectWarpper";

export const Hero = () => {
	const { handleSmoothScroll } = useSmoothScrollToSection();

	return (
		<section className="pb-20 pt-36" id="hero">
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
				<Spotlight
					className="right-full top-28 h-[60vh] w-[20vw]"
					fill="cyan"
				/>
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

			<AnimatedToolTip tooltipText="🎯New Goal: Contribute to open source">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3 }}
					className="relative z-10"
				>
					<Image
						className="relative rounded-full mx-auto object-cover aspect-square z-10 ring-2 ring-offset-purple ring-offset-2 ring-blue-200"
						src="/my-image-3.jpg"
						alt="my-picture"
						height={180}
						width={180}
					></Image>
				</motion.div>
			</AnimatedToolTip>
			<div className="flex justify-center relative mt-8 mb-20 z-10">
				<div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
					<BlurFadeEffectWrapper delay={0.2}>
						<p className="text-center md:tracking-wider mb-4 text-md md:text-lg lg:text-xl">
							Hi! 👋 I&apos;m Ashikur Rahman
						</p>
					</BlurFadeEffectWrapper>
					<BlurFadeEffectWrapper delay={0.3}>
						<FlipWords
							className="text-center font-bold text-[40px] md:text-5xl lg:text-6xl"
							words={[
								"Frontend Web Developer",
								"MERN Stack Developer",
								"UI-UX Designer",
								"Enthusiastic Learner ",
							]}
						/>
					</BlurFadeEffectWrapper>
					<div className="flex gap-1 justify-center items-center my-4 max-w-screen-md">
						<BlurFadeEffectWrapper delay={0.38}>
							<p className="text-center md:tracking-wider  text-base md:text-md text-zinc-200">
								A {getCurrentAge()} years old Software Engineering graduate from{" "}
								<span className="text-purple font-semibold">Bangladesh</span>,
								driven by a creative mindset and a passion for frontend
								development.
							</p>
						</BlurFadeEffectWrapper>
					</div>

					<AnimatedToolTip
						tooltipText={`hey, Thanks for viewing 🫶. Hope my works will keen your interest`}
						position="bottom"
					>
						<BlurFadeEffectWrapper>
							<Link
								href="#projects"
								onClick={(e) => handleSmoothScroll(e, "#projects")}
							>
								<CTAButton icon={<IconScrollDown />} position="right">
									Explore my work
								</CTAButton>
							</Link>
						</BlurFadeEffectWrapper>
					</AnimatedToolTip>
				</div>
			</div>
		</section>
	);
};
