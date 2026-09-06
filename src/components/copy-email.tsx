"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  }
  return (
    <div className="copy-control">
      <button
        type="button"
        onClick={copy}
        aria-label={status === "copied" ? "Email copied" : "Copy email address"}
        title="Copy email address"
      >
        {status === "copied" ? <Check size={17} /> : <Copy size={17} />}
      </button>
      <span role="status">
        {status === "copied"
          ? "Copied"
          : status === "failed"
            ? "Select the email to copy"
            : ""}
      </span>
    </div>
  );
}
