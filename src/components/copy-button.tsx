"use client";

import { Check, Copy, WarningCircle } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { useCopyFeedback } from "@/hooks/use-copy-feedback";

type CopyButtonProps = {
  value: string | (() => string);
  label: string;
  icon?: ReactNode;
  className?: string;
  fallback?: ReactNode;
};

export function CopyButton({
  value,
  label,
  icon = <Copy size={14} aria-hidden="true" />,
  className = "",
  fallback,
}: CopyButtonProps) {
  const { status, copy } = useCopyFeedback();
  const message = status === "copied"
    ? `${label} copied`
    : status === "failed"
      ? `Couldn't copy ${label.toLowerCase()}. Try again.`
      : `Copy ${label.toLowerCase()}`;

  return (
    <>
      <button
        type="button"
        className={`profile-copy ${className}`}
        data-state={status}
        aria-label={message}
        aria-busy={status === "pending"}
        title={message}
        onClick={() => void copy(typeof value === "function" ? value() : value)}
      >
        <span className="copy-icon" data-visible={status === "idle" || status === "pending"}>
          {icon}
        </span>
        <span className="copy-icon" data-visible={status === "copied"}>
          <Check size={14} aria-hidden="true" />
        </span>
        <span className="copy-icon" data-visible={status === "failed"}>
          <WarningCircle size={14} aria-hidden="true" />
        </span>
      </button>
      <span className="sr-only" role="status">
        {status === "copied" || status === "failed" ? message : ""}
      </span>
      {status === "failed" && fallback}
    </>
  );
}
