"use client";
import { useEffect, useState } from "react";

import { AboutMe } from "@/components/Home-page-sections/About";
import { Hero } from "@/components/Home-page-sections/Hero";
import Projects from "@/components/Home-page-sections/Projects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Preloader from "@/components/ui/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // This should match the duration in Preloader.js

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
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
        <Projects />
      </div>
    </main>
  );
}
