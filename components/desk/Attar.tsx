"use client";

import { useState } from "react";
import type { DeskAudio } from "@/lib/deskAudio";
import s from "./desk.module.css";

/** Small Arabic-style attar bottle (octagonal glass, gold lattice, fluted dome cap). Tap for a wisp of scent. */
export function Attar({ audio }: { audio: DeskAudio | null }) {
  const [puffs, setPuffs] = useState(0);
  return (
    <button
      type="button"
      className={`${s.ob} ${s.attar} ${puffs ? s.puff : ""}`}
      aria-label="A small bottle of attar. Tap it."
      data-desk-object
      data-puffs={puffs}
      onClick={() => {
        setPuffs((n) => n + 1);
        audio?.puff();
      }}
    >
      <svg viewBox="0 0 60 170" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="attarGold" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#6b4a08"/><stop offset=".12" stopColor="#c9962a"/><stop offset=".28" stopColor="#fff2b0"/><stop offset=".42" stopColor="#e0b040"/>
            <stop offset=".6" stopColor="#a87412"/><stop offset=".78" stopColor="#f6d776"/><stop offset=".9" stopColor="#b98a1e"/><stop offset="1" stopColor="#6b4a08"/>
          </linearGradient>
          <linearGradient id="attarEdge" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#8a6010"/><stop offset=".45" stopColor="#fff0b0"/><stop offset="1" stopColor="#a87412"/></linearGradient>
          <linearGradient id="attarGlass" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,.5)"/><stop offset=".25" stopColor="rgba(196,218,236,.2)"/><stop offset=".5" stopColor="rgba(255,255,255,.42)"/><stop offset=".8" stopColor="rgba(160,186,208,.24)"/><stop offset="1" stopColor="rgba(255,255,255,.45)"/>
          </linearGradient>
          <linearGradient id="attarOil" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="rgba(214,150,52,.72)"/><stop offset="1" stopColor="rgba(140,78,14,.86)"/></linearGradient>
          <pattern id="attarLat" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.75" fill="none" stroke="#f0cc62" strokeWidth=".95"/><circle cx="0" cy="0" r=".6" fill="#b98a1e"/><circle cx="5" cy="5" r=".6" fill="#b98a1e"/></pattern>
        </defs>
        {/* cap: gem, finial, fluted dome, beads, collar */}
        <g transform="translate(0 19.8) scale(1 .68)">
        <circle cx="30" cy="4.6" r="2.7" fill="#f4f9ff" stroke="#b9c4d2" strokeWidth=".6"/><circle cx="29.2" cy="3.8" r=".9" fill="#fff"/>
        <ellipse cx="30" cy="9.6" rx="4.8" ry="3" fill="url(#attarGold)"/>
        <rect x="27.4" y="11.5" width="5.2" height="4" fill="url(#attarGold)"/>
        <path d="M30 14 C 22 20, 9 30, 9 44 C 9 52, 13 57, 16 60 L44 60 C 47 57, 51 52, 51 44 C 51 30, 38 20, 30 14 Z" fill="url(#attarGold)"/>
        <g fill="none" strokeLinecap="round"><path d="M30 14 C 20.4 22, 10.0 32, 10.0 44 S 13.2 57, 15.6 60" stroke="rgba(92,60,0,.6)" strokeWidth=".9"/><path d="M30 14 C 20.4 22, 10.0 32, 10.0 44 S 13.2 57, 15.6 60" stroke="rgba(255,250,214,.85)" strokeWidth=".8" transform="translate(1.3 0)"/><path d="M30 14 C 24.0 22, 17.5 32, 17.5 44 S 19.5 57, 21.0 60" stroke="rgba(92,60,0,.6)" strokeWidth=".9"/><path d="M30 14 C 24.0 22, 17.5 32, 17.5 44 S 19.5 57, 21.0 60" stroke="rgba(255,250,214,.85)" strokeWidth=".8" transform="translate(1.3 0)"/><path d="M30 14 C 27.6 22, 25.0 32, 25.0 44 S 25.8 57, 26.4 60" stroke="rgba(92,60,0,.6)" strokeWidth=".9"/><path d="M30 14 C 27.6 22, 25.0 32, 25.0 44 S 25.8 57, 26.4 60" stroke="rgba(255,250,214,.85)" strokeWidth=".8" transform="translate(1.3 0)"/><path d="M30 14 C 32.4 22, 35.0 32, 35.0 44 S 34.2 57, 33.6 60" stroke="rgba(92,60,0,.6)" strokeWidth=".9"/><path d="M30 14 C 32.4 22, 35.0 32, 35.0 44 S 34.2 57, 33.6 60" stroke="rgba(255,250,214,.85)" strokeWidth=".8" transform="translate(-1.3 0)"/><path d="M30 14 C 36.0 22, 42.5 32, 42.5 44 S 40.5 57, 39.0 60" stroke="rgba(92,60,0,.6)" strokeWidth=".9"/><path d="M30 14 C 36.0 22, 42.5 32, 42.5 44 S 40.5 57, 39.0 60" stroke="rgba(255,250,214,.85)" strokeWidth=".8" transform="translate(-1.3 0)"/><path d="M30 14 C 39.6 22, 50.0 32, 50.0 44 S 46.8 57, 44.4 60" stroke="rgba(92,60,0,.6)" strokeWidth=".9"/><path d="M30 14 C 39.6 22, 50.0 32, 50.0 44 S 46.8 57, 44.4 60" stroke="rgba(255,250,214,.85)" strokeWidth=".8" transform="translate(-1.3 0)"/></g>
        <path d="M13 50 C 20 56, 40 56, 47 50" fill="none" stroke="rgba(92,60,0,.35)" strokeWidth="1.2"/>
        <g fill="#f6d776" stroke="#8a6010" strokeWidth=".4"><circle cx="16.0" cy="62" r="1.35"/><circle cx="19.5" cy="62" r="1.35"/><circle cx="23.0" cy="62" r="1.35"/><circle cx="26.5" cy="62" r="1.35"/><circle cx="30.0" cy="62" r="1.35"/><circle cx="33.5" cy="62" r="1.35"/><circle cx="37.0" cy="62" r="1.35"/><circle cx="40.5" cy="62" r="1.35"/><circle cx="44.0" cy="62" r="1.35"/></g>
        </g>
        <rect x="15" y="64" width="30" height="12" rx="1.6" fill="url(#attarGold)"/>
        <path d="M15 66.2h30M15 73.8h30" stroke="rgba(92,60,0,.55)" strokeWidth=".7"/>
        <rect x="17.5" y="76" width="25" height="2.4" fill="#4d3505"/>
        {/* shoulder */}
        <path d="M17 78 L43 78 L54.5 91 L5.5 91 Z" fill="url(#attarGold)"/>
        <path d="M19 78 L18 91 M41 78 L42 91" stroke="rgba(92,60,0,.5)" strokeWidth=".7"/>
        {/* glass body with oil, three visible faces */}
        <rect x="6" y="90.5" width="48" height="66" fill="rgba(20,30,60,.35)"/>
        <rect x="7" y="116" width="46" height="40" fill="url(#attarOil)"/>
        <path d="M7 116 h46" stroke="rgba(255,236,190,.8)" strokeWidth=".8"/>
        <rect x="6" y="90.5" width="48" height="66" fill="url(#attarGlass)"/>
        <rect x="6" y="90.5" width="12" height="66" fill="rgba(10,18,40,.22)"/><rect x="42" y="90.5" width="12" height="66" fill="rgba(10,18,40,.16)"/>
        <rect x="22.5" y="96" width="15" height="55" rx="7.5" fill="url(#attarLat)" stroke="#e9c45a" strokeWidth=".9"/>
        <rect x="9.6" y="98" width="5.4" height="51" rx="2.7" fill="url(#attarLat)" stroke="#d9b24a" strokeWidth=".7"/>
        <rect x="45" y="98" width="5.4" height="51" rx="2.7" fill="url(#attarLat)" stroke="#d9b24a" strokeWidth=".7"/>
        <g fill="url(#attarEdge)"><rect x="4.6" y="90" width="3" height="67"/><rect x="16.8" y="90" width="2.6" height="67"/><rect x="40.6" y="90" width="2.6" height="67"/><rect x="52.4" y="90" width="3" height="67"/></g>
        <rect x="20.4" y="93" width="1.1" height="60" fill="rgba(255,255,255,.75)"/><rect x="38.6" y="100" width=".8" height="44" fill="rgba(255,255,255,.4)"/>
        {/* base */}
        <path d="M5 156 L55 156 L50.5 167 L9.5 167 Z" fill="url(#attarGold)"/>
        <path d="M5 156.4h50" stroke="rgba(255,246,200,.9)" strokeWidth=".7"/><path d="M9.5 167h41" stroke="#4d3505" strokeWidth="1"/>
      </svg>
      {/* key changes restart the scent animation on every tap */}
      <span key={`a${puffs}`} className={s.sc} />
      <span key={`b${puffs}`} className={s.sc} />
      <span key={`c${puffs}`} className={s.sc} />
    </button>
  );
}
