"use client";

import { useRef, useState } from "react";
import { personalInfo, socialUrl } from "@/data";
import { Button } from "@/components/site/Button";
import { InkWord } from "@/components/site/InkWord";
import s from "./notesClosing.module.css";


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
    // a blocked clipboard shows the address long enough to copy it by hand
    timer.current = window.setTimeout(() => setState("idle"), next === "manual" ? 6000 : 1800);
  };

  return (
    <footer className={s.cover} id="hello">
      <div className="wrap">
        <h2 className={s.h2}>
          <InkWord text="Say hello" ms={1800} start="view" color="white" />
        </h2>
        <p className={s.lead}>Looking for a full-time frontend or full-stack role. Remote first, on-site works too for the right team.</p>
        <div className={s.row}>
          <span className={s.copyWrap}>
            <Button
              onClick={copy}
              icon={state === "copied" ? "check" : "copy"}
              onDark
              done={state === "copied"}
              ariaLabel={state === "copied" ? "Email copied" : "Copy email"}
            >
              {/* both labels share one spot, so the button keeps the width of the longer one */}
              <span className={s.swap}>
                <span className={state === "copied" ? s.off : undefined}>Copy email</span>
                <span className={state === "copied" ? undefined : s.off}>Copied</span>
              </span>
            </Button>
            {state === "manual" && (
              <span className={s.manual} role="status">
                {personalInfo.email}
              </span>
            )}
            <span className="sr-only-text" aria-live="polite">
              {state === "copied" ? "Email copied" : ""}
            </span>
          </span>
          <Button href={socialUrl("LinkedIn")} variant="line" icon="linkedin" onDark external>
            LinkedIn
          </Button>
          <Button href={socialUrl("GitHub")} variant="line" icon="github" onDark external>
            GitHub
          </Button>
          <Button href="/Ashikur_Rahman_Resume_2026.pdf" variant="line" icon="down" iconMove="down" onDark download>
            Resume
          </Button>
        </div>
        <div className={s.foot}>
          <span>Built with ❤️ by Ashik</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
