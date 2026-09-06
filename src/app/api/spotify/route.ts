import { NextResponse } from "next/server";
import { parseLastFm } from "@/lib/widget-data";

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;
  if (!apiKey || !username) return NextResponse.json({ kind: "unavailable" });
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.search = new URLSearchParams({
    method: "user.getrecenttracks",
    user: username,
    api_key: apiKey,
    format: "json",
    limit: "1",
  }).toString();
  try {
    const response = await fetch(url, {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok)
      return NextResponse.json({ kind: "unavailable" }, { status: 502 });
    const data: unknown = await response.json();
    const music = parseLastFm(data);
    return NextResponse.json(music, {
      status: music.kind === "unavailable" ? 502 : 200,
    });
  } catch {
    return NextResponse.json({ kind: "unavailable" }, { status: 502 });
  }
}
