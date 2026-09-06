import { NextResponse } from "next/server";
import { RESUME_DATA } from "@/constants/resume";
import { parseContributions } from "@/lib/widget-data";

export async function GET() {
  const github = RESUME_DATA.socials.github;
  if (!github) return NextResponse.json({ kind: "unavailable" });
  const username = new URL(github).pathname.split("/").filter(Boolean)[0];
  if (!username) return NextResponse.json({ kind: "unavailable" });
  try {
    const response = await fetch(
      "https://github-contributions-api.jogruber.de/v4/" +
        encodeURIComponent(username) +
        "?y=last",
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok)
      return NextResponse.json({ kind: "unavailable" }, { status: 502 });
    const data: unknown = await response.json();
    const activity = parseContributions(data);
    if (activity.kind === "unavailable")
      return NextResponse.json(activity, { status: 502 });
    return NextResponse.json(
      { contributions: activity.days },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json({ kind: "unavailable" }, { status: 502 });
  }
}
