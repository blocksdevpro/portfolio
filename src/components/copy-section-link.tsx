"use client";

import { Check, LinkSimple } from "@phosphor-icons/react";
import { useCopyFeedback } from "@/hooks/use-copy-feedback";

export function CopySectionLink({ sectionId }: { sectionId: string }) {
  const { status, copy } = useCopyFeedback();
  return (
    <span className="section-copy">
      <button
        type="button"
        className="section-copy-button"
        aria-label={
          status === "copied" ? "Section link copied" : "Copy link to section"
        }
        title="Copy link to section"
        onClick={() => {
          const url = new URL(window.location.href);
          url.hash = sectionId;
          void copy(url.href);
        }}
      >
        <span className="copy-icon" data-visible={status !== "copied"}>
          <LinkSimple size={16} aria-hidden="true" />
        </span>
        <span className="copy-icon" data-visible={status === "copied"}>
          <Check size={16} aria-hidden="true" />
        </span>
      </button>
      <span role="status" className="section-copy-status">
        {status === "copied"
          ? "Link copied"
          : status === "failed"
            ? "Copy unavailable"
            : ""}
      </span>
      {status === "failed" && (
        <a className="section-copy-fallback" href={`#${sectionId}`}>
          Open section link
        </a>
      )}
    </span>
  );
}
