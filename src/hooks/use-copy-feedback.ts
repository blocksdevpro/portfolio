"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCopyFeedback() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "copied" | "failed"
  >("idle");
  const attempt = useRef(0);
  const pending = useRef(false);
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
    if (pending.current) return;
    pending.current = true;
    const current = ++attempt.current;
    if (timer.current) clearTimeout(timer.current);
    setStatus((previous) => previous === "copied" ? "copied" : "pending");
    try {
      await navigator.clipboard.writeText(text);
      if (current !== attempt.current) return;
      setStatus("copied");
      timer.current = setTimeout(() => {
        if (current === attempt.current) setStatus("idle");
      }, 2000);
    } catch {
      if (current === attempt.current) setStatus("failed");
    } finally {
      pending.current = false;
    }
  }, []);

  return { status, copy, reset };
}
