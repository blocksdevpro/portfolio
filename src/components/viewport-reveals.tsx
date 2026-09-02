"use client";

import * as React from "react";

const REVEAL_SELECTOR = "[data-reveal]";

export function ViewportReveals() {
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset.revealed = "true";
      });
      return;
    }

    root.classList.add("reveal-ready");

    const revealElement = (
      element: HTMLElement,
      observer: IntersectionObserver
    ) => {
      element.dataset.revealed = "true";
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target;
          if (element instanceof HTMLElement) {
            revealElement(element, observer);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      }
    );

    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      const isInitiallyVisible =
        bounds.bottom > 0 && bounds.top < window.innerHeight * 0.92;

      if (isInitiallyVisible) {
        revealElement(element, observer);
      } else {
        observer.observe(element);
      }
    });

    let frameId = 0;
    const revealPassedElements = () => {
      frameId = 0;
      elements.forEach((element) => {
        if (
          element.dataset.revealed !== "true" &&
          element.getBoundingClientRect().top < window.innerHeight * 0.9
        ) {
          revealElement(element, observer);
        }
      });
    };
    const requestRevealCheck = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(revealPassedElements);
      }
    };

    window.addEventListener("scroll", requestRevealCheck, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestRevealCheck);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
