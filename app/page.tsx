"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

import { AboutMe } from "@/components/Home-page-sections/About";
import Contact from "@/components/Home-page-sections/Contact";
import { Hero } from "@/components/Home-page-sections/Hero";
import Projects from "@/components/Home-page-sections/Projects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Preloader from "@/components/ui/Preloader";
import { Timeline as WorkHistoryTimeLine } from "@/components/ui/TimeLine";
import { navItems, workHistories } from "@/data";
import Banner from "@/components/Home-page-sections/Banner";

export default function Home() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{loading ? (
				<Preloader onLoadingComplete={() => setLoading(false)} />
			) : (
				<ReactLenis root>
					<Banner />
					<main
						className={`relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 transition-opacity duration-500 ${
							loading ? "opacity-0" : "opacity-100"
						}`}
					>
						<div className="max-w-7xl w-full">
							<FloatingNav navItems={navItems} />
							<Hero />
							<AboutMe />
							<WorkHistoryTimeLine data={workHistories} />
							<Projects />
							<Contact />
						</div>
					</main>
				</ReactLenis>
			)}
		</>
	);
}
