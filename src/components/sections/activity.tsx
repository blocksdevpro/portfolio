"use client";

import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RESUME_DATA } from "@/constants/resume";
import { parseContributions, type ActivityData } from "@/lib/widget-data";

export function Activity() {
  const [activity, setActivity] = useState<ActivityData | { kind: "loading" }>({
    kind: "loading",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openDate, setOpenDate] = useState<string | null>(null);
  const [focusedDate, setFocusedDate] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/contributions", {
          signal: controller.signal,
        });
        const value: unknown = await response.json();
        const parsed = parseContributions(value);
        if (!controller.signal.aborted) {
          setActivity(parsed);
        }
      } catch {
        if (!controller.signal.aborted) setActivity({ kind: "unavailable" });
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (activity.kind === "ready" && scrollRef.current)
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [activity]);

  const first = activity.kind === "ready" ? activity.days[0] : undefined;
  const padding = first ? new Date(first.date + "T00:00:00Z").getUTCDay() : 0;
  const last = activity.kind === "ready" ? activity.days.at(-1) : undefined;
  const dateLabel = (date: string) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date + "T00:00:00Z"));
  const months =
    activity.kind === "ready"
      ? activity.days.flatMap((entry, index) =>
          entry.date.endsWith("-01")
            ? [
                {
                  label: new Intl.DateTimeFormat("en", {
                    month: "short",
                    timeZone: "UTC",
                  }).format(new Date(entry.date + "T00:00:00Z")),
                  column: Math.floor((index + padding) / 7) + 1,
                  date: entry.date,
                },
              ]
            : [],
        )
      : [];

  return (
    <section
      id="activity"
      className="portfolio-section"
      aria-label="GitHub activity"
    >
      <h2 className="sr-only">GitHub activity</h2>
      <div className="activity-body section-inset">
        {activity.kind === "loading" && (
          <div className="widget-unavailable" role="status">
            Loading GitHub activity…
          </div>
        )}
        {activity.kind === "unavailable" && (
          <div className="widget-unavailable">
            <p>GitHub activity is temporarily unavailable.</p>
            <a
              href={RESUME_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View my work on GitHub ↗
            </a>
          </div>
        )}
        {activity.kind === "ready" && activity.days.length === 0 && (
          <div className="widget-unavailable">
            <p>No contribution history to display yet.</p>
            <a
              href={RESUME_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore my repositories ↗
            </a>
          </div>
        )}
        {activity.kind === "ready" && activity.days.length > 0 && (
          <>
            <div
              className="activity-scroll"
              role="region"
              ref={scrollRef}
              tabIndex={0}
              aria-label="Contribution graph. Scroll horizontally to explore earlier dates."
            >
              <div
                className="activity-months"
                aria-hidden="true"
                style={{
                  gridTemplateColumns: `repeat(${Math.ceil((activity.days.length + padding) / 7)}, 13px)`,
                }}
              >
                {months.map((month) => (
                  <span key={month.date} style={{ gridColumn: month.column }}>
                    {month.label}
                  </span>
                ))}
              </div>
              <TooltipProvider delay={100}>
                <div className="activity-grid">
                  {Array.from({ length: padding }, (_, index) => (
                    <span key={"pad-" + index} aria-hidden="true" />
                  ))}
                  {activity.days.map((entry, index) => (
                    <Tooltip
                      key={entry.date}
                      triggerId={`activity-${entry.date}`}
                      open={openDate === entry.date}
                      onOpenChange={(open) =>
                        setOpenDate((current) =>
                          open
                            ? entry.date
                            : current === entry.date
                              ? null
                              : current,
                        )
                      }
                    >
                      <TooltipTrigger
                        id={`activity-${entry.date}`}
                        closeOnClick={false}
                        type="button"
                        className="activity-day"
                        data-level={entry.level}
                        data-date={entry.date}
                        tabIndex={
                          focusedDate === entry.date ||
                          (!focusedDate && index === activity.days.length - 1)
                            ? 0
                            : -1
                        }
                        aria-label={`${entry.count} ${entry.count === 1 ? "contribution" : "contributions"} on ${dateLabel(entry.date)}`}
                        onFocus={() => setFocusedDate(entry.date)}
                        onClick={(event) => {
                          event.preventDefault();
                          setOpenDate(entry.date);
                        }}
                        onKeyDown={(event) => {
                          let next = index;
                          switch (event.key) {
                            case "ArrowLeft":
                              next -= 7;
                              break;
                            case "ArrowRight":
                              next += 7;
                              break;
                            case "ArrowUp":
                              next -= 1;
                              break;
                            case "ArrowDown":
                              next += 1;
                              break;
                            case "Home":
                              next = 0;
                              break;
                            case "End":
                              next = activity.days.length - 1;
                              break;
                            default:
                              return;
                          }
                          event.preventDefault();
                          const target =
                            activity.days[
                              Math.max(
                                0,
                                Math.min(next, activity.days.length - 1),
                              )
                            ];
                          if (!target) return;
                          const button =
                            scrollRef.current?.querySelector<HTMLButtonElement>(
                              `[data-date="${target.date}"]`,
                            );
                          button?.focus({ preventScroll: true });
                          button?.scrollIntoView({
                            block: "nearest",
                            inline: "nearest",
                          });
                        }}
                      />
                      <TooltipContent className="grid gap-1">
                        <strong className="font-semibold">
                          {entry.count}{" "}
                          {entry.count === 1 ? "contribution" : "contributions"}
                        </strong>
                        <span className="font-mono text-[11px] opacity-75">
                          {dateLabel(entry.date)}
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
            <p className="activity-scroll-hint">
              Scroll the graph to see earlier months{" "}
              <span aria-hidden="true">↔</span>
            </p>
            <div className="activity-summary">
              <span>
                <strong>{activity.total.toLocaleString("en-US")}</strong>{" "}
                contributions
              </span>
              <a
                href={RESUME_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub ↗
              </a>
            </div>
            <div className="activity-summary">
              <p className="activity-period">
                {first && last
                  ? `${dateLabel(first.date)} – ${dateLabel(last.date)}`
                  : ""}
              </p>
              <div
                className="activity-legend"
                role="img"
                aria-label="Contribution intensity from less to more"
              >
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="activity-day"
                    data-level={level}
                    aria-hidden="true"
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </>
        )}
        <noscript>
          <p className="text-sm">
            <a
              className="underline underline-offset-4"
              href={RESUME_DATA.socials.github}
            >
              View contribution history on GitHub
            </a>
          </p>
        </noscript>
      </div>
    </section>
  );
}
