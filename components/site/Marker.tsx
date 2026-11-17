"use client";

import { useInView } from "./useInView";
import s from "./site.module.css";

/** A yellow highlighter sweep that draws when the text scrolls into view. */
export function Marker({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className={`${s.mk} ${inView ? s.mkIn : ""}`} data-marker>
      {children}
    </span>
  );
}
