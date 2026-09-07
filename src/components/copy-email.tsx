"use client";

import { Check, Copy, WarningCircle } from "@phosphor-icons/react";
import { useCopyFeedback } from "@/hooks/use-copy-feedback";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CopyEmail({ email }: { email: string }) {
  const { status, copy } = useCopyFeedback();
  return (
    <div className="copy-control">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => void copy(email)}
            data-state={status}
            aria-label={
              status === "copied" ? "Email copied" : "Copy email address"
            }
          >
            <span
              className="copy-icon"
              data-visible={status !== "copied" && status !== "failed"}
            >
              <Copy size={17} aria-hidden="true" />
            </span>
            <span className="copy-icon" data-visible={status === "copied"}>
              <Check size={17} aria-hidden="true" />
            </span>
            <span className="copy-icon" data-visible={status === "failed"}>
              <WarningCircle size={17} aria-hidden="true" />
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>Copy email address</TooltipContent>
      </Tooltip>
      <span role="status">
        {status === "copied"
          ? "Copied to clipboard"
          : status === "failed"
            ? "Select the email above to copy it"
            : status === "pending"
              ? "Copying…"
              : ""}
      </span>
    </div>
  );
}
