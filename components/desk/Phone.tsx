"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { deskTracks } from "@/data";
import type { DeskAudio } from "@/lib/deskAudio";
import { Icon } from "@/components/site/Icon";
import s from "./desk.module.css";

const seconds = (len: string) => {
  const [m, sec] = len.split(":");
  return Number(m) * 60 + Number(sec);
};
const mmss = (x: number) => `${Math.floor(x / 60)}:${String(Math.floor(x % 60)).padStart(2, "0")}`;
const placeholders = deskTracks.some((t) => !t.src);

/** Phone with a small nasheed player. Nothing plays until the visitor presses play. */
export function Phone({ audio }: { audio: DeskAudio | null }) {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const curRef = useRef(0);

  const start = (i: number) => {
    const n = (i + deskTracks.length) % deskTracks.length;
    curRef.current = n;
    setCur(n);
    setElapsed(0);
    setPlaying(true);
    audio?.play(n, setElapsed, () => start(curRef.current + 1));
  };
  const stop = () => {
    audio?.stop();
    setPlaying(false);
  };
  const pick = (i: number, play: boolean) => {
    if (play) start(i);
    else {
      const n = (i + deskTracks.length) % deskTracks.length;
      curRef.current = n;
      setCur(n);
      setElapsed(0);
    }
  };

  // stop the music when the desk leaves the page
  useEffect(() => () => audio?.stop(), [audio]);

  const track = deskTracks[cur];
  const length = seconds(track.length);

  return (
    <div className={`${s.ob} ${s.ph} ${playing ? s.playing : ""}`} data-desk-object data-playing={playing}>
      <div className={s.phIn}>
        <div className={s.ui}>
          <div className={s.bg} aria-hidden="true">
            <Image src={track.cover} alt="" fill sizes="280px" />
          </div>
          <span className={s.isl} aria-hidden="true" />
          <div className={s.cov} style={{ position: "relative" }}>
            <Image src={track.cover} alt="" fill sizes="132px" />
          </div>
          <div className={s.tt} data-track-title>
            {track.title}
          </div>
          <div className={s.ar}>Desk nasheeds{placeholders ? " · placeholders" : ""}</div>
          <div className={s.bar} aria-hidden="true">
            <i style={{ width: `${Math.min(100, (elapsed / length) * 100)}%` }} />
          </div>
          <div className={s.tm}>
            <span data-elapsed>{mmss(elapsed)}</span>
            <span>{track.length}</span>
          </div>
          <div className={s.ctl}>
            <button type="button" aria-label="Previous track" onClick={() => pick(cur - 1, playing)}>
              <Icon name="prev" />
            </button>
            <button
              type="button"
              className={s.pp}
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => (playing ? stop() : start(cur))}
            >
              <Icon name={playing ? "pause" : "play"} />
            </button>
            <button type="button" aria-label="Next track" onClick={() => pick(cur + 1, playing)}>
              <Icon name="next" />
            </button>
          </div>
          <div className={s.pl}>
            {deskTracks.map((t, i) => (
              <button
                key={t.title}
                type="button"
                aria-current={i === cur ? "true" : "false"}
                aria-label={`${t.title}, ${t.length}`}
                onClick={() => (i === cur && playing ? stop() : start(i))}
              >
                <span className={s.th}>
                  <Image src={t.cover} alt="" fill sizes="26px" />
                </span>
                <span className={s.nm}>{t.title}</span>
                <span className={s.eq} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className={s.len}>{t.length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
