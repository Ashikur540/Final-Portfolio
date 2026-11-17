import { test } from "node:test";
import assert from "node:assert/strict";
import { createDeskAudio } from "./deskAudio.ts";

// A tiny stand-in for the browser's AudioContext: every node accepts every call.
function param() {
  return { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}, setTargetAtTime() {} };
}
function node(extra: Record<string, unknown> = {}) {
  return { connect() {}, disconnect() {}, start() {}, stop() {}, ...extra };
}
class FakeContext {
  currentTime = 0;
  sampleRate = 8000;
  state = "running";
  destination = node();
  resume() {
    return Promise.resolve();
  }
  createGain() {
    return node({ gain: param() });
  }
  createOscillator() {
    return node({ type: "sine", frequency: param() });
  }
  createBiquadFilter() {
    return node({ type: "bandpass", frequency: param(), Q: param() });
  }
  createBuffer(_c: number, len: number) {
    const data = new Float32Array(len);
    return { getChannelData: () => data };
  }
  createBufferSource() {
    return node({ buffer: null, loop: false });
  }
}

class FakeAudio {
  static made: FakeAudio[] = [];
  src: string;
  paused = false;
  muted = false;
  currentTime = 0;
  constructor(src: string) {
    this.src = src;
    FakeAudio.made.push(this);
  }
  play() {
    return Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
  addEventListener() {}
}

const Ctor = FakeContext as unknown as typeof AudioContext;
const AudioEl = FakeAudio as unknown as typeof Audio;

test("no AudioContext means no sound engine", () => {
  const saved = (globalThis as { AudioContext?: unknown }).AudioContext;
  delete (globalThis as { AudioContext?: unknown }).AudioContext;
  assert.equal(createDeskAudio(), null);
  (globalThis as { AudioContext?: unknown }).AudioContext = saved;
});

test("every sound can play without throwing", () => {
  const a = createDeskAudio({ Ctor, AudioEl });
  assert.ok(a);
  a.key(false);
  a.key(true);
  a.key(false, true);
  a.whoosh();
  a.thud();
  a.puff();
  a.setMuted(true);
  a.setMuted(false);
  a.play(0, () => {}, () => {});
  a.stop();
});

test("a track with a file plays that file, and stop pauses it", () => {
  FakeAudio.made = [];
  const tracks = [{ title: "Real nasheed", length: "1:00", cover: "/c.jpg", src: "/desk/audio/one.mp3" }];
  const a = createDeskAudio({ Ctor, AudioEl, tracks });
  assert.ok(a);
  a.play(0, () => {}, () => {});
  assert.equal(FakeAudio.made.length, 1);
  assert.equal(FakeAudio.made[0].src, "/desk/audio/one.mp3");
  a.stop();
  assert.equal(FakeAudio.made[0].paused, true);
});

test("muting also mutes a playing file", () => {
  FakeAudio.made = [];
  const tracks = [{ title: "Real nasheed", length: "1:00", cover: "/c.jpg", src: "/desk/audio/one.mp3" }];
  const a = createDeskAudio({ Ctor, AudioEl, tracks });
  assert.ok(a);
  a.play(0, () => {}, () => {});
  a.setMuted(true);
  assert.equal(FakeAudio.made[0].muted, true);
});
