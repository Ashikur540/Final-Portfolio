"use client";

import { useRef } from "react";

let topZ = 50;

/**
 * Lets an object on the desk be dragged with mouse or touch. Movement is divided by
 * the desk's scale so the object stays under the pointer. A press that barely moves
 * counts as a tap.
 */
export function useDraggable<T extends HTMLElement>({
  scale,
  enabled,
  onTap,
}: {
  scale: number;
  enabled: boolean;
  onTap?: () => void;
}) {
  const ref = useRef<T>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number; moved: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    if (!enabled) {
      // stacked layout: no dragging, but a tap still counts
      drag.current = { x: e.clientX, y: e.clientY, left: 0, top: 0, moved: 0 };
      return;
    }
    el.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, left: el.offsetLeft, top: el.offsetTop, moved: 0 };
    el.style.zIndex = String(++topZ);
    el.dataset.dragging = "true";
  };
  const onPointerMove = (e: React.PointerEvent<T>) => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    d.moved = Math.max(d.moved, Math.abs(dx) + Math.abs(dy));
    if (!enabled) return;
    el.style.left = `${d.left + dx / scale}px`;
    el.style.top = `${d.top + dy / scale}px`;
  };
  const end = () => {
    const d = drag.current;
    drag.current = null;
    if (ref.current) delete ref.current.dataset.dragging;
    if (d && d.moved < 5) onTap?.();
  };

  return { ref, onPointerDown, onPointerMove, onPointerUp: end, onPointerCancel: end };
}
