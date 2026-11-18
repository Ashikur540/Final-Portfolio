"use client";

import { useState } from "react";
import { useDraggable } from "./useDraggable";
import s from "./desk.module.css";

type Common = { scale: number; draggable: boolean; onClick?: () => void };

/** Ballpoint pen: click it to click the tip in and out, drag it to move it. */
export function Pen({ scale, draggable, onClick }: Common) {
  const [out, setOut] = useState(false);
  const d = useDraggable<HTMLDivElement>({
    scale,
    enabled: draggable,
    onTap: () => {
      setOut((v) => !v);
      onClick?.();
    },
  });
  return (
    <div
      {...d}
      className={`${s.ob} ${draggable ? s.grab : ""} ${s.pen} ${out ? s.penIn : ""}`}
      aria-hidden="true"
      data-desk-object
      data-pen-out={out}
    >
      <span className={s.penGrip} />
      <span className={s.penBody} />
      <span className={s.penTip} />
      <span className={s.penNib} />
      <span className={s.penClip} />
      <span className={s.penButton} />
    </div>
  );
}

export function Sticky({ scale, draggable }: Common) {
  const d = useDraggable<HTMLParagraphElement>({ scale, enabled: draggable });
  return (
    <p {...d} className={`${s.ob} ${draggable ? s.grab : ""} ${s.sticky}`} data-desk-object>
      ship small, ship often
    </p>
  );
}
