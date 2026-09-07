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

function getDocumentTheme(): ColorTheme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getOppositeTheme(theme: ColorTheme): ColorTheme {
  return theme === "dark" ? "light" : "dark";
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
  const intendedTheme = React.useRef<ColorTheme | undefined>(undefined);
  const transitionInProgress = React.useRef(false);
  const latestOrigin = React.useRef<ThemeTransitionOrigin | undefined>(undefined);

  React.useEffect(() => {
    if (
      !transitionInProgress.current &&
      (resolvedTheme === "light" || resolvedTheme === "dark")
    ) {
      intendedTheme.current = resolvedTheme;
    }
  }, [resolvedTheme]);

  const toggleTheme = React.useCallback(
    ({ origin }: ToggleThemeOptions = {}) => {
      const currentIntent = intendedTheme.current ?? getDocumentTheme();
      intendedTheme.current = getOppositeTheme(currentIntent);
      latestOrigin.current = origin;

      if (transitionInProgress.current) {
        return;
      }

      transitionInProgress.current = true;

      void (async () => {
        try {
          while (true) {
            const targetTheme = intendedTheme.current ?? getDocumentTheme();

            if (getDocumentTheme() === targetTheme) {
              return;
            }

            const reducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            const transitionOrigin = latestOrigin.current;

            if (
              !transitionOrigin ||
              reducedMotion ||
              !supportsViewTransitions(document)
            ) {
              setTheme(targetTheme);
              await waitForThemeClass(targetTheme);
              continue;
            }

            const root = document.documentElement;
            const farthestX = Math.max(
              transitionOrigin.x,
              window.innerWidth - transitionOrigin.x,
            );
            const farthestY = Math.max(
              transitionOrigin.y,
              window.innerHeight - transitionOrigin.y,
            );
            const radius = Math.hypot(farthestX, farthestY);
            const animationOptions: ViewTransitionAnimationOptions = {
              duration: 280,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both",
              pseudoElement: "::view-transition-new(root)",
            };
            let transition: ViewTransition | undefined;
            let animation: Animation | undefined;
            let transitionFinished: Promise<unknown> = Promise.resolve();

            root.dataset.themeTransitioning = "true";

            try {
              transition = document.startViewTransition(async () => {
                setTheme(targetTheme);
                await waitForThemeClass(targetTheme);
              });
              transitionFinished = Promise.allSettled([
                transition.finished,
                transition.updateCallbackDone,
              ]);

              await transition.ready;

              animation = root.animate(
                [
                  {
                    clipPath: `circle(0px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`,
                  },
                  {
                    clipPath: `circle(${radius}px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`,
                  },
                ],
                animationOptions,
              );

              await animation.finished;
            } catch {
              transition?.skipTransition();
              setTheme(targetTheme);
              await waitForThemeClass(targetTheme);
            } finally {
              animation?.cancel();
              await transitionFinished;
              delete root.dataset.themeTransitioning;
            }
          }
        } finally {
          transitionInProgress.current = false;
        }
      })();
    },
    [setTheme],
  );

  return { toggleTheme };
}
