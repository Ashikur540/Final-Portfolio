// Run with: yarn check:launch
// Fails while any placeholder content is still on the page. The site must not go live until this passes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { deskBooks, deskPhotos, deskTracks } from "../data/index.ts";

test("no placeholder content is left", () => {
  const standInSrcs = new Set(deskPhotos.filter((p) => p.standIn).map((p) => p.src));
  const problems = [
    ...deskPhotos.filter((p) => p.standIn).map((p) => `stand-in photo: ${p.src} ("${p.caption}")`),
    ...deskBooks.filter((b) => b.placeholder).map((b) => `placeholder book: ${b.title}`),
    ...deskTracks
      .filter((t) => standInSrcs.has(t.cover) || t.cover.includes("saintmartin.jpg"))
      .map((t) => `track cover is a stand-in: ${t.title} (${t.cover})`),
    ...deskTracks.filter((t) => t.title.startsWith("Your nasheed") && !t.src).map((t) => `track without audio: ${t.title}`),
  ];
  assert.deepEqual(problems, [], "\n" + problems.join("\n"));
});
