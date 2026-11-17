import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRss, getPosts } from "./rss.ts";
import { fallbackPosts } from "../data/index.ts";

const sample = `<?xml version="1.0"?><rss><channel><title>Blog</title>
<item><title><![CDATA[How ChatGPT works]]></title><link>https://ashik1000.hashnode.dev/a</link>
<pubDate>Fri, 03 Apr 2026 10:00:00 GMT</pubDate><description><![CDATA[<p>Plain text only.</p>]]></description></item>
<item><title>Tom &amp; Jerry</title><link>https://ashik1000.hashnode.dev/b</link>
<pubDate>Sat, 01 Feb 2025 19:58:07 GMT</pubDate><description>${"word ".repeat(60)}</description></item>
</channel></rss>`;

test("parseRss reads title, link, date and plain summary", () => {
  const posts = parseRss(sample);
  assert.equal(posts.length, 2);
  assert.deepEqual(posts[0], {
    title: "How ChatGPT works",
    url: "https://ashik1000.hashnode.dev/a",
    date: "3 Apr 2026",
    summary: "Plain text only.",
  });
  assert.equal(posts[1].title, "Tom & Jerry");
  assert.equal(posts[1].date, "1 Feb 2025");
});

test("parseRss trims long summaries at a word boundary", () => {
  const s = parseRss(sample)[1].summary;
  assert.ok(s.length <= 111, `length ${s.length}`);
  assert.ok(s.endsWith("…"));
  assert.ok(!s.includes("wor…"));
});

test("parseRss never puts an ellipsis after a full stop", () => {
  // one long word after the full stop, so the word-boundary cut lands right after "examples."
  const long = "Learn how neural networks work through simple analogies and real examples. Nomathorphdrequiredforthisoneatallpromisejustreadit.";
  const xml = `<rss><channel><item><title>T</title><link>https://x.dev/a</link><pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate><description>${long}</description></item></channel></rss>`;
  const s = parseRss(xml)[0].summary;
  assert.ok(!/[.!?]…$/.test(s), s);
  assert.ok(s.length <= 111, `length ${s.length}`);
});

test("parseRss respects the limit and survives junk", () => {
  assert.equal(parseRss(sample, 1).length, 1);
  assert.deepEqual(parseRss("not xml"), []);
});

test("getPosts falls back when fetch rejects", async () => {
  const posts = await getPosts((async () => {
    throw new Error("offline");
  }) as unknown as typeof fetch);
  assert.deepEqual(posts, fallbackPosts);
});

test("getPosts falls back on a bad status", async () => {
  const posts = await getPosts((async () => ({ ok: false, text: async () => "" })) as unknown as typeof fetch);
  assert.deepEqual(posts, fallbackPosts);
});

test("getPosts falls back on an empty feed", async () => {
  const posts = await getPosts((async () => ({ ok: true, text: async () => "<rss></rss>" })) as unknown as typeof fetch);
  assert.deepEqual(posts, fallbackPosts);
});

test("getPosts returns parsed posts when the feed works", async () => {
  const posts = await getPosts((async () => ({ ok: true, text: async () => sample })) as unknown as typeof fetch);
  assert.equal(posts[0].title, "How ChatGPT works");
});
