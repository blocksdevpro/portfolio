import { Spinner } from "@phosphor-icons/react";

export function LoadingSpinner({ label }: { label: string }) {
  return (
    <span className="loading-spinner" role="status">
      <Spinner size={22} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
