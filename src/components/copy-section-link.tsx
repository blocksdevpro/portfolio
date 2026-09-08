"use client";

import { LinkSimple } from "@phosphor-icons/react";
import { CopyButton } from "@/components/copy-button";

export function CopySectionLink({ sectionId }: { sectionId: string }) {
  return (
    <span className="section-copy">
      <CopyButton
        label="Section link"
        className="section-link-copy"
        icon={<LinkSimple size={14} aria-hidden="true" />}
        value={() => {
          const url = new URL(window.location.href);
          url.hash = sectionId;
          return url.href;
        }}
        fallback={
          <a className="section-copy-fallback" href={`#${sectionId}`}>
            Open section link
          </a>
        }
      />
    </span>
  );
}
