"use client";

import { useEffect, useRef, useState } from "react";
import { jobMoments, workHistories } from "@/data";
import { Marker } from "@/components/site/Marker";
import { InkWord } from "@/components/site/InkWord";
import { SectionHeading } from "@/components/site/SectionHeading";
import { JobPrint } from "./JobPrint";
import s from "./experience.module.css";

// oldest job first, so the pen line reads like a story
const JOBS = [...workHistories].reverse();
// one highlight per job, so every row has one thing that catches the eye
const HIGHLIGHT = /(in one month|from Figma to launch|8,000\+ sites|2,800\+ active installs)/;

function withMarkers(text: string) {
  return text.split(HIGHLIGHT).map((part, i) => (HIGHLIGHT.test(part) ? <Marker key={i}>{part}</Marker> : part));
}

/** A quiet notebook page. A pen line draws down the margin as you scroll and ticks each job. */
export function Experience() {
  const pageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const tickRefs = useRef<(SVGSVGElement | null)[]>([]);
  const [ticked, setTicked] = useState(0);
  // which row is hovered or focused (its photos swap while it is)
  const [hot, setHot] = useState(-1);
  // "let's talk" is highlighted once the pen has written "Your team?"
  const [wrote, setWrote] = useState(false);
  const rowEvents = (i: number) => ({
    onMouseEnter: () => setHot(i),
    onMouseLeave: () => setHot(-1),
    onFocus: () => setHot(i),
    onBlur: () => setHot(-1),
  });

  useEffect(() => {
    const page = pageRef.current;
    const line = lineRef.current;
    if (!page || !line) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = page.getBoundingClientRect();
      const h = r.height - 88;
      const p = reduce ? 1 : Math.max(0, Math.min(1, (window.innerHeight * 0.65 - r.top) / h));
      line.setAttribute("y2", (p * h).toFixed(1));
      let n = 0;
      tickRefs.current.forEach((t) => {
        if (t && p * h > t.getBoundingClientRect().top - r.top - 44 + 10) n++;
      });
      setTicked((prev) => Math.max(prev, n));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="experience" className={s.section}>
      <div className="wrap">
        <SectionHeading title="Experience" note="Three teams in 3+ years. At each one I took features from idea to launch." />
        <div ref={pageRef} className={s.khata}>
          <span className={s.tape} aria-hidden="true" />
          <svg className={s.penline} aria-hidden="true">
            <line ref={lineRef} x1="8" y1="0" x2="8" y2="0" stroke="#2546d8" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <ol className={s.entries}>
            {JOBS.map((job, i) => (
              <li key={job.company} className={s.entry} data-job {...rowEvents(i)}>
                <span className={s.when}>{job.yearLabel}</span>
                <svg
                  ref={(el) => {
                    tickRefs.current[i] = el;
                  }}
                  className={`${s.tick} ${i < ticked ? s.tickOn : ""}`}
                  viewBox="0 0 30 30"
                  aria-hidden="true"
                  data-tick={i < ticked}
                >
                  <path stroke="#2546d8" strokeWidth="2.6" d="M5 16 L12 23 L26 6" />
                </svg>
                <h3>
                  {job.name} <small>· {job.title}</small>
                </h3>
                <span className={s.note}>{job.note}</span>
                <p>{withMarkers(job.summary)}</p>
                {jobMoments[job.name] && <JobPrint photos={jobMoments[job.name]} active={hot === i} label={job.name} />}
              </li>
            ))}
            <li className={`${s.entry} ${s.next}`} data-job {...rowEvents(JOBS.length)}>
              <span className={s.when}>Jan 2027</span>
              <h3>
                <InkWord text="Your team?" start="view" ms={1100} onDone={() => setWrote(true)} />
              </h3>
              <div className={s.sign}>
                <i aria-hidden="true" />
                <span>
                  your company here &rarr;{" "}
                  <Marker on={wrote}>
                    <a href="#hello">let&apos;s talk</a>
                  </Marker>
                </span>
              </div>
              <JobPrint photos={[{ caption: "your team photo here?" }]} active={false} label="Your team" emptyText="you?" />
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
