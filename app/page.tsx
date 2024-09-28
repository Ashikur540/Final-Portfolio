"use client";
import { useEffect, useState } from "react";

import { AboutMe } from "@/components/Home-page-sections/About";
import Contact from "@/components/Home-page-sections/Contact";
import { Hero } from "@/components/Home-page-sections/Hero";
import Projects from "@/components/Home-page-sections/Projects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Preloader from "@/components/ui/Preloader";
import { Timeline as WorkHistoryTimeLine } from "@/components/ui/TimeLine";
import { workHistories } from "@/data";
import { ReactLenis } from "lenis/react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // This should match the duration in Preloader.js

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis root>
      {/* Keep the content hidden while loading */}
      {loading ? (
        <Preloader onLoadingComplete={() => setLoading(false)} />
      ) : (
        <main
          className={`relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="max-w-7xl w-full">
            <FloatingNav
              navItems={[
                { name: "Home", link: "#" },
                { name: "Projects", link: "#projects" },
                { name: "About", link: "#about" },
                { name: "Contact", link: "#contact" },
              ]}
            />
            <Hero />
            <AboutMe />
            <WorkHistoryTimeLine data={workHistories} />
            <Projects />
            <Contact />
          </div>
        </main>
      )}
    </ReactLenis>
  );
}
