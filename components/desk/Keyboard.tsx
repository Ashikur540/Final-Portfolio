"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DESK_ROWS } from "@/lib/keyLayouts";
import type { DeskAudio } from "@/lib/deskAudio";
import s from "./desk.module.css";

const TONE = { mod: s.kMod, accent: s.kAccent, enter: s.kEnter } as const;

// every key gets an id "row-col" so the two shift keys are separate keys
const KEYS = DESK_ROWS.flatMap((row, r) => row.map((k, c) => ({ ...k, id: `${r}-${c}` })));
// physical keys whose default action we take over while the desk is active
const SWALLOW = new Set([" ", "backspace", "'", "/", "arrowleft", "arrowright"]);

type Props = {
  deskRef: React.RefObject<HTMLElement>;
  audio: DeskAudio | null;
  onKey(code: string): void;
  onLit(codes: ReadonlySet<string>): void;
};

/**
 * The cream mechanical keyboard. Click its keys, or type on your own keyboard while
 * the pointer is over the desk (or focus is inside it).
 */
export function Keyboard({ deskRef, audio, onKey, onLit }: Props) {
  const [down, setDown] = useState<ReadonlySet<string>>(() => new Set());
  const downRef = useRef(down);
  const physical = useRef(new Map<string, string>()); // physical key -> key id
  const ownRef = useRef<HTMLDivElement>(null);
  const cb = useRef({ audio, onKey, onLit });
  cb.current = { audio, onKey, onLit };

  const update = (next: Set<string>) => {
    downRef.current = next;
    setDown(next);
    cb.current.onLit(new Set(KEYS.filter((k) => next.has(k.id)).map((k) => k.code)));
  };

  const press = useCallback((id: string) => {
    if (downRef.current.has(id)) return;
    const key = KEYS.find((k) => k.id === id);
    if (!key) return;
    update(new Set(downRef.current).add(id));
    cb.current.audio?.key(key.code === " ");
    cb.current.onKey(key.code);
  }, []);

  const release = useCallback((id: string) => {
    if (!downRef.current.has(id)) return;
    const next = new Set(downRef.current);
    next.delete(id);
    update(next);
    cb.current.audio?.key(false, true);
  }, []);

  useEffect(() => {
    const active = () => {
      const desk = deskRef.current;
      if (!desk || !desk.offsetParent) return false;
      return desk.matches(":hover") || desk.contains(document.activeElement);
    };
    const onDown = (e: KeyboardEvent) => {
      if (!active() || e.metaKey || e.ctrlKey || e.altKey || e.key === "Tab") return;
      const t = e.target as HTMLElement | null;
      // Space / Enter on a button or link inside the desk should press that button
      const isControl = !!t?.closest?.("button, a, input, textarea, [role=button]") && t !== ownRef.current;
      if (isControl && deskRef.current?.contains(t) && (e.key === " " || e.key === "Enter")) return;
      const code = e.key.toLowerCase();
      const matches = KEYS.filter((k) => k.code === code);
      if (!matches.length) return;
      if (SWALLOW.has(code)) e.preventDefault();
      if (e.repeat) return;
      const key = matches.find((k) => !downRef.current.has(k.id)) || matches[0];
      physical.current.set(e.code || code, key.id);
      press(key.id);
    };
    const onUp = (e: KeyboardEvent) => {
      const id = physical.current.get(e.code || e.key.toLowerCase());
      if (id) {
        physical.current.delete(e.code || e.key.toLowerCase());
        release(id);
      }
    };
    const releaseAllPointer = () => {
      const held = new Set(physical.current.values());
      downRef.current.forEach((id) => !held.has(id) && release(id));
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("pointerup", releaseAllPointer);
    window.addEventListener("pointercancel", releaseAllPointer);
    window.addEventListener("blur", releaseAllPointer);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("pointerup", releaseAllPointer);
      window.removeEventListener("pointercancel", releaseAllPointer);
      window.removeEventListener("blur", releaseAllPointer);
    };
  }, [deskRef, press, release]);

  return (
    <div
      ref={ownRef}
      className={`${s.ob} ${s.kb}`}
      tabIndex={0}
      role="group"
      aria-label="Keyboard. Click the keys, or point at the desk and type on your own keyboard. The arrow keys flip the photos."
      data-desk-object
    >
      <div className={s.plate} aria-hidden="true">
        {DESK_ROWS.map((row, r) => (
          <div key={r} className={s.r}>
            {row.map((k, c) => {
              const id = `${r}-${c}`;
              return (
                <div
                  key={id}
                  className={[s.k, k.tone && TONE[k.tone], down.has(id) && s.down].filter(Boolean).join(" ")}
                  style={{ "--u": k.units } as React.CSSProperties}
                  data-k={k.code}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    ownRef.current?.focus({ preventScroll: true });
                    press(id);
                  }}
                >
                  <span>{k.label}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
