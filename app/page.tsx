import { Hero } from "@/components/Home-page-sections/Hero";
import { WhyChooseMe } from "@/components/Home-page-sections/WhyChooseMe";
import { FloatingNav } from "@/components/ui/FloatingNav";

export default function Home() {
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
        <WhyChooseMe />
      </div>
    </main>
  );
}
