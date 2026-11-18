"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { deskPhotos } from "@/data";
import { toBack, toFront } from "@/lib/cycle";
import type { DeskAudio } from "@/lib/deskAudio";
import { prefersReducedMotion } from "@/components/site/useInView";
import type { PhotoNav } from "./Desk";
import s from "./desk.module.css";

const TILT = [-5, 4, -2, 6, -7, 3, -4];
const FLING_MS = 230;

type Props = { scale: number; audio: DeskAudio | null; navRef: React.MutableRefObject<PhotoNav | null> };

/**
 * One pile of photos. Tap the top one, or drag it away, to see the next.
 * The keyboard's arrow keys flip through them too. Holds any number of photos.
 */
export function PhotoStack({ scale, audio, navRef }: Props) {
  const [order, setOrder] = useState(() => deskPhotos.map((_, i) => i));
  const [touched, setTouched] = useState(false);
  const [top, setTop] = useState<{ transform: string; opacity?: number; dragging?: boolean } | null>(null);
  const busy = useRef(false);
  const drag = useRef<{ x: number; y: number; dx: number; dy: number } | null>(null);

  const sendBack = (dx: number, dy: number) => {
    if (busy.current) return;
    busy.current = true;
    setTouched(true);
    audio?.whoosh();
    setTop({ transform: `translate(${dx}px, ${dy}px) rotate(${dx > 0 ? 16 : -16}deg)`, opacity: 0 });
    window.setTimeout(
      () => {
        setOrder((o) => toBack(o));
        setTop(null);
        busy.current = false;
      },
      prefersReducedMotion() ? 0 : FLING_MS,
    );
  };
  const next = () => sendBack(150, -34);
  const prev = () => {
    if (busy.current) return;
    setTouched(true);
    audio?.whoosh();
    setOrder((o) => toFront(o));
  };

  const nav = useRef({ next, prev });
  nav.current = { next, prev };
  useEffect(() => {
    navRef.current = { next: () => nav.current.next(), prev: () => nav.current.prev() };
    return () => {
      navRef.current = null;
    };
  }, [navRef]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (busy.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, dx: 0, dy: 0 };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    d.dx = (e.clientX - d.x) / scale;
    d.dy = (e.clientY - d.y) / scale;
    setTop({ transform: `translate(${d.dx}px, ${d.dy}px) rotate(${-3 + d.dx / 14}deg)`, dragging: true });
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dist = Math.hypot(d.dx, d.dy);
    if (dist < 6) next();
    else if (dist > 70) sendBack(d.dx * 2, d.dy * 2);
    else setTop(null);
  };

  // the browser took the gesture over (a scroll): not a tap, put the photo back
  const onPointerCancel = () => {
    drag.current = null;
    setTop(null);
  };

  const current = deskPhotos[order[0]];

  return (
    <>
      <div
        className={`${s.ob} ${s.stack}`}
        role="button"
        tabIndex={0}
        aria-label={`Photo ${order[0] + 1} of ${deskPhotos.length}: ${current.caption}. Tap or drag for the next one.`}
        data-desk-object
        data-photo={current.caption}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            next();
          }
        }}
      >
        {deskPhotos.map((p, i) => {
          const depth = order.indexOf(i);
          const k = Math.min(depth, 3);
          const isTop = depth === 0;
          const style: React.CSSProperties = {
            zIndex: 30 - depth,
            visibility: depth > 3 ? "hidden" : undefined,
            transform: `rotate(${depth ? TILT[i % TILT.length] : -3}deg) translate(${k * 4}px, ${k * 3}px)`,
          };
          if (isTop && top) {
            style.transform = top.transform;
            if (top.opacity !== undefined) style.opacity = top.opacity;
          }
          return (
            <div key={p.src} className={`${s.ps} ${isTop && top?.dragging ? s.psDragging : ""}`} style={style} aria-hidden={!isTop}>
              {p.standIn && <span className={s.standIn}>stand-in</span>}
              <span className={s.psImg}>
                <Image src={p.src} alt={isTop ? p.caption : ""} fill sizes="160px" style={p.position ? { objectPosition: p.position } : undefined} />
              </span>
              {p.date && (
                <span className={s.date} aria-hidden="true">
                  {p.date}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <span className={s.hint} style={{ left: 72, top: 780, transform: "rotate(-2deg)" }} aria-hidden="true" data-photo-caption>
        {touched ? current.caption : "tap or drag"}
      </span>
    </>
  );
}
