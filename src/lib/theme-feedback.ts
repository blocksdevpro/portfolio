import { playFeedback, primeFeedbackAudio } from "@/lib/feedback-audio";

let cancelPending: (() => void) | undefined;

/** Used by both theme entry points; only a confirmed appearance change clicks. */
export function setThemeWithFeedback(preference: string, setTheme: (theme: string) => void) {
  primeFeedbackAudio();
  cancelPending?.();
  const root = document.documentElement;
  const before = root.classList.contains("dark") ? "dark" : "light";
  const target = preference === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    : preference;

  if (before !== target) {
    const observer = new MutationObserver(() => {
      if (!root.classList.contains(target)) return;
      finish();
      playFeedback("theme");
    });
    const timeout = window.setTimeout(finish, 700);
    function finish() {
      observer.disconnect();
      window.clearTimeout(timeout);
      if (cancelPending === finish) cancelPending = undefined;
    }
    cancelPending = finish;
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
  }

  setTheme(preference);
}
