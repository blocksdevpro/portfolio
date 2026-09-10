import { NextResponse } from "next/server";
import { RESUME_DATA } from "@/constants/resume";
import { parseContributions } from "@/lib/widget-data";
import { parseGitHubCalendar } from "@/lib/github-contributions";

export const maxDuration = 20;

export async function GET() {
  const github = RESUME_DATA.socials.github;
  if (!github) return NextResponse.json({ kind: "unavailable" });
  const username = new URL(github).pathname.split("/").filter(Boolean)[0];
  if (!username) return NextResponse.json({ kind: "unavailable" });
  const sources = [
    {
      name: "github",
      url: `https://github.com/users/${encodeURIComponent(username)}/contributions`,
      parse: async (response: Response) =>
        parseGitHubCalendar(await response.text()),
    },
    {
      name: "contributions-api",
      url: `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      parse: async (response: Response) => {
        const data: unknown = await response.json();
        return parseContributions(data);
      },
    },
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source.url, {
        headers: { "Accept-Language": "en-US" },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error(`Upstream HTTP ${response.status}`);
      const activity = await source.parse(response);
      if (activity.kind === "unavailable" || activity.days.length === 0)
        throw new Error("Invalid contribution calendar");
      return NextResponse.json(
        { contributions: activity.days },
        {
          headers: {
            "Cache-Control":
              "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        },
      );
    } catch (error) {
      console.warn("Contributions upstream failed", {
        source: source.name,
        error: error instanceof Error ? error.message : "Unknown fetch failure",
        cause:
          error instanceof Error && error.cause instanceof Error
            ? error.cause.message
            : undefined,
      });
    }
  }
  return NextResponse.json(
    { kind: "unavailable" },
    { status: 502, headers: { "Cache-Control": "no-store" } },
  );
}
