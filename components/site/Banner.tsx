import s from "./chrome.module.css";

export function Banner() {
  return (
    <div className={s.banner}>
      <a href="https://x.com/palestine_un" target="_blank" rel="noopener noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/Palestine-46.svg" alt="" width={18} height={18} />
        <strong>Free Palestine</strong>
        <span className={s.msg}>
          I stand with Palestine and the world must not look away. End the Israeli genocide in Gaza. Raise your
          voice for justice, peace, and human rights.
        </span>
      </a>
    </div>
  );
}
