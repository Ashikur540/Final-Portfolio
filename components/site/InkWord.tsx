"use client";

import { useEffect, useRef, useState } from "react";
import { inkCenterline } from "@/lib/inkTrace";
import { prefersReducedMotion, useInView } from "./useInView";
import s from "./site.module.css";

type Props = {
  text: string;
  /** how long the writing takes */
  ms?: number;
  /** write right away, or when scrolled into view */
  start?: "mount" | "view";
  delay?: number;
  color?: "blue" | "white";
  onDone?: () => void;
  className?: string;
  /** extra decoration drawn inside the word (an underline svg, for example) */
  children?: React.ReactNode;
};

/**
 * Smooth handwriting that is "written" left to right while a pen nib travels
 * along the letters, rising and falling with their shape.
 */
export function InkWord({ text, ms = 1600, start = "mount", delay = 0, color = "blue", onDone, className, children }: Props) {
  const [hostRef, inView] = useInView<HTMLSpanElement>({ margin: "0px 0px -10% 0px", threshold: 0.6 });
  const wRef = useRef<HTMLSpanElement>(null);
  const nibRef = useRef<SVGSVGElement>(null);
  const [armed, setArmed] = useState(false);
  const [done, setDone] = useState(false);
  const [nibOn, setNibOn] = useState(false);
  const ran = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  // timers live outside the effect so a re-render cannot cancel a writing in progress
  const alive = useRef(true);
  const raf = useRef(0);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // take over from the CSS fallback as soon as we are on the page
  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true);
      doneRef.current?.();
      return;
    }
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || done || ran.current) return;
    if (start === "view" && !inView) return;
    ran.current = true;
    window.setTimeout(() => {
      document.fonts.ready.then(() => {
        const w = wRef.current;
        if (!alive.current) return;
        const nib = nibRef.current;
        if (!w || !nib) return;
        const r = w.getBoundingClientRect();
        const W = Math.ceil(r.width);
        const H = Math.ceil(r.height);
        let ys: number[] = [];
        try {
          const cs = getComputedStyle(w);
          const c = document.createElement("canvas");
          c.width = W;
          c.height = H;
          const ctx = c.getContext("2d");
          if (!ctx || !W || !H) throw new Error("no canvas");
          ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
          const m = ctx.measureText(text);
          const base = (H - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
          ctx.fillText(text, 0, base);
          ys = inkCenterline(ctx.getImageData(0, 0, W, H).data, W, H, base - parseFloat(cs.fontSize) * 0.3);
        } catch {
          setDone(true);
          doneRef.current?.();
          return;
        }
        const ox = w.offsetLeft;
        const oy = w.offsetTop;
        const t0 = performance.now();
        setNibOn(true);
        const step = (now: number) => {
          const t = Math.min(1, (now - t0) / ms);
          const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          const px = e * W;
          w.style.clipPath = `inset(-30% ${Math.max(0, (1 - e) * 100)}% -40% -6%)`;
          const y = ys[Math.min(W - 1, Math.floor(px))] || 0;
          nib.style.transform = `translate(${ox + px}px, ${oy + y}px)`;
          if (!alive.current) return;
          if (t < 1) raf.current = requestAnimationFrame(step);
          else {
            w.style.clipPath = "";
            setNibOn(false);
            setDone(true);
            doneRef.current?.();
          }
        };
        raf.current = requestAnimationFrame(step);
      });
    }, delay);
  }, [armed, done, start, inView, ms, delay, text]);

  const nibBody = color === "white" ? "#ffffff" : "#0f1b3d";
  return (
    <span
      ref={hostRef}
      className={[s.ink, armed && s.armed, done && s.done, color === "white" && s.white, className].filter(Boolean).join(" ")}
    >
      <span ref={wRef} className={s.w}>
        {text}
      </span>
      {children}
      <svg ref={nibRef} className={`${s.nib} ${nibOn ? s.nibOn : ""}`} viewBox="0 0 30 30" aria-hidden="true">
        <path d="M2 28l3.6-1 13.4-13.4-2.6-2.6L3 24.4 2 28z" fill={nibBody} />
        <path d="M16.6 10.8l2.6 2.6 4.4-4.4a1.9 1.9 0 0 0 0-2.6 1.9 1.9 0 0 0-2.6 0l-4.4 4.4z" fill="#2546d8" />
      </svg>
    </span>
  );
}
