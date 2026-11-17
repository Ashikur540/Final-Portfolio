import { hashnodeUrl, type Post } from "@/data";
import { Button } from "@/components/site/Button";
import { Icon } from "@/components/site/Icon";
import { SectionHeading } from "@/components/site/SectionHeading";
import s from "./notesClosing.module.css";

/** Latest posts from the Hashnode blog. */
export function Notes({ posts }: { posts: Post[] }) {
  return (
    <section id="notes" className={s.notes}>
      <div className="wrap">
        <SectionHeading title="Notes" note="Plain-English posts from my Hashnode blog, mostly about how AI works." />
        <ul className={s.list}>
          {posts.map((p) => (
            <li key={p.url}>
              <a className={s.post} href={p.url} target="_blank" rel="noopener noreferrer" data-post>
                <time>{p.date}</time>
                <div>
                  <h3>
                    <span className={s.t}>{p.title}</span>
                  </h3>
                  {p.summary && <p>{p.summary}</p>}
                </div>
                <span className={s.go}>
                  Read post <Icon name="ne" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className={s.more}>
          <Button href={hashnodeUrl} variant="line" icon="ne" iconMove="ne" external>
            All posts on Hashnode
          </Button>
        </div>
      </div>
    </section>
  );
}
