import { fallbackPosts, hashnodeUrl } from "../data/index.ts";
import type { Post } from "../data/index.ts";

export type { Post };

const LEADING_SYMBOLS = new RegExp("^[^\\p{L}\\p{N}]+", "u");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function decode(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function text(raw: string): string {
  const s = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  return decode(decode(s).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function tag(item: string, name: string): string {
  const m = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? m[1] : "";
}

function shortDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function clip(s: string, max = 110): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const space = cut.lastIndexOf(" ");
  const words = (space > 0 ? cut.slice(0, space) : cut).trim();
  // a cut that lands on a full sentence ends cleanly; otherwise drop a dangling comma and add "…"
  if (/[.!?]$/.test(words)) return words;
  return words.replace(/[,;:]+$/, "") + "…";
}

/** Reads a Hashnode RSS feed. Plain string parsing, no XML package. */
export function parseRss(xml: string, limit = 3): Post[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  return items.slice(0, limit).map((item) => ({
    // drop a leading emoji or symbol some titles start with
    title: text(tag(item, "title")).replace(LEADING_SYMBOLS, ""),
    url: text(tag(item, "link")),
    date: shortDate(text(tag(item, "pubDate"))),
    summary: clip(text(tag(item, "description"))),
  }));
}

/** Latest posts, refreshed at most once an hour. Never throws: falls back to a fixed list. */
export async function getPosts(fetcher: typeof fetch = fetch): Promise<Post[]> {
  try {
    const res = await fetcher(`${hashnodeUrl}/rss.xml`, { next: { revalidate: 3600 } } as RequestInit);
    if (!res.ok) return fallbackPosts;
    const posts = parseRss(await res.text());
    return posts.length ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}
