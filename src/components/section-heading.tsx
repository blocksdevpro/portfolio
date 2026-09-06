export function SectionHeading({
  number,
  children,
  detail,
}: {
  number: string;
  children: React.ReactNode;
  detail?: string;
}) {
  return (
    <div className="section-heading">
      <div className="flex min-w-0 items-baseline gap-3">
        <span className="section-number" aria-hidden="true">
          {number}
        </span>
        <h2>{children}</h2>
      </div>
      {detail && <span className="section-detail">{detail}</span>}
    </div>
  );
}
