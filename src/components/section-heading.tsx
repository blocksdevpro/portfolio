import { CopySectionLink } from "@/components/copy-section-link";

export function SectionHeading({
  number,
  children,
  detail,
  id,
  sectionId,
}: {
  number: string;
  children: React.ReactNode;
  detail?: string;
  id?: string;
  sectionId?: string;
}) {
  return (
    <div className="section-heading">
      <div className="flex min-w-0 items-baseline gap-3">
        <span className="section-number" aria-hidden="true">
          {number}
        </span>
        <div className="flex min-w-0 items-center gap-2">
          <h2 id={id}>{children}</h2>
          {sectionId && <CopySectionLink sectionId={sectionId} />}
        </div>
      </div>
      {detail && <span className="section-detail">{detail}</span>}
    </div>
  );
}
