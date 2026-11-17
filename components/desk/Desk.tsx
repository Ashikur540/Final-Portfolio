"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/site/Button";
import { applyKey } from "@/lib/keyLayouts";
import { createDeskAudio, type DeskAudio } from "@/lib/deskAudio";
import { DeskNote } from "./DeskNote";
import { Keyboard } from "./Keyboard";
import { Laptop } from "./Laptop";
import { Phone } from "./Phone";
import { Attar } from "./Attar";
import { Books } from "./Books";
import { PhotoStack } from "./PhotoStack";
import { Pen, Sticky } from "./PenAndSticky";
import { useDeskScale } from "./useDeskScale";
import s from "./desk.module.css";

export type PhotoNav = { next(): void; prev(): void };

/** "A bit about me": a desk where every object does something. */
export function Desk() {
  const { wrapRef, scale, stacked } = useDeskScale();
  const deskRef = useRef<HTMLDivElement>(null);
  const photoNav = useRef<PhotoNav | null>(null);
  const [typed, setTyped] = useState("");
  const [litCodes, setLitCodes] = useState<ReadonlySet<string>>(() => new Set());
  const [audio, setAudio] = useState<DeskAudio | null>(null);
  const [muted, setMuted] = useState(false);

  // the engine is cheap to create; it makes no sound until the first click or key
  useEffect(() => {
    const quiet = new URLSearchParams(window.location.search).has("nosound");
    const a = quiet ? null : createDeskAudio();
    setAudio(a);
    return () => a?.stop();
  }, []);

  useEffect(() => {
    audio?.setMuted(muted);
  }, [audio, muted]);

  // objects are "placed" on the desk the first time each one scrolls in; CSS runs the drop
  useEffect(() => {
    const els = deskRef.current?.querySelectorAll<HTMLElement>("[data-desk-object]");
    if (!els) return;
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => (el.dataset.placed = ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.animationDelay = `${i * 90}ms`;
            el.dataset.placed = "";
            io.unobserve(el);
          });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const onKey = useCallback((code: string) => {
    if (code === "arrowright") photoNav.current?.next();
    else if (code === "arrowleft") photoNav.current?.prev();
    else setTyped((b) => applyKey(b, code));
  }, []);

  const click = () => audio?.key(false);

  return (
    <section id="about" className={s.section}>
      <div className="wrap">
        <SectionHeading title="A bit about me" note="This is my desk. Everything on it does something." />
        <div ref={wrapRef} className={s.wrap}>
          <div ref={deskRef} className={s.desk} style={{ "--ds": scale } as React.CSSProperties} data-desk>
            <svg className={s.cable} viewBox="0 0 1180 884" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M850 598 C 846 552, 806 524, 808 452 C 812 332, 796 180, 806 -10"
                fill="none"
                stroke="rgba(255,255,255,.16)"
                strokeWidth="2"
              />
            </svg>
            <DeskNote />
            <Laptop typed={typed} litCodes={litCodes} />
            <Phone audio={audio} />
            <Sticky scale={scale} draggable={!stacked} />
            <Attar audio={audio} />
            <PhotoStack scale={scale} audio={audio} navRef={photoNav} />
            <Books audio={audio} />
            <Keyboard deskRef={deskRef} audio={audio} onKey={onKey} onLit={setLitCodes} />
            <Pen scale={scale} draggable={!stacked} onClick={click} />

            <span className={s.hint} style={{ left: 336, top: 560, transform: "rotate(-3deg)" }} aria-hidden="true">
              type something &darr;
            </span>
            <span className={s.hint} style={{ left: 862, top: 502, transform: "rotate(-3deg)" }} aria-hidden="true">
              press play &uarr;
            </span>

            <div className={s.snd}>
              <Button size="sm" variant="line" icon={muted ? "mute" : "volume"} onClick={() => setMuted((m) => !m)} ariaLabel={muted ? "Turn desk sound on" : "Turn desk sound off"}>
                {muted ? "Sound off" : "Sound on"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
