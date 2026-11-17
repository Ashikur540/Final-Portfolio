"use client";

import { useInView } from "./useInView";
import s from "./site.module.css";

export function SectionHeading({ title, note }: { title: string; note?: string }) {
  const [ref, inView] = useInView<HTMLHeadingElement>();
  return (
    <div className={s.sh}>
      <h2 ref={ref}>
        {title}
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
          <path
            className={`${s.stroke} ${inView ? s.drawn : ""}`}
            stroke="#ffe14d"
            strokeWidth="8"
            d="M4 12 C 60 6, 130 7, 196 10"
          />
        </svg>
      </h2>
      {note && <p>{note}</p>}
    </div>
  );
}
