export type SectionHash = `#${string}`;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getScrollPadding(): number {
  const scrollPadding = Number.parseFloat(
    window.getComputedStyle(document.documentElement).scrollPaddingTop,
  );

  return Number.isFinite(scrollPadding) ? scrollPadding : 0;
}

export function scrollToSection(hash: SectionHash): boolean {
  const sectionId = hash.slice(1);
  const target = document.getElementById(sectionId);

  if (!target) {
    return false;
  }

  const top =
    sectionId === "top"
      ? 0
      : Math.max(
          0,
          window.scrollY +
            target.getBoundingClientRect().top -
            getScrollPadding(),
        );

  if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  window.scrollTo({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    top,
  });

  return true;
}
