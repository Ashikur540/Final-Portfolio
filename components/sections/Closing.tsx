"use client";

import { useRef, useState } from "react";
import { bookingUrl, personalInfo, socialUrl } from "@/data";
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
        {/* one clear action; the menu already carries resume, and these small links keep phones covered */}
        <div className={s.row}>
          <Button href={bookingUrl} icon="ne" iconMove="ne" onDark external>
            Schedule a call
          </Button>
        </div>
        <p className={s.via}>booking runs on Timetics, a product I work on</p>
        <p className={s.alt}>
          or{" "}
          <span className={s.copyWrap}>
            <button type="button" className={s.textBtn} onClick={copy} aria-label={state === "copied" ? "Email copied" : "Copy my email"}>
              {/* both labels share one spot, so the line never shifts */}
              <span className={s.swap}>
                <span className={state === "copied" ? s.off : undefined}>copy my email</span>
                <span className={state === "copied" ? undefined : s.off}>email copied</span>
              </span>
            </button>
            {state === "manual" && (
              <span className={s.manual} role="status">
                {personalInfo.email}
              </span>
            )}
            <span className="sr-only-text" aria-live="polite">
              {state === "copied" ? "Email copied" : ""}
            </span>
          </span>
          <span aria-hidden="true"> · </span>
          <a href={socialUrl("LinkedIn")} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <span aria-hidden="true"> · </span>
          <a href={socialUrl("GitHub")} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
        <div className={s.foot}>
          <span>Built with ❤️ by Ashik</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
