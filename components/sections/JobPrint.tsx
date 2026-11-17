"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { JobMoment } from "@/data";
import { prefersReducedMotion } from "@/components/site/useInView";
import s from "./experience.module.css";

type Props = {
  photos: JobMoment[];
  /** the row is hovered or focused: several photos swap every 1.5 seconds */
  active: boolean;
  label: string;
  /** text inside an empty frame */
  emptyText?: string;
};

/** A taped print beside a job row. Appears on hover on desktop, sits inline on phones. */
export function JobPrint({ photos, active, label, emptyText = "photo coming" }: Props) {
  const [i, setI] = useState(0);
  const many = photos.length > 1;
  const next = () => setI((n) => (n + 1) % photos.length);

  useEffect(() => {
    if (!active || !many || prefersReducedMotion()) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % photos.length), 1500);
    return () => window.clearInterval(t);
  }, [active, many, photos.length]);

  const body = (
    <>
      <span className={s.ptape} aria-hidden="true" />
      <span className={s.frames}>
        {photos.map((p, k) => (
          <span key={k} className={`${s.frame} ${k === i ? s.cur : ""}`} aria-hidden={k !== i}>
            {p.src ? (
              <Image src={p.src} alt={p.alt || ""} fill sizes="240px" />
            ) : (
              <span className={s.empty} aria-hidden="true">
                {emptyText}
              </span>
            )}
            <span className={s.cap}>{p.caption}</span>
          </span>
        ))}
      </span>
    </>
  );

  // a tap or click moves to the next photo when there is more than one
  return many ? (
    <button type="button" className={s.print} onClick={next} aria-label={`${label}: next photo`} data-print>
      {body}
    </button>
  ) : (
    <span className={s.print} data-print>
      {body}
    </span>
  );
}
