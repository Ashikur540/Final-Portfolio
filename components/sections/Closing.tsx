"use client";

import { useRef, useState } from "react";
import { personalInfo, socialMedia } from "@/data";
import { Button } from "@/components/site/Button";
import { InkWord } from "@/components/site/InkWord";
import s from "./notesClosing.module.css";

const link = (name: string) => socialMedia.find((m) => m.name === name)?.url || "#";

/** Navy closing section: "Say hello" written by the pen, and ways to reach Ashik. */
export function Closing() {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const timer = useRef<number>();

  const copy = async () => {
    window.clearTimeout(timer.current);
    let next: "copied" | "manual" = "copied";
    try {
      await navigator.clipboard.writeText(personalInfo.email);
    } catch {
      // clipboard blocked: show the address so it can be copied by hand
      next = "manual";
    }
    setState(next);
    timer.current = window.setTimeout(() => setState("idle"), next === "manual" ? 2500 : 1800);
  };

  return (
    <footer className={s.cover} id="hello">
      <div className="wrap">
        <h2 className={s.h2}>
          <InkWord text="Say hello" ms={1800} start="view" color="white" />
        </h2>
        <p className={s.lead}>Open to full-time roles from January 2027. Remote first, on-site works too for the right team.</p>
        <div className={s.row}>
          <Button onClick={copy} icon={state === "copied" ? "check" : "copy"} onDark done={state === "copied"}>
            <span aria-live="polite">
              {state === "copied" ? "Copied ✓" : state === "manual" ? personalInfo.email : "Copy email"}
            </span>
          </Button>
          <Button href={link("LinkedIn")} variant="line" icon="linkedin" onDark external>
            LinkedIn
          </Button>
          <Button href={link("GitHub")} variant="line" icon="github" onDark external>
            GitHub
          </Button>
          <Button href="/Ashikur_Rahman_Resume_2026.pdf" variant="line" icon="down" iconMove="down" onDark download>
            Resume
          </Button>
        </div>
        <div className={s.foot}>
          <span>Built by hand in React. Photos on my phone.</span>
          <span>© {new Date().getFullYear()} Ashikur Rahman</span>
        </div>
      </div>
    </footer>
  );
}
