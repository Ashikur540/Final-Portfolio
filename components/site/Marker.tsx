"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "./useInView";
import s from "./site.module.css";

const LEADING_NUMBER = /^([\d,]+)(.*)$/;
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/** A yellow highlighter sweep that draws when the text scrolls into view.
 *  If the text starts with a number ("8,000+ sites"), the number counts up as it draws. */
export function Marker({ children, on }: { children: React.ReactNode; /** draw on this signal instead of on scroll */ on?: boolean }) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const inView = on ?? seen;
  const match = typeof children === "string" ? LEADING_NUMBER.exec(children) : null;
  const final = match ? match[1] : "";
  const target = Number(final.replace(/,/g, ""));
  // the server renders the real number; the browser resets it to 0 and counts up once seen
  const [shown, setShown] = useState(final);

  useEffect(() => {
    if (!target || prefersReducedMotion()) return;
    if (!inView) {
      setShown("0");
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setShown(fmt(target * (1 - (1 - t) ** 3)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className={`${s.mk} ${inView ? s.mkIn : ""}`} data-marker>
      {match ? (
        <>
          <span className={s.count} data-final={final}>
            <span>{shown}</span>
          </span>
          {match[2]}
        </>
      ) : (
        children
      )}
    </span>
  );
}
