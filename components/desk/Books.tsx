"use client";

import { useRef, useState } from "react";
import { deskBooks } from "@/data";
import { toBack } from "@/lib/cycle";
import type { DeskAudio } from "@/lib/deskAudio";
import { prefersReducedMotion } from "@/components/site/useInView";
import s from "./desk.module.css";

const TONE = { dark: s.bookDark, red: s.bookRed, cream: s.bookCream } as const;
const TILT = [-4, 3, -2];

/** A pile of books. Tap it and the top book slides out and goes to the bottom. */
export function Books({ audio }: { audio: DeskAudio | null }) {
  const [order, setOrder] = useState(() => deskBooks.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);
  const busy = useRef(false);
  const top = deskBooks[order[0]];

  const next = () => {
    if (busy.current) return;
    busy.current = true;
    audio?.thud();
    setLeaving(true);
    window.setTimeout(
      () => {
        setOrder((o) => toBack(o));
        setLeaving(false);
        busy.current = false;
      },
      prefersReducedMotion() ? 0 : 260,
    );
  };

  return (
    <button
      type="button"
      className={`${s.ob} ${s.books}`}
      aria-label={`Books on my desk. On top: ${top.title} by ${top.author}. Tap for the next one.`}
      data-desk-object
      data-top-book={top.title}
      onClick={next}
    >
      {deskBooks.map((b, i) => {
        const depth = order.indexOf(i);
        const transform =
          depth === 0 && leaving
            ? "translate(-150px, -10px) rotate(-14deg)"
            : `translate(${depth * 7}px, ${depth * 6}px) rotate(${TILT[i % TILT.length]}deg)`;
        return (
          <span
            key={b.title}
            className={`${s.book} ${TONE[b.tone]} ${depth > 0 ? s.under : ""}`}
            style={{ zIndex: 10 - depth, transform }}
            aria-hidden="true"
          >
            <b>{b.title}</b>
            <span className={s.rule} />
            <small>{b.author}</small>
          </span>
        );
      })}
    </button>
  );
}
