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

// wait until the desk objects have finished their drop-in animation
const settleDesk = (page) =>
  page.evaluate(() =>
    Promise.all([...document.querySelectorAll("[data-desk-object]")].flatMap((e) => e.getAnimations().map((a) => a.finished))),
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
    name: "menu has About, Work, Experience, Notes in order",
    async run(b) {
      const p = await open(b);
      const t = await p.locator('[data-dock] a[href^="#"]').allTextContents();
      assert(t.join(",") === "About,Work,Experience,Notes", "got " + t.join(","));
      return p;
    },
  },
  {
    name: "menu: the note follows hover, and Work gets heart eyes and a line",
    async run(b) {
      const p = await open(b);
      await p.waitForTimeout(1300);
      const left = () => p.locator("[data-buddy]").evaluate((e) => e.getBoundingClientRect().left);
      const a = await left();
      await p.locator('[data-dock] a[href="#about"]').hover();
      await p.waitForTimeout(700);
      assert((await left()) < a - 80, "note did not move to About");
      await p.mouse.move(10, 10);
      await scrollTo(p, "#work", 120);
      await p.waitForTimeout(700);
      assert((await p.locator("[data-buddy]").getAttribute("data-mood")) === "love", "no heart eyes on Work");
      assert(/click one/.test(await p.locator("[data-bubble]").textContent()), "no line on Work");
      return p;
    },
  },
  {
    name: "menu: poking the note makes it laugh, then shy, then calm",
    async run(b) {
      const p = await open(b);
      await p.waitForTimeout(1300);
      const note = p.locator("[data-buddy]");
      const mood = () => note.getAttribute("data-mood");
      await note.click();
      assert((await mood()) === "happy", "first click: " + (await mood()));
      await note.click();
      await note.click();
      assert((await mood()) === "laugh", "third click: " + (await mood()));
      assert((await p.locator("[data-bit]").count()) > 0, "no ha bits");
      for (let i = 0; i < 4; i++) await note.click();
      assert((await mood()) === "shy", "seventh click: " + (await mood()));
      await p.waitForTimeout(3600);
      assert((await mood()) === "calm", "did not calm down: " + (await mood()));
      return p;
    },
  },
  {
    name: "menu fits on small phones",
    async run(b) {
      for (const w of [320, 344, 360, 390]) {
        const p = await open(b, w, { isMobile: true, hasTouch: true });
        const r = await p.locator("[data-dock] > div").evaluate((e) => e.getBoundingClientRect());
        assert(r.left >= 4 && r.right <= w - 4, `menu ${Math.round(r.left)}..${Math.round(r.right)} at ${w}`);
        const sw = await p.evaluate(() => document.documentElement.scrollWidth);
        assert(sw <= w, `page is ${sw}px wide at ${w}`);
        await p.context().close();
      }
      return null;
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
      assert((await p.locator('a[href="#work"]', { hasText: "See my work" }).count()) === 1, "See my work");
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
      await p.waitForTimeout(300);
      await settleDesk(p);
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
      await p.locator("[data-pen-out]").scrollIntoViewIfNeeded();
      await p.waitForTimeout(300);
      await settleDesk(p);
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
      await scrollTo(p, '[data-k="q"]', 400);
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
      await scrollTo(p, '[data-k="h"]', 400);
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
    name: "desk: tapping the rain track plays it and time moves",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      await p.getByRole("button", { name: /^Rain, no music/ }).click();
      await p.waitForTimeout(1600);
      const title = await p.locator("[data-track-title]").textContent();
      assert(title === "Rain, no music", "title " + title);
      assert((await p.getByRole("button", { name: "Pause" }).count()) === 1, "no Pause button");
      const el = await p.locator("[data-elapsed]").textContent();
      assert(el !== "0:00", "time did not move");
      await p.getByRole("button", { name: "Pause" }).click();
      assert((await p.locator("[data-playing]").getAttribute("data-playing")) === "false", "did not stop");
      return p;
    },
  },
  {
    name: "desk: nasheeds download only on play, and every row fits the phone",
    async run(b) {
      const ctx = await b.newContext({ viewport: { width: 1100, height: 900 } });
      const p = await ctx.newPage();
      p.errors = [];
      p.on("pageerror", (e) => p.errors.push(e.message));
      const audio = [];
      p.on("request", (r) => /\/desk\/audio\//.test(r.url()) && audio.push(r.url()));
      await p.goto(URL, { waitUntil: "networkidle" });
      await scrollTo(p, "#about");
      await settleDesk(p);
      assert(audio.length === 0, "audio loaded before play: " + audio[0]);
      const out = await p.evaluate(() => {
        const pl = document.querySelector("[data-playing] button[aria-current]").parentElement;
        // measured unrotated: offsets ignore the phone's tilt; hidden rows are reachable by scrolling the list
        return [...pl.children].filter((r) => r.offsetLeft + r.offsetWidth > pl.clientWidth).length;
      });
      assert(out === 0, out + " playlist rows stick out");
      await p.getByRole("button", { name: /^Maula Ya Salli/ }).click();
      await p.waitForTimeout(800);
      assert(audio.some((u) => u.endsWith("/desk/audio/maula-ya-salli.m4a")), "track 1 not fetched: " + audio.join(", "));
      return p;
    },
  },
  {
    name: "desk: the playing row keeps its layout on play and pause",
    async run(b) {
      const p = await open(b);
      await scrollTo(p, "#about");
      const row = p.getByRole("button", { name: /^Rain, no music/ });
      const geo = () => row.evaluate((r) => [...r.querySelectorAll("span")].map((c) => { const x = c.getBoundingClientRect(); return [x.left, x.width]; }));
      await settleDesk(p);
      await row.click();
      await p.waitForTimeout(300);
      const playing = await geo();
      await p.getByRole("button", { name: "Pause" }).click();
      await p.waitForTimeout(300);
      const paused = await geo();
      // the phone is tilted, so allow sub-pixel rounding; a real jump is several pixels
      const moved = playing.some(([x, w], i) => Math.abs(x - paused[i][0]) > 1.5 || Math.abs(w - paused[i][1]) > 1.5);
      assert(!moved, `row moved: ${JSON.stringify(playing)} -> ${JSON.stringify(paused)}`);
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
      // keep the keyboard in the middle of the screen, clear of the floating menu
      await scrollTo(p, '[data-k="q"]', 400);
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
    name: "desk: every object is placed and fully visible after scrolling past it",
    async run(b) {
      for (const w of [1440, 390]) {
        const p = await open(b, w);
        const n = await p.locator("[data-desk-object]").count();
        for (let i = 0; i < n; i++) {
          await p.locator("[data-desk-object]").nth(i).scrollIntoViewIfNeeded();
          await p.waitForTimeout(150);
        }
        await p.waitForTimeout(1500);
        const bad = await p.locator("[data-desk-object]").evaluateAll((els) =>
          els.filter((e) => !("placed" in e.dataset) || getComputedStyle(e).opacity !== "1").length,
        );
        assert(bad === 0, `${bad} of ${n} objects not placed at ${w}px`);
        await p.context().close();
      }
      return null;
    },
  },
  {
    name: "headings: titles read as whole words and the screenshot cover slides away",
    async run(b) {
      const p = await open(b);
      for (const t of ["A bit about me", "Things I've built", "Experience", "Notes"]) {
        assert((await p.getByRole("heading", { level: 2, name: t, exact: true }).count()) === 1, "heading name: " + t);
      }
      await scrollTo(p, "#work", 0);
      await p.waitForTimeout(2200);
      const cover = await p.locator("[data-project] [data-cover]").first().evaluate((c) => {
        const r = c.getBoundingClientRect(), v = c.parentElement.getBoundingClientRect();
        return r.bottom <= v.top + 1;
      });
      assert(cover, "screenshot cover did not slide away");
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
      // the numbers count up once seen, so scroll past and let them finish
      await scrollTo(p, "#experience [data-marker]", 400);
      await p.waitForTimeout(1800);
      const marked = await p.locator("#experience [data-marker]").allTextContents();
      assert(marked.join("|") === "in one month|from Figma to launch|8,000+ sites|2,800+ active installs|let's talk", "markers: " + marked.join("|"));
      return p;
    },
  },
  {
    name: "experience: hovering a job shows its photo print",
    async run(b) {
      const p = await open(b);
      const row = p.locator("#experience [data-job]").nth(2);
      await row.scrollIntoViewIfNeeded();
      const print = row.locator("[data-print]");
      assert((await print.evaluate((e) => getComputedStyle(e).opacity)) === "0", "print visible before hover");
      await row.hover({ position: { x: 40, y: 20 } });
      await p.waitForTimeout(600);
      assert((await print.evaluate((e) => getComputedStyle(e).opacity)) === "1", "print hidden on hover");
      assert((await print.locator("img").count()) === 1, "no photo in the print");
      return p;
    },
  },
  {
    name: "experience: phones show the prints inline",
    async run(b) {
      const p = await open(b, 390, { hasTouch: true, isMobile: true });
      const ops = await p.locator("#experience [data-print]").evaluateAll((els) => els.map((e) => getComputedStyle(e).opacity + getComputedStyle(e).position));
      assert(ops.length === 3 && ops.every((o) => o === "1relative"), "prints: " + ops.join(","));
      const sw = await p.evaluate(() => document.documentElement.scrollWidth);
      assert(sw <= 390, "scrollWidth " + sw);
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
      const btn = p.getByRole("button", { name: /Copy email/ });
      const w0 = (await btn.boundingBox()).width;
      await btn.click();
      await p.waitForTimeout(300);
      const copied = p.getByRole("button", { name: "Email copied" });
      assert((await copied.count()) === 1, "no Copied state");
      const w1 = (await copied.boundingBox()).width;
      assert(Math.abs(w1 - w0) < 0.5, `button width changed ${w0} -> ${w1}`);
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
