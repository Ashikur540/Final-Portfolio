export type Key = {
  label: string;
  /** lower-case KeyboardEvent.key, "" for a blank key */
  code: string;
  /** width in key units */
  units: number;
  tone?: "mod" | "accent" | "enter";
};

const chars = (s: string): Key[] => s.split("").map((c) => ({ label: c, code: c, units: 1 }));
const mod = (label: string, code: string, units: number): Key => ({ label, code, units, tone: "mod" });
const k = (label: string, code: string, units: number): Key => ({ label, code, units });

/** The cream mechanical keyboard on the desk. Every row is 15 units. */
export const DESK_ROWS: Key[][] = [
  [{ label: "esc", code: "escape", units: 1, tone: "accent" }, ...chars("1234567890-="), mod("del", "backspace", 2)],
  [mod("tab", "tab", 1.5), ...chars("qwertyuiop[]"), mod("\\", "\\", 1.5)],
  [mod("caps", "capslock", 1.75), ...chars("asdfghjkl;'"), { label: "enter", code: "enter", units: 2.25, tone: "enter" }],
  [mod("shift", "shift", 2.25), ...chars("zxcvbnm,./"), mod("shift", "shift", 2.75)],
  [
    mod("ctrl", "control", 1.25),
    mod("opt", "alt", 1.25),
    mod("cmd", "meta", 1.25),
    k("", " ", 6.25),
    mod("cmd", "meta", 1.25),
    mod("opt", "alt", 1.25),
    mod("<", "arrowleft", 1.25),
    mod(">", "arrowright", 1.25),
  ],
];

/** The laptop's built-in keyboard. Function row 14 units, the rest 14.5. */
export const LAPTOP_ROWS: Key[][] = [
  [k("", "escape", 1), ...Array.from({ length: 13 }, () => k("", "", 1))],
  [k("`", "`", 1), ...chars("1234567890-="), k("del", "backspace", 1.5)],
  [k("tab", "tab", 1.5), ...chars("qwertyuiop[]"), k("\\", "\\", 1)],
  [k("caps", "capslock", 1.75), ...chars("asdfghjkl;'"), k("ret", "enter", 1.75)],
  [k("shift", "shift", 2.25), ...chars("zxcvbnm,./"), k("shift", "shift", 2.25)],
  [
    k("fn", "fn", 1),
    k("ctl", "control", 1),
    k("opt", "alt", 1),
    k("cmd", "meta", 1.25),
    k("", " ", 5),
    k("cmd", "meta", 1.25),
    k("opt", "alt", 1),
    k("<", "arrowleft", 1),
    k("", "arrowdown", 1),
    k(">", "arrowright", 1),
  ],
];

/** What the laptop's last line shows after a key press. */
export function applyKey(buffer: string, code: string, max = 24): string {
  if (code === "backspace") return buffer.slice(0, -1);
  if (code === "enter" || code === "escape") return "";
  if (code.length === 1 && buffer.length < max) return buffer + code;
  return buffer;
}
