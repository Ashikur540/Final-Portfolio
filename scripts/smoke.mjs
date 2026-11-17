// Browser smoke test for the home page.
// Start the app first (yarn build && yarn start -p 3100), then run: yarn smoke
// Optional: SMOKE_URL=http://localhost:3100  SMOKE_ONLY=desk (runs checks whose name contains "desk")
import { readFileSync } from "node:fs";
import { chromium } from "playwright-core";

const URL = process.env.SMOKE_URL || "http://localhost:3100";
const ONLY = process.env.SMOKE_ONLY || "";

const WIDTHS = [390, 768, 1020, 1440];

async function open(browser, width = 1440, { query = "", ...extra } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, ...extra });
  const page = await ctx.newPage();
  page.errors = [];
  page.on("pageerror", (e) => page.errors.push(e.message));
  await page.goto(URL + query, { waitUntil: "networkidle" });
  return page;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const scrollTo = (page, sel, offset = 90) =>
  page.evaluate(
    ([s, o]) => {
      const el = document.querySelector(s);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - o);
    },
    [sel, offset],
  );

const checks = [
  {
    name: "page has one h1",
    async run(b) {
      const p = await open(b);
      assert((await p.locator("h1").count()) === 1, "expected exactly one h1");
      return p;
    },
  },
  {
    name: "no horizontal scroll at any width",
    async run(b) {
      for (const w of WIDTHS) {
        const p = await open(b, w);
        await p.waitForTimeout(400);
        const sw = await p.evaluate(() => document.documentElement.scrollWidth);
        assert(sw <= w, `scrollWidth ${sw} > ${w}`);
        assert(p.errors.length === 0, `page errors at ${w}: ${p.errors.join(" | ")}`);
        await p.context().close();
      }
      return null;
    },
  },
  {
    name: "top bar has About, Work, Experience, Notes in order",
    async run(b) {
      const p = await open(b);
      const t = await p.locator("header nav a").allTextContents();
      assert(t.join(",") === "About,Work,Experience,Notes", "got " + t.join(","));
      return p;
    },
  },
  {
    name: "banner links to x.com/palestine_un",
    async run(b) {
      const p = await open(b);
      const h = await p.locator('a[href="https://x.com/palestine_un"]').count();
      assert(h === 1, "banner link missing");
      return p;
    },
  },
  {
    name: "hero headline, buttons and photo alt text",
    async run(b) {
      const p = await open(b);
      const h1 = await p.locator("h1").textContent();
      assert(h1.includes("Frontend-focused full") && h1.includes("working products."), "h1: " + h1);
      assert((await p.locator('a[href="#work"]', { hasText: "See my projects" }).count()) === 1, "See my projects");
      assert(
        (await p.locator('a[href="/Ashikur_Rahman_Resume_2026.pdf"]', { hasText: "Download resume" }).count()) === 1,
        "Download resume",
      );
      const noAlt = await p.locator("img:not([alt])").count();
      assert(noAlt === 0, noAlt + " images without alt");
      return p;
    },
  },
  {
    name: "hero handwriting finishes writing",
    async run(b) {
      const p = await open(b);
      await p.waitForTimeout(3600);
      const clip = await p.evaluate(() => {
        const w = [...document.querySelectorAll("h1 span")].find(
          (e) => e.textContent === "working products." && e.children.length === 0,
        );
        return getComputedStyle(w).clipPath;
      });
      assert(clip === "none", "clip-path still " + clip);
      return p;
    },
  },
  {
    name: "ink text visible right away with reduced motion",
    async run(b) {
      const p = await open(b, 1440, { reducedMotion: "reduce" });
      const clip = await p.evaluate(() => {
        const w = [...document.querySelectorAll("h1 span")].find(
          (e) => e.textContent === "working products." && e.children.length === 0,
        );
        return getComputedStyle(w).clipPath;
      });
      assert(clip === "none", "clip-path " + clip);
      return p;
    },
  },
  {
    name: "desk is the first section after the hero",
    async run(b) {
      const p = await open(b);
      const ids = await p.evaluate(() => [...document.querySelectorAll("main > section")].map((e) => e.id));
      assert(ids[0] === "about", "sections: " + ids.join(","));
      return p;
    },
  },
  {
    name: "desk fits at 1020px with nothing clipped",
    async run(b) {
      const p = await open(b, 1020);
      await scrollTo(p, "#about");
      await p.waitForTimeout(500);
      const bad = await p.evaluate(() => {
        const stage = document.querySelector("[data-desk]").parentElement.getBoundingClientRect();
        return [...document.querySelectorAll("[data-desk-object]")]
          .map((e) => [e.className, e.getBoundingClientRect()])
          .filter(([, r]) => r.left < stage.left - 2 || r.right > stage.right + 2 || r.top < stage.top - 2 || r.bottom > stage.bottom + 2)
          .map(([c]) => c);
      });
      assert(bad.length === 0, "outside the desk: " + bad.join(" | "));
      return p;
    },
  },
  {
    name: "desk stacks at 390px with no horizontal scroll",
    async run(b) {
      const p = await open(b, 390);
      await scrollTo(p, "#about");
      await p.waitForTimeout(500);
      const sw = await p.evaluate(() => document.documentElement.scrollWidth);
      assert(sw <= 390, "scrollWidth " + sw);
      const pos = await p.evaluate(() => getComputedStyle(document.querySelector("[data-desk-object]")).position);
      assert(pos === "relative", "objects are not stacked: " + pos);
      return p;
    },
  },
  {
    name: "desk pen clicks and the sticky note drags",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      await p.waitForTimeout(400);
      await p.locator("[data-pen-out]").click({ force: true });
      assert((await p.locator("[data-pen-out]").getAttribute("data-pen-out")) === "true", "pen did not click");
      // clicking the pen scrolled down to it; bring the sticky note back into view
      await scrollTo(p, "#about");
      await p.waitForTimeout(600);
      const note = p.locator("p", { hasText: "ship small, ship often" });
      const a = await note.boundingBox();
      await p.mouse.move(a.x + 30, a.y + 30);
      await p.mouse.down();
      await p.mouse.move(a.x - 120, a.y + 60, { steps: 6 });
      await p.mouse.up();
      const c = await note.boundingBox();
      assert(Math.abs(c.x - (a.x - 150)) < 12, `sticky moved to ${c.x}, expected about ${a.x - 150}`);
      return p;
    },
  },
  {
    name: "desk: clicking key 1 types on the laptop",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      await p.locator('[data-k="1"]').click();
      const t = await p.locator("[data-typed]").textContent();
      assert(t === "1", "laptop shows: " + JSON.stringify(t));
      return p;
    },
  },
  {
    name: "desk: typing over the desk shows on the laptop",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      await p.locator('[data-k="q"]').hover();
      await p.keyboard.type("hello ashik", { delay: 30 });
      const t = await p.locator("[data-typed]").textContent();
      assert(t === "hello ashik", "laptop shows: " + JSON.stringify(t));
      return p;
    },
  },
  {
    name: "desk: typing outside the desk does nothing",
    async run(b) {
      const p = await open(b);
      await p.mouse.move(200, 300);
      await p.keyboard.type("xyz");
      const t = await p.locator("[data-typed]").textContent();
      assert(t === "", "laptop shows: " + JSON.stringify(t));
      return p;
    },
  },
  {
    name: "desk: a held key lights the laptop key",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      await p.locator('[data-k="h"]').hover();
      await p.keyboard.down("h");
      await p.waitForTimeout(100);
      const lit = await p.evaluate(() => document.querySelector('[data-code="h"]').className);
      await p.keyboard.up("h");
      assert(/lit/.test(lit), "laptop key class: " + lit);
      return p;
    },
  },
  {
    name: "desk: works silently with ?nosound=1",
    async run(b) {
      const p = await open(b, 1440, { query: "/?nosound=1" });
      await scrollTo(p, "#about");
      await p.locator('[data-k="a"]').click();
      const t = await p.locator("[data-typed]").textContent();
      assert(t === "a", "laptop shows: " + JSON.stringify(t));
      return p;
    },
  },
  {
    name: "desk: tapping track 2 plays it and time moves",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      await p.getByRole("button", { name: /^Your nasheed 2/ }).click();
      await p.waitForTimeout(1600);
      const title = await p.locator("[data-track-title]").textContent();
      assert(title === "Your nasheed 2", "title " + title);
      assert((await p.getByRole("button", { name: "Pause" }).count()) === 1, "no Pause button");
      const el = await p.locator("[data-elapsed]").textContent();
      assert(el !== "0:00", "time did not move");
      await p.getByRole("button", { name: "Pause" }).click();
      assert((await p.locator("[data-playing]").getAttribute("data-playing")) === "false", "did not stop");
      return p;
    },
  },
  {
    name: "desk: space on the focused play button plays, and types nothing",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      await p.getByRole("button", { name: "Play" }).focus();
      await p.keyboard.press("Space");
      await p.waitForTimeout(200);
      assert((await p.locator("[data-playing]").getAttribute("data-playing")) === "true", "space did not play");
      const t = await p.locator("[data-typed]").textContent();
      assert(t === "", "laptop shows: " + JSON.stringify(t));
      return p;
    },
  },
  {
    name: "desk: tapping the attar starts the scent",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      await p.getByRole("button", { name: /attar/ }).click();
      assert((await p.locator("[data-puffs]").getAttribute("data-puffs")) === "1", "no scent");
      return p;
    },
  },
  {
    name: "desk: tapping the photo stack shows the next photo",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      const first = await p.locator("[data-photo]").getAttribute("data-photo");
      await p.locator("[data-photo]").click();
      await p.waitForTimeout(400);
      const second = await p.locator("[data-photo]").getAttribute("data-photo");
      assert(first !== second, "photo did not change");
      assert((await p.locator("[data-photo-caption]").textContent()) === second, "caption not updated");
      return p;
    },
  },
  {
    name: "desk: dragging the top photo far shows the next, a short drag snaps back",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      const stack = p.locator("[data-photo]");
      const first = await stack.getAttribute("data-photo");
      let r = await stack.boundingBox();
      await p.mouse.move(r.x + 80, r.y + 100);
      await p.mouse.down();
      await p.mouse.move(r.x + 105, r.y + 110, { steps: 4 });
      await p.mouse.up();
      await p.waitForTimeout(500);
      assert((await stack.getAttribute("data-photo")) === first, "short drag changed the photo");
      r = await stack.boundingBox();
      await p.mouse.move(r.x + 80, r.y + 100);
      await p.mouse.down();
      await p.mouse.move(r.x + 230, r.y + 60, { steps: 6 });
      await p.mouse.up();
      await p.waitForTimeout(500);
      assert((await stack.getAttribute("data-photo")) !== first, "long drag did not change the photo");
      return p;
    },
  },
  {
    name: "desk: arrow right then left returns to the same photo",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      const first = await p.locator("[data-photo]").getAttribute("data-photo");
      await p.locator('[data-k="q"]').hover();
      await p.keyboard.press("ArrowRight");
      await p.waitForTimeout(400);
      const moved = await p.locator("[data-photo]").getAttribute("data-photo");
      await p.keyboard.press("ArrowLeft");
      await p.waitForTimeout(400);
      assert(moved !== first, "ArrowRight did nothing");
      assert((await p.locator("[data-photo]").getAttribute("data-photo")) === first, "ArrowLeft did not come back");
      return p;
    },
  },
  {
    name: "desk: tapping the books changes the top book",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      const books = p.locator("[data-top-book]");
      const first = await books.getAttribute("data-top-book");
      await books.click();
      await p.waitForTimeout(500);
      assert((await books.getAttribute("data-top-book")) !== first, "top book did not change");
      return p;
    },
  },
  {
    name: "projects: five cards in order with domain, type, year and what I did",
    async run(b) {
      const p = await open(b);
      const titles = await p.locator("[data-project]").evaluateAll((els) => els.map((e) => e.dataset.project));
      assert(titles.join(",") === "Helpxon,Skeleton Studio,Hasanat,Tadhkir Loop,FlowMate", "order: " + titles.join(","));
      const ok = await p.locator("[data-project]").evaluateAll((els) =>
        els.every((e) => /\d{2} · .+ · .+/.test(e.textContent) && e.querySelectorAll("ul[aria-label='What I did'] li").length >= 2),
      );
      assert(ok, "a card is missing its number line or what I did");
      return p;
    },
  },
  {
    name: "projects: links open safely",
    async run(b) {
      const p = await open(b);
      const unsafe = await p.locator('#work a[target="_blank"]:not([rel*="noopener"])').count();
      assert(unsafe === 0, unsafe + " links without noopener");
      assert((await p.locator('#work a[target="_blank"]').count()) >= 5, "external links missing");
      return p;
    },
  },
  {
    name: "experience: jobs oldest first, then Your team?",
    async run(b) {
      const p = await open(b);
      const h = await p.locator("#experience h3").allTextContents();
      assert(/^HasTech IT/.test(h[0]) && /^Innosoft IT/.test(h[1]) && /^Arraytics/.test(h[2]) && h[3] === "Your team?", "order: " + h.join(" | "));
      const marked = await p.locator("#experience [data-marker]").allTextContents();
      assert(marked.join("|") === "8,000+ sites|2,800+ active installs", "markers: " + marked.join("|"));
      return p;
    },
  },
  {
    name: "experience: scrolling past it draws every tick",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#notes", 0);
      await p.waitForTimeout(600);
      const ticks = await p.locator("#experience [data-tick]").evaluateAll((els) => els.map((e) => e.dataset.tick));
      assert(ticks.length === 3 && ticks.every((t) => t === "true"), "ticks: " + ticks.join(","));
      return p;
    },
  },
  {
    name: "experience: reduced motion shows every tick without scrolling",
    async run(b) {
      const p = await open(b, 1440, { reducedMotion: "reduce" });
      const ticks = await p.locator("#experience [data-tick]").evaluateAll((els) => els.map((e) => e.dataset.tick));
      assert(ticks.every((t) => t === "true"), "ticks: " + ticks.join(","));
      return p;
    },
  },
  {
    name: "notes: three posts with Hashnode links",
    async run(b) {
      const p = await open(b);
      const hrefs = await p.locator("[data-post]").evaluateAll((els) => els.map((e) => e.href));
      assert(hrefs.length === 3, hrefs.length + " posts");
      assert(hrefs.every((h) => h.startsWith("https://ashik1000.hashnode.dev/")), "bad link");
      return p;
    },
  },
  {
    name: "closing: copy email shows Copied, then goes back",
    async run(b) {
      const p = await open(b, 1440, { permissions: ["clipboard-read", "clipboard-write"] });
      await scrollTo(p, "#hello", 0);
      await p.getByRole("button", { name: /Copy email/ }).click();
      await p.waitForTimeout(200);
      assert((await p.locator("#hello").textContent()).includes("Copied"), "no Copied state");
      const clip = await p.evaluate(() => navigator.clipboard.readText());
      assert(clip === "meashik1000@gmail.com", "clipboard: " + clip);
      await p.waitForTimeout(2000);
      assert((await p.getByRole("button", { name: /Copy email/ }).count()) === 1, "did not return to Copy email");
      return p;
    },
  },
  {
    name: "closing: LinkedIn, GitHub and Resume links",
    async run(b) {
      const p = await open(b);
      for (const n of ["LinkedIn", "GitHub", "Resume"]) {
        assert((await p.locator("#hello a", { hasText: n }).count()) === 1, n + " missing");
      }
      return p;
    },
  },
  {
    name: "quality: headings in order and every image has alt text",
    async run(b) {
      const p = await open(b);
      const levels = await p.evaluate(() => [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]));
      assert(levels[0] === 1 && levels.filter((l) => l === 1).length === 1, "h1 problem: " + levels.join(""));
      for (let i = 1; i < levels.length; i++) assert(levels[i] - levels[i - 1] <= 1, "heading jump: " + levels.join(""));
      assert((await p.locator("img:not([alt])").count()) === 0, "image without alt");
      return p;
    },
  },
  {
    name: "quality: Tab reaches every desk control",
    async run(b) {
      const p = await open(b);
      const seen = new Set();
      for (let i = 0; i < 70; i++) {
        await p.keyboard.press("Tab");
        const label = await p.evaluate(() => {
          const e = document.activeElement;
          return (e.getAttribute("aria-label") || e.textContent || "").slice(0, 40);
        });
        seen.add(label);
      }
      const want = [/^Keyboard/, /^Play$/, /^Photo \d/, /^Books on my desk/, /attar/, /Turn desk sound/];
      const missing = want.filter((r) => ![...seen].some((l) => r.test(l)));
      assert(missing.length === 0, "not reached: " + missing.join(", "));
      return p;
    },
  },
  {
    name: "quality: reduced motion leaves nothing animating",
    async run(b) {
      const p = await open(b, 1440, { reducedMotion: "reduce" });
      await p.waitForTimeout(300);
      const running = await p.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
      assert(running === 0, running + " animations running");
      return p;
    },
  },
  {
    name: "quality: never-show words absent",
    async run(b) {
      const p = await open(b);
      // the word list stays out of the public repo: one regex per line in scripts/never-show.local.txt
      let words = [];
      try {
        words = readFileSync(import.meta.dirname + "/never-show.local.txt", "utf8").split("\n").filter(Boolean);
      } catch {
        console.log("   (no scripts/never-show.local.txt, skipped)");
      }
      const t = await p.locator("body").textContent();
      for (const w of words) assert(!new RegExp(w, "i").test(t), "never-show word found: " + w);
      return p;
    },
  },
];

export { open, assert, scrollTo, WIDTHS };

const browser = await chromium.launch({ channel: "chrome" });
let failed = 0;
for (const c of checks) {
  if (ONLY && !c.name.includes(ONLY)) continue;
  try {
    const page = await c.run(browser);
    if (page) {
      assert(page.errors.length === 0, "page errors: " + page.errors.join(" | "));
      await page.context().close();
    }
    console.log("ok   " + c.name);
  } catch (e) {
    failed++;
    console.log("FAIL " + c.name + ": " + e.message.split("\n")[0]);
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
