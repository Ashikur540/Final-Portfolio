"use client";

import { useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view (stays true when once = true). */
export function useInView<T extends Element>({
  margin = "0px 0px -15% 0px",
  threshold = 0,
  once = true,
}: { margin?: string; threshold?: number; once?: boolean } = {}): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin: margin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, threshold, once]);
  return [ref, inView];
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
