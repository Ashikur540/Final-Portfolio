"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { projects } from "@/data";
import { Button } from "@/components/site/Button";
import { Icon } from "@/components/site/Icon";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useInView } from "@/components/site/useInView";
import s from "./projects.module.css";

const WIDE = "(min-width: 981px)";

/** A panel in the card's colour covers the screenshot, then slides up once it scrolls in. */
function Cover() {
  const [ref, inView] = useInView<HTMLDivElement>({ margin: "0px 0px -10% 0px" });
  return <div ref={ref} className={`${s.cover} ${inView ? s.open : ""}`} aria-hidden="true" data-cover />;
}

/** Five project cards that stack as you scroll; the covered card shrinks a little. */
export function Projects() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia(WIDE);
    let raf = 0;
    const cards = Array.from(list.children) as HTMLElement[];
    const update = () => {
      raf = 0;
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next || reduce.matches || !wide.matches) {
          c.style.transform = "";
          c.style.filter = "";
          return;
        }
        const cr = c.getBoundingClientRect();
        const nr = next.getBoundingClientRect();
        const o = Math.max(0, Math.min(1, (cr.bottom - nr.top) / cr.height));
        c.style.transform = o ? `scale(${1 - o * 0.05})` : "";
        c.style.filter = o ? `brightness(${1 - o * 0.05})` : "";
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="work" className={s.section}>
      <div className="wrap">
        <SectionHeading title="Things I've built" note="Five projects I designed and built, from a SaaS to small tools." />
        <div ref={listRef} className={s.stack}>
          {projects.map((p, i) => {
            const codeOnly = p.githubLink && p.link === p.githubLink;
            return (
              <article
                key={p.id}
                className={s.card}
                style={{ "--tint": p.tint, "--top": `${94 + i * 16}px` } as React.CSSProperties}
                data-project={p.title}
              >
                <div className={s.browser}>
                  <div className={s.bar} aria-hidden="true">
                    <span className={s.dots}>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className={s.url}>
                      <Icon name="lock" />
                      <span>{p.domain}</span>
                    </span>
                  </div>
                  <div className={s.vp}>
                    <Image
                      src={p.img}
                      alt={`${p.title} screenshot`}
                      fill
                      quality={90}
                      sizes="(max-width: 980px) 92vw, 640px"
                      style={{ objectPosition: p.imgPosition }}
                    />
                    <Cover />
                  </div>
                </div>
                <div>
                  <span className={s.num}>
                    {String(i + 1).padStart(2, "0")} · {p.type} · {p.year}
                  </span>
                  <h3>{p.title}</h3>
                  <p className={s.summary}>{p.summary}</p>
                  <ul className={s.did} aria-label="What I did">
                    {p.did.map((d) => (
                      <li key={d}>
                        <Icon name="check" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <ul className={s.chips} aria-label="Built with">
                    {p.iconLists.map((t) => (
                      <li key={t.name}>{t.name}</li>
                    ))}
                  </ul>
                  <div className={s.row}>
                    {codeOnly ? (
                      <Button href={p.githubLink} icon="github" external>
                        View on GitHub
                      </Button>
                    ) : (
                      <>
                        <Button href={p.link} icon="ne" iconMove="ne" external>
                          {p.linkLabel}
                        </Button>
                        {p.githubLink && (
                          <Button href={p.githubLink} variant="line" icon="github" external>
                            View code
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
