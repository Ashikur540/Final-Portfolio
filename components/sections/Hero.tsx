"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/site/Button";
import { InkWord } from "@/components/site/InkWord";
import s from "./hero.module.css";

export function Hero() {
  const [underline, setUnderline] = useState(false);
  const [circle, setCircle] = useState(false);

  const written = () => {
    setUnderline(true);
    window.setTimeout(() => setCircle(true), 300);
  };

  return (
    <div className={`wrap ${s.hero}`} id="top">
      <div>
        <h1 className={s.h1}>
          Frontend-focused full&#8209;stack developer. I turn ideas into{" "}
          <InkWord text="working products." ms={2200} delay={350} className={`${s.word} ${s.inkWrap}`} onDone={written}>
            <svg className={s.under} viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
              <path
                className={`${s.stroke} ${underline ? s.drawn : ""}`}
                style={{ "--len": 240 } as React.CSSProperties}
                stroke="#ffe14d"
                strokeWidth="8"
                d="M4 12 C 50 7, 120 6, 196 10"
              />
            </svg>
          </InkWord>
        </h1>
        <p className={s.lead}>
          Design, front end, back end and launch. From a SaaS built from scratch to plugins running on{" "}
          <span className={s.circled}>
            8,000+ sites
            <svg viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true">
              <path
                className={`${s.stroke} ${circle ? s.drawn : ""}`}
                style={{ "--len": 330 } as React.CSSProperties}
                stroke="#2546d8"
                strokeWidth="2"
                d="M14 8 C 40 -2, 100 0, 114 14 C 124 26, 96 38, 58 37 C 22 36, 2 28, 6 17 C 9 9, 26 5, 40 5"
              />
            </svg>
          </span>
          . Based in Dhaka, Bangladesh.
        </p>
        <div className={s.row}>
          <Button href="#work" icon="down" iconMove="down">
            See my work
          </Button>
          <Button href="/Ashikur_Rahman_Resume_2026.pdf" variant="line" icon="down" iconMove="down" download>
            Download resume
          </Button>
        </div>
      </div>
      <div className={s.prints}>
        <figure className={`${s.pr} ${s.b}`}>
          <span className={s.ph}>
            <Image src="/desk/me3.jpg" alt="Ashik at the sea" fill sizes="220px" />
          </span>
          <span className={s.date} aria-hidden="true">
            &apos;24 12 17
          </span>
          <span className={s.slip} aria-hidden="true">
            sea day
          </span>
        </figure>
        <figure className={`${s.pr} ${s.a}`}>
          <span className={s.tape} aria-hidden="true" />
          <span className={s.ph}>
            <Image src="/clicks/1000080446.webp" alt="Ashikur Rahman by the water" fill sizes="280px" priority />
          </span>
          <span className={s.date} aria-hidden="true">
            &apos;26 01 14
          </span>
          <span className={s.slip} aria-hidden="true">
            hi, I&apos;m Ashik
          </span>
        </figure>
      </div>
    </div>
  );
}
