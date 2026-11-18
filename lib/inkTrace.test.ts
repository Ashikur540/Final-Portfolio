import { test } from "node:test";
import assert from "node:assert/strict";
import { inkCenterline } from "./inkTrace.ts";

// alpha grid helper: width x height, ink = list of [x, yFrom, yTo]
function grid(w: number, h: number, ink: [number, number, number][]) {
  const a = new Uint8ClampedArray(w * h * 4);
  for (const [x, y0, y1] of ink) for (let y = y0; y <= y1; y++) a[(y * w + x) * 4 + 3] = 255;
  return a;
}

test("follows the ink and holds through gaps", () => {
  const line = inkCenterline(grid(4, 10, [[0, 2, 6], [2, 4, 8], [3, 4, 8]]), 4, 10, 0);
  assert.equal(line.length, 4);
  for (const y of line) assert.ok(y >= 2 && y <= 8, `y=${y}`);
});

test("an empty grid stays at the start height", () => {
  const line = inkCenterline(grid(5, 6, []), 5, 6, 3);
  assert.deepEqual(line, [3, 3, 3, 3, 3]);
});
