"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { personalInfo, socialMedia } from "@/data";
import { Icon } from "./Icon";
import { prefersReducedMotion } from "./useInView";
import s from "./dock.module.css";

type Mood = "calm" | "love" | "happy" | "laugh" | "shy";
type Poke = "giggle" | "laugh" | "shy";
type Bit = { id: number; text: string; dx: number; rot: number };

// how the note reacts to clicks: it giggles, then laughs, then gets shy if you keep going
const POKE: Record<Poke, { mood: Mood; bits: number; line?: string; calmAfter: number }> = {
  giggle: { mood: "happy", bits: 2, calmAfter: 1600 },
  laugh: { mood: "laugh", bits: 3, line: "hehe, stop it", calmAfter: 1600 },
  shy: { mood: "shy", bits: 0, line: "ok... that's enough", calmAfter: 3200 },
};

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "notes", label: "Notes" },
];

// what the sticky note says (once per visit) and how it looks in each part of the page
const SECTIONS: Record<string, { mood: Mood; line?: string }> = {
  top: { mood: "calm" },
  about: { mood: "calm", line: "go on, touch things" },
  work: { mood: "love", line: "these are live. click one!" },
  experience: { mood: "happy", line: "8,000+ sites, not bad" },
  notes: { mood: "calm", line: "I write here too" },
  hello: { mood: "happy", line: "say hi, I don't bite" },
};

const link = (name: string) => socialMedia.find((m) => m.name === name)?.url || "#";

/** Floating menu at the bottom with a sticky-note buddy that peeks over it, watches the cursor and reacts to each section. */
export function Dock() {
  const dockRef = useRef<HTMLElement>(null);
  const buddyRef = useRef<HTMLButtonElement>(null);
  const items = useRef<Record<string, HTMLElement | null>>({});
  const said = useRef(new Set<string>());
  const sayTimer = useRef(0);
  const [current, setCurrent] = useState("top");
  const [hover, setHover] = useState<{ key: string; tip?: string; mood?: Mood } | null>(null);
  const [say, setSay] = useState<string | null>(null);
  const [x, setX] = useState<number | null>(null);
  const [poke, setPoke] = useState<Poke | null>(null);
  const [bits, setBits] = useState<Bit[]>([]);
  const pokes = useRef(0);
  const calmTimer = useRef(0);
  const bitId = useRef(0);

  const speak = useCallback((line: string) => {
    setSay(line);
    window.clearTimeout(sayTimer.current);
    sayTimer.current = window.setTimeout(() => setSay(null), 2800);
  }, []);

  // scroll-spy: which section sits in the middle of the screen
  useEffect(() => {
    const ids = ["top", ...LINKS.map((l) => l.id), "hello"];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // first visit to a section: the note says its line for a moment
  useEffect(() => {
    const line = SECTIONS[current]?.line;
    if (!line || said.current.has(current)) return;
    said.current.add(current);
    speak(line);
  }, [current, speak]);
  useEffect(
    () => () => {
      window.clearTimeout(sayTimer.current);
      window.clearTimeout(calmTimer.current);
    },
    [],
  );

  // each click: 1-2 giggle, 3-6 laugh, 7+ shy; a short pause calms it down again
  const onPoke = () => {
    const n = ++pokes.current;
    const next: Poke = n >= 7 ? "shy" : n >= 3 ? "laugh" : "giggle";
    const cfg = POKE[next];
    if (next !== poke && cfg.line) speak(cfg.line);
    setPoke(next);
    if (cfg.bits && !prefersReducedMotion()) {
      const fresh = Array.from({ length: cfg.bits }, () => ({
        id: ++bitId.current,
        text: next === "laugh" && Math.random() < 0.35 ? "HA" : "ha",
        dx: Math.round((Math.random() - 0.5) * 96),
        rot: Math.round((Math.random() - 0.5) * 40),
      }));
      setBits((b) => [...b, ...fresh].slice(-14));
      const ids = new Set(fresh.map((f) => f.id));
      window.setTimeout(() => setBits((b) => b.filter((x) => !ids.has(x.id))), 950);
    }
    window.clearTimeout(calmTimer.current);
    calmTimer.current = window.setTimeout(() => {
      pokes.current = 0;
      setPoke(null);
    }, cfg.calmAfter);
  };

  // the note sits over the hovered item, else over the current section, else the middle
  const place = useCallback(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const target = items.current[hover?.key ?? current];
    setX(target ? target.offsetLeft + target.offsetWidth / 2 : dock.offsetWidth / 2);
  }, [hover, current]);
  useLayoutEffect(place, [place]);
  useEffect(() => {
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  // the eyes look toward the cursor
  useEffect(() => {
    let raf = 0;
    let px = 0;
    let py = 0;
    const look = () => {
      raf = 0;
      const b = buddyRef.current;
      if (!b) return;
      const r = b.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 60);
      b.style.setProperty("--ex", `${((dx / d) * 3.2 * k).toFixed(2)}px`);
      b.style.setProperty("--ey", `${((dy / d) * 2.4 * k).toFixed(2)}px`);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(look);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const mood: Mood = (poke && POKE[poke].mood) ?? hover?.mood ?? SECTIONS[current]?.mood ?? "calm";
  const bubble = hover?.tip ?? say;
  // keep the last words while the bubble fades out, so it does not shrink while still visible
  const lastWords = useRef("");
  if (bubble) lastWords.current = bubble;
  const bind = (key: string, tip?: string, m?: Mood) => ({
    ref: (el: HTMLElement | null) => {
      items.current[key] = el;
    },
    onMouseEnter: () => setHover({ key, tip, mood: m }),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover({ key, tip, mood: m }),
    onBlur: () => setHover(null),
  });

  return (
    <nav ref={dockRef} className={s.dock} aria-label="Main" data-dock>
      <button
        type="button"
        ref={buddyRef}
        className={`${s.buddy} ${poke ? s[poke] : ""}`}
        // moved with a transform (not left) so sliding never counts as layout shift
        style={{ translate: x === null ? "0 0" : `${x}px 0`, opacity: x === null ? 0 : 1 }}
        onClick={onPoke}
        aria-label="Poke the sticky note"
        data-mood={mood}
        data-buddy
      >
        <span className={s.note} aria-hidden="true">
          <span className={s.cheeks} />
          <span className={s.eyes}>
            <i />
            <i />
          </span>
        </span>
        <span className={`${s.bubble} ${bubble ? s.show : ""}`} aria-hidden="true" data-bubble>
          {lastWords.current}
        </span>
        {bits.map((b) => (
          <span
            key={b.id}
            className={s.bit}
            style={{ "--dx": `${b.dx}px`, "--rot": `${b.rot}deg` } as React.CSSProperties}
            aria-hidden="true"
            data-bit
          >
            {b.text}
          </span>
        ))}
      </button>

      <div className={s.items}>
        {LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`${s.link} ${current === id ? s.on : ""}`}
            aria-current={current === id ? "true" : undefined}
            {...bind(id)}
          >
            {label}
          </a>
        ))}
        <span className={s.sep} aria-hidden="true" />
        <a className={`${s.icon} ${s.social}`} href={link("LinkedIn")} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" {...bind("li", "LinkedIn")}>
          <Icon name="linkedin" />
        </a>
        <a className={`${s.icon} ${s.social}`} href={link("GitHub")} target="_blank" rel="noopener noreferrer" aria-label="GitHub" {...bind("gh", "GitHub")}>
          <Icon name="github" />
        </a>
        <a className={s.icon} href={`mailto:${personalInfo.email}`} aria-label="Email me" {...bind("mail", "write to me", "happy")}>
          <Icon name="mail" />
        </a>
        <a className={s.resume} href="/Ashikur_Rahman_Resume_2026.pdf" download aria-label="Download resume" {...bind("cv", "grab my resume", "love")}>
          <span className={s.resumeLabel}>Resume</span>
          <Icon name="down" />
        </a>
      </div>
    </nav>
  );
}
