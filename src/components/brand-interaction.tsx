"use client";

import { useEffect, useRef } from "react";

/** A local light follows the pointer. The illustration never moves the content. */
export function BrandInteraction({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const gradient = element.querySelector("[data-brand-light]");
    const drawing = element.querySelector("svg");
    const allowed = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let visible = true;
    let frame = 0;
    let x = 50;
    let y = 50;
    let targetX = 50;
    let targetY = 50;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.dataset.lit = "false";
    };
    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      gradient?.setAttribute("cx", String(x * 7.2));
      gradient?.setAttribute("cy", String(y * 1.76));
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.05)
        frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (!allowed.matches || !visible || document.hidden) return;
      const bounds = (drawing ?? element).getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width) * 100;
      targetY = ((event.clientY - bounds.top) / bounds.height) * 100;
      element.dataset.lit = "true";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop();
    });
    observer.observe(element);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", stop);
    allowed.addEventListener("change", stop);
    document.addEventListener("visibilitychange", stop);
    return () => {
      stop();
      observer.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", stop);
      allowed.removeEventListener("change", stop);
      document.removeEventListener("visibilitychange", stop);
    };
  }, []);
  return (
    <div ref={ref} className="brand-illustration" aria-hidden="true">
      {children}
    </div>
  );
}
