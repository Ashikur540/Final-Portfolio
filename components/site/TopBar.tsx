import s from "./chrome.module.css";

/** Plain header above the hero: name and availability. Scrolls away; the Dock does the navigation. */
export function TopBar() {
  return (
    <header className={s.top}>
      <div className={`wrap ${s.row}`}>
        <a className={s.who} href="#top">
          Ashikur Rahman
        </a>
        <span className={s.avail}>
          <i aria-hidden="true" />
          Open to roles from Jan 2027
        </span>
      </div>
    </header>
  );
}
