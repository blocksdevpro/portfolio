"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { RESUME_DATA } from "@/constants/resume";
import { parseContributions, type ActivityData } from "@/lib/widget-data";

export function Activity() {
  const [activity, setActivity] = useState<ActivityData | { kind: "loading" }>({
    kind: "loading",
  });
  const [selected, setSelected] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    const cell = container?.querySelector('[data-selected="true"]');
    if (!container || !cell) return;
    const frame = container.getBoundingClientRect();
    const bounds = cell.getBoundingClientRect();
    if (bounds.left < frame.left + 4)
      container.scrollLeft += bounds.left - frame.left - 4;
    else if (bounds.right > frame.right - 4)
      container.scrollLeft += bounds.right - frame.right + 4;
  }, [selected]);

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
          if (parsed.kind === "ready")
            setSelected(Math.max(0, parsed.days.length - 1));
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

  const day = activity.kind === "ready" ? activity.days[selected] : undefined;
  const detail = day
    ? day.count +
      (day.count === 1 ? " contribution on " : " contributions on ") +
      new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(day.date + "T00:00:00Z"))
    : "";
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
      <SectionHeading number="04" detail="GitHub activity">
        Building in public
      </SectionHeading>
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
              <div className="activity-grid" aria-hidden="true">
                {Array.from({ length: padding }, (_, index) => (
                  <span key={"pad-" + index} />
                ))}
                {activity.days.map((entry, index) => (
                  <span
                    key={entry.date}
                    className="activity-day"
                    data-level={entry.level}
                    data-selected={index === selected}
                    onPointerEnter={() => setSelected(index)}
                    title={entry.date + ": " + entry.count + " contributions"}
                  />
                ))}
              </div>
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
            <label className="activity-controls">
              <span>Explore dates</span>
              <input
                type="range"
                min={0}
                max={Math.max(0, activity.days.length - 1)}
                value={selected}
                onChange={(event) => setSelected(Number(event.target.value))}
                aria-valuetext={detail}
              />
            </label>
            <p className="activity-detail">
              <output>{detail}</output>
            </p>
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
