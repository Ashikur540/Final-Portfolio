import { test } from "node:test";
import assert from "node:assert/strict";
import { DESK_ROWS, LAPTOP_ROWS, applyKey } from "./keyLayouts.ts";

const width = (row: { units: number }[]) => row.reduce((n, k) => n + k.units, 0);

test("desk keyboard rows are all 15 units wide", () => {
  assert.equal(DESK_ROWS.length, 5);
  for (const row of DESK_ROWS) assert.equal(width(row), 15);
});

test("laptop rows: function row 14 units, the rest 14.5", () => {
  assert.equal(LAPTOP_ROWS.length, 6);
  assert.equal(width(LAPTOP_ROWS[0]), 14);
  for (const row of LAPTOP_ROWS.slice(1)) assert.equal(width(row), 14.5);
});

test("applyKey types, deletes and clears", () => {
  assert.equal(applyKey("ab", "c"), "abc");
  assert.equal(applyKey("a", " "), "a ");
  assert.equal(applyKey("ab", "backspace"), "a");
  assert.equal(applyKey("", "backspace"), "");
  assert.equal(applyKey("ab", "enter"), "");
  assert.equal(applyKey("ab", "escape"), "");
  assert.equal(applyKey("ab", "shift"), "ab");
  assert.equal(applyKey("ab", "arrowleft"), "ab");
});

test("applyKey stops at the max length", () => {
  assert.equal(applyKey("a".repeat(24), "b").length, 24);
  assert.equal(applyKey("abc", "d", 3), "abc");
});
