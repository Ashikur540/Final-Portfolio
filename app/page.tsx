import { Banner } from "@/components/site/Banner";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { TopBar } from "@/components/site/TopBar";
import { Hero } from "@/components/sections/Hero";
import { Desk } from "@/components/desk/Desk";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Notes } from "@/components/sections/Notes";
import { Closing } from "@/components/sections/Closing";
import { getPosts } from "@/lib/rss";

// the blog list is rebuilt at most once an hour
export const revalidate = 3600;

export default async function Home() {
  const posts = await getPosts();
  return (
    <SmoothScroll>
      <Banner />
      <TopBar />
      <main>
        <Hero />
        <Desk />
        <Projects />
        <Experience />
        <Notes posts={posts} />
      </main>
      <Closing />
    </SmoothScroll>
  );
}
