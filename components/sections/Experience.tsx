"use client";

import { useEffect, useRef, useState } from "react";
import { workHistories } from "@/data";
import { Marker } from "@/components/site/Marker";
import { SectionHeading } from "@/components/site/SectionHeading";
import s from "./experience.module.css";

// oldest job first, so the pen line reads like a story
const JOBS = [...workHistories].reverse();
const HIGHLIGHT = /(8,000\+ sites|2,800\+ active installs)/;

function withMarkers(text: string) {
  return text.split(HIGHLIGHT).map((part, i) => (HIGHLIGHT.test(part) ? <Marker key={i}>{part}</Marker> : part));
}

/** A quiet notebook page. A pen line draws down the margin as you scroll and ticks each job. */
export function Experience() {
  const pageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const tickRefs = useRef<(SVGSVGElement | null)[]>([]);
  const [ticked, setTicked] = useState(0);

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
        <SectionHeading title="Experience" note="Three teams so far. Each time, features from idea to launch." />
        <div ref={pageRef} className={s.khata}>
          <span className={s.tape} aria-hidden="true" />
          <svg className={s.penline} aria-hidden="true">
            <line ref={lineRef} x1="8" y1="0" x2="8" y2="0" stroke="#2546d8" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <ol className={s.entries}>
            {JOBS.map((job, i) => (
              <li key={job.company} className={s.entry} data-job>
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
              </li>
            ))}
            <li className={`${s.entry} ${s.next}`} data-job>
              <span className={s.when}>Jan 2027</span>
              <h3>Your team?</h3>
              <div className={s.sign}>
                <i aria-hidden="true" />
                <span>
                  your company here &rarr; <a href="#hello">let&apos;s talk</a>
                </span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
