"use client";

import * as React from "react";
import { useTheme } from "next-themes";

type ColorTheme = "light" | "dark";

export type ThemeTransitionOrigin = Readonly<{
  x: number;
  y: number;
}>;

type ToggleThemeOptions = Readonly<{
  origin?: ThemeTransitionOrigin;
}>;

type ViewTransitionAnimationOptions = KeyframeAnimationOptions & {
  pseudoElement: string;
};

function supportsViewTransitions(value: Document): boolean {
  const candidate: unknown = Reflect.get(value, "startViewTransition");
  return typeof candidate === "function";
}

function waitForThemeClass(theme: ColorTheme): Promise<void> {
  const root = document.documentElement;

  if (root.classList.contains(theme)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (root.classList.contains(theme)) {
        finish();
      }
    });
    const timeoutId = window.setTimeout(finish, 700);

    function finish() {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      resolve();
    }

    observer.observe(root, {
      attributeFilter: ["class"],
      attributes: true,
    });
  });
}

export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme();
  const transitionInProgress = React.useRef(false);
  const nextTheme: ColorTheme =
    resolvedTheme === "dark" ? "light" : "dark";

  const toggleTheme = React.useCallback(
    async ({ origin }: ToggleThemeOptions = {}) => {
      if (transitionInProgress.current) {
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!origin || reducedMotion || !supportsViewTransitions(document)) {
        setTheme(nextTheme);
        return;
      }

      transitionInProgress.current = true;
      const root = document.documentElement;
      const farthestX = Math.max(origin.x, window.innerWidth - origin.x);
      const farthestY = Math.max(origin.y, window.innerHeight - origin.y);
      const radius = Math.hypot(farthestX, farthestY);
      const animationOptions: ViewTransitionAnimationOptions = {
        duration: 460,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
        pseudoElement: "::view-transition-new(root)",
      };

      root.dataset.themeTransitioning = "true";

      try {
        const transition = document.startViewTransition(async () => {
          setTheme(nextTheme);
          await waitForThemeClass(nextTheme);
        });

        await transition.ready;

        const animation = root.animate(
          [
            {
              clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
            },
            {
              clipPath: `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
            },
          ],
          animationOptions
        );

        await Promise.allSettled([animation.finished, transition.finished]);
      } catch {
        setTheme(nextTheme);
      } finally {
        delete root.dataset.themeTransitioning;
        transitionInProgress.current = false;
      }
    },
    [nextTheme, setTheme]
  );

  return { nextTheme, toggleTheme };
}
