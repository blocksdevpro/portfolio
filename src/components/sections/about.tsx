"use client";
import React, { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";

interface AboutProps {
  data: ResumeData;
}

interface Contribution {
  date: string;
  count: number;
  level: number;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://github-contributions-api.jogruber.de/v4/blocksdevpro?y=last"
        );
        const data = await response.json();

        // Logic to ensure we end on "Today" and start on a "Monday"
        // 1. Get the last contribution date from the API
        const lastEntry = data.contributions[data.contributions.length - 1];
        const lastDate = new Date(lastEntry.date);

        // 2. Calculate the day index (0=Mon, 6=Sun) for the last date
        // JS getDay(): 0=Sun, 1=Mon, ..., 6=Sat
        // We want Mon=0, ..., Sun=6
        const dayIndex = (lastDate.getDay() + 6) % 7;

        // 3. Calculate total days to show:
        // We want 51 full weeks + the partial last week (dayIndex + 1 items)
        // This ensures the first day of the slice is a Monday
        const totalDays = 51 * 7 + (dayIndex + 1);

        const slicedData = data.contributions.slice(-totalDays);
        setContributions(slicedData);

        setTotalContributions(
          data.total?.lastYear ||
            slicedData.reduce(
              (acc: number, curr: Contribution) => acc + curr.count,
              0
            )
        );
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-100 dark:bg-zinc-900";
      case 1:
        return "bg-green-200 dark:bg-green-900";
      case 2:
        return "bg-green-300 dark:bg-green-800";
      case 3:
        return "bg-green-400 dark:bg-green-700";
      case 4:
        return "bg-green-500 dark:bg-green-600";
      default:
        return "bg-gray-100 dark:bg-zinc-900";
    }
  };

  // Helper to get weeks for rendering
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section id="about" className="space-y-4" data-reveal>
      <h2 className="text-xl font-bold text-foreground">About</h2>
      <div className="prose dark:prose-invert text-sm text-muted-foreground leading-relaxed">
        <p>{data.summary}</p>
      </div>

      {/* Contribution Graph */}
      <div className="mt-6 select-none border border-border p-4 rounded-lg bg-card/50">
        {/* Graph Container */}
        <div
          className="overflow-x-auto pb-2 scrollbar-hide"
          ref={(el) => {
            if (el) {
              el.scrollLeft = el.scrollWidth;
            }
          }}
        >
          <div className="min-w-max">
            {/* Month Labels */}
            <div className="flex gap-[3px] mb-2 text-[10px] text-muted-foreground">
              {weeks.map((week, i) => {
                const firstDay = new Date(week[0]?.date);
                const month = firstDay.toLocaleString("default", {
                  month: "short",
                });
                const prevWeekFirstDay =
                  i > 0 ? new Date(weeks[i - 1][0]?.date) : null;
                const isNewMonth =
                  i === 0 ||
                  (prevWeekFirstDay &&
                    prevWeekFirstDay.getMonth() !== firstDay.getMonth());

                return (
                  <div
                    key={i}
                    className={`w-[10px] overflow-visible whitespace-nowrap ${
                      isNewMonth ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {isNewMonth ? month : ""}
                  </div>
                );
              })}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {loading
                ? Array.from({ length: 52 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, j) => (
                        <div
                          key={j}
                          className="w-[10px] h-[10px] rounded-[2px] bg-gray-100 dark:bg-zinc-900 animate-pulse"
                        />
                      ))}
                    </div>
                  ))
                : weeks.map((week, i) => (
                    <div key={i} className="flex flex-col gap-[3px]">
                      {week.map((day, j) => (
                        <div key={j} className="group relative">
                          <div
                            className={`w-[10px] h-[10px] rounded-[2px] border-[0.5px] border-black/5 dark:border-white/5 ${getLevelColor(
                              day.level
                            )}`}
                          />
                          {/* Tooltip */}
                          <div
                            className={`absolute ${
                              j === 0 ? "top-full mt-2" : "bottom-full mb-2"
                            } hidden group-hover:block z-100 pointer-events-none ${
                              i < 10
                                ? "left-0 translate-x-0"
                                : i > 40
                                  ? "right-0 translate-x-0"
                                  : "left-1/2 -translate-x-1/2"
                            }`}
                          >
                            <div className="bg-white text-black text-[10px] px-2 py-1 rounded border border-border shadow-xl whitespace-nowrap font-medium">
                              {day.count} contributions on {day.date}
                            </div>
                            {/* Triangle */}
                            <div
                              className={`absolute ${
                                j === 0
                                  ? "bottom-full border-b-white border-t-transparent"
                                  : "top-full border-t-white border-b-transparent"
                              } border-4 border-transparent ${
                                i < 10
                                  ? "left-1 translate-x-0"
                                  : i > 40
                                    ? "right-1 translate-x-0"
                                    : "left-1/2 -translate-x-1/2"
                              }`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground">
              {totalContributions}
            </span>
            <span>contributions last year!</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="w-[10px] h-[10px] bg-gray-100 dark:bg-zinc-900 rounded-[2px] border-[0.5px] border-black/5 dark:border-white/5"></div>
            <div className="w-[10px] h-[10px] bg-green-200 dark:bg-green-900 rounded-[2px] border-[0.5px] border-black/5 dark:border-white/5"></div>
            <div className="w-[10px] h-[10px] bg-green-300 dark:bg-green-800 rounded-[2px] border-[0.5px] border-black/5 dark:border-white/5"></div>
            <div className="w-[10px] h-[10px] bg-green-400 dark:bg-green-700 rounded-[2px] border-[0.5px] border-black/5 dark:border-white/5"></div>
            <div className="w-[10px] h-[10px] bg-green-500 dark:bg-green-600 rounded-[2px] border-[0.5px] border-black/5 dark:border-white/5"></div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};
