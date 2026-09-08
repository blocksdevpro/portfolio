"use client";

import { useEffect, useRef } from "react";
import { createBrandAudio, preloadBrandAudio } from "@/lib/brand-audio";

type Cycle =
  | { kind: "idle" }
  | { kind: "running"; started: number; completed: boolean; recoil: number };

export function BrandInteraction({ children, caption }: { children: React.ReactNode; caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const trigger = useRef<(() => void) | null>(null);
  const audio = useRef<ReturnType<typeof createBrandAudio> | null>(null);
  function activate() {
    // Audio is unlocked by the same deliberate gesture that starts the signal.
    try {
      audio.current ??= createBrandAudio();
      void audio.current.resume().catch(() => {});
    } catch {
      // The visual interaction also works when audio is unavailable.
    }
    trigger.current?.();
  }

  useEffect(() => {
    void preloadBrandAudio().catch(() => {});
    const element = ref.current;
    if (!element) return;
    const trace = element.querySelector<SVGPathElement>("[data-signal-trace]");
    const head = element.querySelector<SVGCircleElement>("[data-signal-head]");
    const uRoute = element.querySelector<SVGPathElement>("[data-route-u]");
    const bridge = element.querySelector<SVGPathElement>("[data-route-bridge]");
    const assembly = element.querySelector<SVGGElement>("[data-brand-assembly]");
    if (!trace || !head || !uRoute || !bridge || !assembly) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const length = trace.getTotalLength();
    const uLength = uRoute.getTotalLength();
    const bridgeLength = bridge.getTotalLength();
    const kLength = length - uLength - bridgeLength;
    const tail = 25;
    trace.style.strokeDasharray = tail + " " + (length + tail);
    let cycle: Cycle = { kind: "idle" };
    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      cycle = { kind: "idle" };
      audio.current?.cancel();
      element.dataset.phase = "idle";
      trace.style.strokeDashoffset = String(tail);
      assembly.removeAttribute("transform");
    };
    const begin = () => {
      // Convert one screen pixel to SVG units, including on narrow viewports.
      const matrix = assembly.getScreenCTM();
      const scale = matrix ? Math.hypot(matrix.c, matrix.d) : 1;
      const recoil = reduced.matches ? 0 : 1 / (scale || 1);
      cycle = { kind: "running", started: performance.now(), completed: false, recoil };
      if (recoil) assembly.setAttribute("transform", "translate(0 " + recoil + ")");
      element.dataset.phase = "accept";
      element.dataset.reduced = String(reduced.matches);
      trace.style.strokeDashoffset = String(tail);
      audio.current?.play("accept");
      frame = requestAnimationFrame(tick);
    };
    const tick = (now: number) => {
      if (cycle.kind === "idle") return;
      const elapsed = now - cycle.started;
      if (cycle.recoil && elapsed < 100) {
        const offset = cycle.recoil * Math.pow(1 - elapsed / 100, 3);
        assembly.setAttribute("transform", "translate(0 " + offset + ")");
      } else {
        assembly.removeAttribute("transform");
      }
      if (elapsed >= 760) {
        reset();
        return;
      }
      element.dataset.phase = elapsed < 70 ? "accept"
        : elapsed < 290 ? "send"
        : elapsed < 365 ? "handoff"
        : elapsed < 510 ? "receive" : "complete";

      if (!reduced.matches && elapsed >= 70) {
        const distance = elapsed < 290
          ? uLength * clamp((elapsed - 70) / 220)
          : elapsed < 365
            ? uLength + bridgeLength * clamp((elapsed - 290) / 75)
            : uLength + bridgeLength + kLength * clamp((elapsed - 365) / 145);
        trace.style.strokeDashoffset = String(tail - distance);
        const point = trace.getPointAtLength(distance);
        head.setAttribute("cx", String(point.x));
        head.setAttribute("cy", String(point.y));
      }
      if (elapsed >= 510 && !cycle.completed) {
        cycle.completed = true;
        audio.current?.play("complete");
      }
      frame = requestAnimationFrame(tick);
    };
    trigger.current = () => {
      // Every click interrupts the current inspection and starts a fresh one.
      reset();
      begin();
    };
    const hide = () => { if (document.hidden) reset(); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") reset(); };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) reset(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", hide);
    element.addEventListener("keydown", escape);
    reduced.addEventListener("change", reset);
    return () => {
      reset();
      trigger.current = null;
      observer.disconnect();
      document.removeEventListener("visibilitychange", hide);
      element.removeEventListener("keydown", escape);
      reduced.removeEventListener("change", reset);
      audio.current?.close();
      audio.current = null;
    };
  }, []);

  return (
    <div ref={ref} className="brand-illustration" data-phase="idle">
      <button
        type="button"
        className="brand-trigger"
        aria-label="Send a signal through UK"
        aria-describedby="brand-instructions"
        onClick={activate}
        onKeyDown={(event) => {
          if (event.repeat && (event.key === "Enter" || event.key === " "))
            event.preventDefault();
        }}
      >
        {children}
      </button>
      <span className="drawing-caption">{caption}</span>
      <p id="brand-instructions" className="sr-only">
        Activate to send a signal from U to K, with a soft mechanical sound.
        Press Escape to cancel.
      </p>
    </div>
  );
}
