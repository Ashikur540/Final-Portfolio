import { LAPTOP_ROWS } from "@/lib/keyLayouts";
import s from "./desk.module.css";

/** Top-down laptop. The screen shows a small file about Ashik plus what the visitor types. */
export function Laptop({ typed, litCodes }: { typed: string; litCodes: ReadonlySet<string> }) {
  return (
    <div className={`${s.ob} ${s.lap}`} aria-hidden="true" data-desk-object>
      <div className={s.lid}>
        <div className={s.scr}>
          <div className={s.tb}>
            <i />
            <i />
            <i />
            &nbsp;about-me.ts
          </div>
          <pre className={s.code}>
            <span className={s.c1}>const</span>
            {" ashik = {\n  role: "}
            <span className={s.c3}>&quot;full-stack, frontend first&quot;</span>
            {",\n  home: "}
            <span className={s.c3}>&quot;Dhaka&quot;</span>
            {",\n  fuel: "}
            <span className={s.c3}>&quot;cha&quot;</span>
            {",\n  now:  "}
            <span className={s.c3}>&quot;learning AI agents&quot;</span>
            {",\n};\n"}
            <span className={s.c4}>{"// type on the keyboard"}</span>
            {"\n"}
            <span className={s.c2}>&gt;</span>
            {" "}
            <span data-typed>{typed}</span>
            <span className={s.caret} />
          </pre>
        </div>
      </div>
      <div className={s.hinge} />
      <div className={s.base}>
        <div className={s.deck}>
          <span className={s.grill} />
          <div className={s.well}>
            {LAPTOP_ROWS.map((row, i) => (
              <div key={i} className={`${s.lr} ${i === 0 ? s.lrFn : ""}`}>
                {row.map((k, j) => (
                  <i
                    key={j}
                    className={`${s.lk} ${k.code && litCodes.has(k.code) ? s.lit : ""}`}
                    style={{ "--u": k.units } as React.CSSProperties}
                    data-l={k.label}
                    data-code={k.code}
                  />
                ))}
              </div>
            ))}
          </div>
          <span className={s.grill} />
        </div>
        <div className={s.pad} />
      </div>
    </div>
  );
}
