"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playFeedback, primeFeedbackAudio } from "@/lib/feedback-audio";

export function useCopyFeedback() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "copied" | "failed"
  >("idle");
  const attempt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    attempt.current += 1;
    if (timer.current) clearTimeout(timer.current);
    setStatus("idle");
  }, []);

  useEffect(
    () => () => {
      attempt.current += 1;
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(async (text: string) => {
    primeFeedbackAudio();
    const current = ++attempt.current;
    if (timer.current) clearTimeout(timer.current);
    setStatus((previous) => previous === "copied" ? "copied" : "pending");
    try {
      await navigator.clipboard.writeText(text);
      if (current !== attempt.current) return;
      setStatus("copied");
      playFeedback("copy-success");
      timer.current = setTimeout(() => {
        if (current === attempt.current) setStatus("idle");
      }, 2000);
    } catch {
      if (current === attempt.current) {
        setStatus("failed");
        playFeedback("copy-failure");
      }
    }
  }, []);

  return { status, copy, reset };
}
