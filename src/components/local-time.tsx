"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(timer);
}

export function LocalTime({ timezone }: { timezone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date()),
    () => "--:--",
  );

  return (
    <span
      data-nosnippet
      className="tabular-nums"
      aria-label={"Time in India: " + time + " IST"}
    >
      {time} <span className="text-muted-foreground">IST</span>
    </span>
  );
}
