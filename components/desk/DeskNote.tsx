import { aboutNote } from "@/data";
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
      <p className={s.sigPlace}>Dhaka, Bangladesh</p>
    </div>
  );
}
