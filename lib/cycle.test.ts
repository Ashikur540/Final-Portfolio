import { test } from "node:test";
import assert from "node:assert/strict";
import { toBack, toFront } from "./cycle.ts";

test("toBack moves the first item to the end", () => {
  assert.deepEqual(toBack([1, 2, 3]), [2, 3, 1]);
});

test("toFront moves the last item to the start", () => {
  assert.deepEqual(toFront([1, 2, 3]), [3, 1, 2]);
});

test("inputs are not changed and empty lists are fine", () => {
  const a = [1, 2, 3];
  toBack(a);
  toFront(a);
  assert.deepEqual(a, [1, 2, 3]);
  assert.deepEqual(toBack([]), []);
  assert.deepEqual(toFront([]), []);
});
