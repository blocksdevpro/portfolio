import { load } from "cheerio/slim";
import { parseContributions, type ActivityData } from "@/lib/widget-data";

export function parseGitHubCalendar(html: string): ActivityData {
  const $ = load(html);
  const tooltips = new Map<string, string>();
  $("tool-tip[for]").each((_, element) => {
    const target = $(element).attr("for");
    if (target) tooltips.set(target, $(element).text().trim());
  });

  const cells = $(".ContributionCalendar-day[data-date]").toArray();
  if (cells.length === 0) return { kind: "unavailable" };

  const contributions = [];
  for (const cell of cells) {
    const day = $(cell);
    const id = day.attr("id");
    const level = day.attr("data-level");
    const count = id
      ? tooltips.get(id)?.match(/^(No|\d+(?:,\d{3})*) contributions?\b/i)?.[1]
      : undefined;
    // A changed calendar format must not silently become zero activity.
    if (!count || !level || !/^[0-4]$/.test(level))
      return { kind: "unavailable" };
    contributions.push({
      date: day.attr("data-date"),
      level: Number(level),
      count:
        count.toLowerCase() === "no" ? 0 : Number(count.replaceAll(",", "")),
    });
  }

  return parseContributions({ contributions });
}
