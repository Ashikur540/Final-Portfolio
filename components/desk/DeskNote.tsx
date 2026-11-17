import { aboutNote } from "@/data";
import { InkWord } from "@/components/site/InkWord";
import s from "./desk.module.css";

/** The About text, on a taped notebook page. */
export function DeskNote() {
  return (
    <div className={`${s.ob} ${s.note}`} data-desk-object>
      <span className={s.tape} aria-hidden="true" />
      <p className={s.hi}>hi, I&apos;m Ashik.</p>
      {aboutNote.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <div className={s.sig}>
        <InkWord text="Ashik" ms={1100} start="view" className={s.sigName} />
        <span className={s.sigPlace}>Dhaka, Bangladesh</span>
      </div>
    </div>
  );
}
