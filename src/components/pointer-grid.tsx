"use client";

import * as React from "react";

export function PointerGrid() {
  const spotlightRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const spotlight = spotlightRef.current;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    if (!spotlight || !finePointer.matches) {
      return;
    }

    let frameId = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 3;

    const paint = () => {
      frameId = 0;
      spotlight.style.setProperty("--spotlight-x", `${pointerX}px`);
      spotlight.style.setProperty("--spotlight-y", `${pointerY}px`);
      spotlight.dataset.visible = "true";
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (frameId === 0) {
        frameId = window.requestAnimationFrame(paint);
      }
    };

    const handlePointerLeave = () => {
      spotlight.dataset.visible = "false";
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="site-grid-field pointer-events-none fixed inset-0 z-0"
    >
      <div className="site-grid-base absolute inset-0" />
      <div
        ref={spotlightRef}
        className="site-grid-spotlight absolute inset-0"
        data-visible="false"
      />
    </div>
  );
}
