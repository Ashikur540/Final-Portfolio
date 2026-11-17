// Run with: yarn check:launch
// Fails while any placeholder content is still on the page. The site must not go live until this passes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { deskBooks, deskPhotos, deskTracks, jobMoments } from "../data/index.ts";

test("no placeholder content is left", () => {
  const problems = [
    ...deskPhotos.filter((p) => p.standIn).map((p) => `stand-in photo: ${p.src} ("${p.caption}")`),
    ...deskBooks.filter((b) => b.placeholder).map((b) => `placeholder book: ${b.title}`),
    ...deskTracks
      .filter((t) => !t.cover.startsWith("/clicks/"))
      .map((t) => `track cover is not one of my photos: ${t.title} (${t.cover})`),
    ...deskTracks.filter((t) => t.title.startsWith("Your nasheed") && !t.src).map((t) => `track without audio: ${t.title}`),
    ...Object.entries(jobMoments).flatMap(([job, ms]) =>
      ms.filter((m) => !m.src || !m.alt).map((m) => `job photo missing (src and alt): ${job} ("${m.caption}")`),
    ),
  ];
  assert.deepEqual(problems, [], "\n" + problems.join("\n"));
});
