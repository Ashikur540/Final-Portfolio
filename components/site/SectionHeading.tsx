"use client";

import { useInView } from "./useInView";
import s from "./site.module.css";

/** Section title: letters fade in left to right, then the yellow underline draws. */
export function SectionHeading({ title, note }: { title: string; note?: string }) {
  const [ref, inView] = useInView<HTMLHeadingElement>({ margin: "0px 0px -5% 0px" });
  let i = 0;
  const letters = title.split(" ").map((word, w) => (
    <span key={w}>
      {w > 0 && " "}
      <span className={s.word}>
        {word.split("").map((c) => (
          <span key={i} className={s.ch} style={{ "--i": i++ } as React.CSSProperties}>
            {c}
          </span>
        ))}
      </span>
    </span>
  ));
  return (
    <div className={s.sh}>
      <h2 ref={ref} className={inView ? s.lettersIn : ""} style={{ "--n": i } as React.CSSProperties}>
        <span className="sr-only-text">{title}</span>
        <span aria-hidden="true">{letters}</span>
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
