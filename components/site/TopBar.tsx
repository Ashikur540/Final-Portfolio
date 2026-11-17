"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/data";
import { Button } from "./Button";
import s from "./chrome.module.css";

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "notes", label: "Notes" },
];

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`${s.top} ${scrolled ? s.scrolled : ""}`}>
      <div className={`wrap ${s.row}`}>
        <a className={s.who} href="#top">
          Ashikur Rahman
        </a>
        <nav className={s.nav} aria-label="Main">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={current === id ? s.on : undefined}
              aria-current={current === id ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <span className={s.spacer} />
        <span className={s.avail}>
          <i aria-hidden="true" />
          Open to roles from Jan 2027
        </span>
        <Button href={`mailto:${personalInfo.email}`} size="sm" icon="mail" iconMove="right">
          Email me
        </Button>
      </div>
    </header>
  );
}
