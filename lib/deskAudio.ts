import { deskTracks } from "../data/index.ts";
import type { DeskTrack } from "../data/index.ts";

export type DeskAudio = {
  /** linear-switch key sound; deep = space bar; up = key release */
  key(deep: boolean, up?: boolean): void;
  /** photo swap */
  whoosh(): void;
  /** book moved */
  thud(): void;
  /** attar bottle */
  puff(): void;
  play(track: number, onTick: (elapsedSec: number) => void, onEnd: () => void): void;
  stop(): void;
  setMuted(muted: boolean): void;
};

type Options = { Ctor?: typeof AudioContext; AudioEl?: typeof Audio; tracks?: DeskTrack[] };

const VOLUME = 0.6;
const note = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
const seconds = (len: string) => {
  const [m, s] = len.split(":");
  return Number(m) * 60 + Number(s);
};

/**
 * Every desk sound, made in the browser with Web Audio (nothing to download).
 * Returns null when the browser has no Web Audio; the desk then works silently.
 * The audio context is only created on the first sound, which always follows a
 * click or key press, so browsers allow it.
 */
export function createDeskAudio({ Ctor, AudioEl, tracks = deskTracks }: Options = {}): DeskAudio | null {
  const g = globalThis as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext; Audio?: typeof Audio };
  const Context = Ctor || g.AudioContext || g.webkitAudioContext;
  if (!Context) return null;
  const AudioContextClass: typeof AudioContext = Context;
  const AudioFile = AudioEl || g.Audio;

  let ctx: AudioContext | null = null;
  let master: GainNode;
  let out: AudioNode;
  let noiseBuf: AudioBuffer | null = null;
  let muted = false;

  function ac(): AudioContext {
    if (!ctx) {
      ctx = new AudioContextClass();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : VOLUME;
      master.connect(ctx.destination);
      out = master;
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  }

  function tone(f: number, t: number, d: number, type: OscillatorType, gain: number, f2?: number) {
    const c = ac();
    const o = c.createOscillator();
    const v = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    v.gain.setValueAtTime(0.0001, t);
    v.gain.exponentialRampToValueAtTime(gain, t + Math.min(0.02, d / 4));
    v.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(v);
    v.connect(out);
    o.start(t);
    o.stop(t + d + 0.02);
  }

  function noise(t: number, d: number, gain: number, freq: number, q = 1, type: BiquadFilterType = "bandpass") {
    const c = ac();
    if (!noiseBuf) {
      noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate);
      const a = noiseBuf.getChannelData(0);
      for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1;
    }
    const src = c.createBufferSource();
    const f = c.createBiquadFilter();
    const v = c.createGain();
    src.buffer = noiseBuf;
    src.loop = true;
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    v.gain.setValueAtTime(gain, t);
    v.gain.exponentialRampToValueAtTime(0.0001, t + d);
    src.connect(f);
    f.connect(v);
    v.connect(out);
    src.start(t, Math.random() * 0.5);
    src.stop(t + d + 0.02);
  }

  const pad = (notes: number[], t: number, d: number, gain: number) =>
    notes.forEach((n) => {
      tone(note(n), t, d, "sine", gain);
      tone(note(n) * 1.004, t, d, "sine", gain * 0.7);
    });

  // calm, drum-free placeholder loops, used until a track has a real file
  const LOOPS: { bpm: number; step(i: number, t: number, s: number): void }[] = [
    {
      bpm: 60,
      step(i, t, s) {
        if (i % 32 === 0) pad([[50, 57, 62], [48, 55, 60], [46, 53, 58], [45, 52, 57]][Math.floor(i / 32) % 4], t, s * 31, 0.07);
        const m = [62, null, null, 63, null, 66, null, null, 67, null, 66, null, 63, null, 62, null][i % 16];
        if (m != null && i % 32 >= 8) tone(note(m + 12), t, s * 3.5, "sine", 0.045);
      },
    },
    {
      bpm: 54,
      step(i, t, s) {
        if (i % 32 === 0) pad([[45, 52, 57], [43, 50, 55], [41, 48, 53], [43, 50, 55]][Math.floor(i / 32) % 4], t, s * 31, 0.075);
        const m = [57, null, null, null, 60, null, 62, null, null, 60, null, null, 58, null, 57, null][i % 16];
        if (m != null) tone(note(m + 12), t, s * 4, "sine", 0.04);
      },
    },
    {
      bpm: 60,
      step(i, t, s) {
        noise(t, s * 1.1, 0.04, 5200, 0.4, "highpass");
        if (i % 3 === 0) noise(t, s * 1.6, 0.02, 900, 0.5, "lowpass");
      },
    },
  ];

  let timer: ReturnType<typeof setInterval> | undefined;
  let music: GainNode | null = null;
  let file: HTMLAudioElement | null = null;

  function stop() {
    if (timer) clearInterval(timer);
    timer = undefined;
    if (music && ctx) {
      const m = music;
      m.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      setTimeout(() => m.disconnect(), 400);
    }
    music = null;
    if (file) file.pause();
    file = null;
  }

  function play(track: number, onTick: (elapsed: number) => void, onEnd: () => void) {
    stop();
    const tr = tracks[track];
    if (!tr) return;
    if (tr.src && AudioFile) {
      const el = new AudioFile(tr.src);
      el.muted = muted;
      el.addEventListener("timeupdate", () => onTick(el.currentTime));
      el.addEventListener("ended", onEnd);
      void el.play().catch(() => {});
      file = el;
      return;
    }
    const c = ac();
    const loop = LOOPS[track % LOOPS.length];
    const stepLen = 60 / loop.bpm / 4;
    const length = seconds(tr.length);
    music = c.createGain();
    music.connect(master);
    let i = 0;
    let next = c.currentTime + 0.06;
    const started = c.currentTime;
    const tick = () => {
      out = music || master;
      while (next < c.currentTime + 0.12) {
        loop.step(i++, next, stepLen);
        next += stepLen;
      }
      out = master;
      const elapsed = c.currentTime - started;
      onTick(Math.min(elapsed, length));
      if (elapsed >= length) {
        stop();
        onEnd();
      }
    };
    tick();
    timer = setInterval(tick, 30);
  }

  return {
    key(deep, up) {
      const t = ac().currentTime;
      const r = 0.92 + Math.random() * 0.16;
      out = master;
      if (up) {
        noise(t, 0.02, 0.06, 1900 * r, 1);
        return;
      }
      noise(t, 0.04, 0.2, (deep ? 700 : 1100) * r, 0.9);
      tone((deep ? 95 : 125) * r, t, 0.075, "sine", 0.34, (deep ? 55 : 70) * r);
    },
    whoosh() {
      const c = ac();
      const t = c.currentTime;
      noise(t, 0.001, 0.0001, 1000); // makes sure the noise buffer exists
      const src = c.createBufferSource();
      const f = c.createBiquadFilter();
      const v = c.createGain();
      src.buffer = noiseBuf;
      src.loop = true;
      f.type = "bandpass";
      f.Q.value = 0.8;
      f.frequency.setValueAtTime(420, t);
      f.frequency.exponentialRampToValueAtTime(2600, t + 0.2);
      v.gain.setValueAtTime(0.0001, t);
      v.gain.exponentialRampToValueAtTime(0.2, t + 0.07);
      v.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      src.connect(f);
      f.connect(v);
      v.connect(master);
      src.start(t);
      src.stop(t + 0.3);
    },
    thud() {
      out = master;
      tone(90, ac().currentTime, 0.09, "sine", 0.3, 55);
    },
    puff() {
      out = master;
      noise(ac().currentTime, 0.7, 0.05, 6000, 0.5, "highpass");
    },
    play,
    stop,
    setMuted(m) {
      muted = m;
      if (ctx) master.gain.value = m ? 0 : VOLUME;
      if (file) file.muted = m;
    },
  };
}
