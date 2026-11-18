import { deskTracks } from "../data/index.ts";
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
  failPlay = false;
  on: Record<string, () => void> = {};
  constructor(src: string) {
    this.src = src;
    FakeAudio.made.push(this);
  }
  play() {
    return this.failPlay ? Promise.reject(new Error("blocked")) : Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
  removeAttribute(name: string) {
    if (name === "src") this.src = "";
  }
  load() {}
  addEventListener(type: string, fn: () => void) {
    this.on[type] = fn;
  }
  fire(type: string) {
    this.on[type]?.();
  }
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
  a.play(deskTracks.findIndex((t) => t.generated), () => {}, () => {}); // the rain track
  a.stop();
});

test("a track with a file plays that file, and stop pauses it", () => {
  FakeAudio.made = [];
  const tracks = [{ title: "Real nasheed", artist: "Test", length: "1:00", cover: "/c.jpg", src: "/desk/audio/one.mp3" }];
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
  const tracks = [{ title: "Real nasheed", artist: "Test", length: "1:00", cover: "/c.jpg", src: "/desk/audio/one.mp3" }];
  const a = createDeskAudio({ Ctor, AudioEl, tracks });
  assert.ok(a);
  a.play(0, () => {}, () => {});
  a.setMuted(true);
  assert.equal(FakeAudio.made[0].muted, true);
});

const two = [
  { title: "One", artist: "Test", length: "1:00", cover: "/c.jpg", src: "/desk/audio/one.m4a" },
  { title: "Two", artist: "Test", length: "1:00", cover: "/c.jpg", src: "/desk/audio/two.m4a" },
];

test("a stopped track's last time update does not reach the new track", () => {
  FakeAudio.made = [];
  const a = createDeskAudio({ Ctor, AudioEl, tracks: two });
  assert.ok(a);
  const seen: string[] = [];
  a.play(0, () => seen.push("old"), () => seen.push("old ended"));
  const old = FakeAudio.made[0];
  a.play(1, () => seen.push("new"), () => {});
  old.currentTime = 190;
  old.fire("timeupdate"); // a browser fires this when pausing
  old.fire("ended");
  FakeAudio.made[1].fire("timeupdate");
  assert.deepEqual(seen, ["new"]);
  assert.equal(old.src, "", "old track should stop downloading");
});

test("a file that fails to load tells the player once, and only for the current track", () => {
  FakeAudio.made = [];
  const a = createDeskAudio({ Ctor, AudioEl, tracks: two });
  assert.ok(a);
  let fails = 0;
  a.play(0, () => {}, () => {}, () => fails++);
  FakeAudio.made[0].fire("error");
  FakeAudio.made[0].fire("error");
  assert.equal(fails, 1);
  a.play(1, () => {}, () => {}, () => fails++);
  FakeAudio.made[0].fire("error"); // the old one, ignored
  assert.equal(fails, 1);
});

test("a play the browser refuses tells the player", async () => {
  FakeAudio.made = [];
  const Refusing = class extends FakeAudio {
    constructor(src: string) {
      super(src);
      this.failPlay = true;
    }
  } as unknown as typeof Audio;
  const a = createDeskAudio({ Ctor, AudioEl: Refusing, tracks: two });
  assert.ok(a);
  let failed = false;
  a.play(0, () => {}, () => {}, () => (failed = true));
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(failed, true);
});
