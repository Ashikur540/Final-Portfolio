"use client";

import { useEffect, useRef, useState } from "react";

export const STAGE_W = 1180;
export const STAGE_H = 884;
/** desk and project cards switch to their full layout at this width */
export const WIDE = "(min-width: 981px)";

/**
 * The desk is laid out on a fixed 1180 x 884 stage. On wide screens it is scaled
 * down to fit its container; below 981px the CSS stacks the objects in a column
 * (stacked = true) and nothing is scaled or draggable.
 */
export function useDeskScale() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const mq = window.matchMedia(WIDE);
    const fit = () => {
      const wide = mq.matches;
      setStacked(!wide);
      setScale(wide ? Math.min(1, el.clientWidth / STAGE_W) : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    mq.addEventListener("change", fit);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", fit);
    };
  }, []);

  return { wrapRef, scale, stacked };
}
