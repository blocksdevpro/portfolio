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

  return (
    <section
      id="activity"
      className="portfolio-section"
      aria-label="GitHub activity"
    >
      <SectionHeading number="04" detail="A little, every day.">
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
              ref={scrollRef}
              tabIndex={0}
              aria-label="Contribution graph. Scroll horizontally to explore earlier dates."
            >
              <div className="activity-grid" aria-hidden="true">
                {Array.from({ length: padding }, (_, index) => (
                  <span key={"pad-" + index} />
                ))}
                {activity.days.map((entry, index) => (
                  <span
                    key={entry.date}
                    className="activity-day"
                    data-level={entry.level}
                    onPointerEnter={() => setSelected(index)}
                    title={entry.date + ": " + entry.count + " contributions"}
                  />
                ))}
              </div>
            </div>
            <div className="activity-summary">
              <span>
                <strong>{activity.total.toLocaleString("en-US")}</strong>{" "}
                contributions across {activity.days.length} days
              </span>
              <a
                href={RESUME_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub ↗
              </a>
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
