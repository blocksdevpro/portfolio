export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export interface Contribution {
  date: string;
  count: number;
  level: number;
}

export type ActivityData =
  | { kind: "ready"; days: Contribution[]; total: number }
  | { kind: "unavailable" };

function isContribution(value: unknown): value is Contribution {
  if (
    !isRecord(value) ||
    typeof value.date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value.date)
  )
    return false;
  const date = new Date(value.date + "T00:00:00Z");
  return (
    Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === value.date &&
    typeof value.count === "number" &&
    Number.isSafeInteger(value.count) &&
    value.count >= 0 &&
    typeof value.level === "number" &&
    Number.isInteger(value.level) &&
    value.level >= 0 &&
    value.level <= 4
  );
}

export function parseContributions(value: unknown): ActivityData {
  if (
    !isRecord(value) ||
    !Array.isArray(value.contributions) ||
    !value.contributions.every(isContribution)
  )
    return { kind: "unavailable" };
  const days = [...value.contributions]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-365);
  if (new Set(days.map((day) => day.date)).size !== days.length)
    return { kind: "unavailable" };
  // Missing calendar days would shift every later cell to the wrong weekday.
  if (
    days.some(
      (day, index) =>
        index > 0 &&
        new Date(day.date).getTime() -
          new Date(days[index - 1].date).getTime() !==
          86_400_000,
    )
  )
    return { kind: "unavailable" };
  return {
    kind: "ready",
    days,
    total: days.reduce((sum, day) => sum + day.count, 0),
  };
}

export type MusicData =
  | {
      kind: "track";
      title: string;
      artist: string;
      albumArt: string | null;
      trackUrl: string;
      isPlaying: boolean;
    }
  | { kind: "idle" }
  | { kind: "unavailable" };

function httpsUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export function parseLastFm(value: unknown): MusicData {
  if (
    !isRecord(value) ||
    !isRecord(value.recenttracks) ||
    !Array.isArray(value.recenttracks.track)
  )
    return { kind: "unavailable" };
  const track: unknown = value.recenttracks.track[0];
  if (track === undefined) return { kind: "idle" };
  if (
    !isRecord(track) ||
    typeof track.name !== "string" ||
    !track.name.trim() ||
    !isRecord(track.artist) ||
    typeof track.artist["#text"] !== "string"
  )
    return { kind: "unavailable" };
  let albumArt: string | null = null;
  if (Array.isArray(track.image)) {
    for (const entry of track.image) {
      if (isRecord(entry) && httpsUrl(entry["#text"]))
        albumArt = httpsUrl(entry["#text"]);
    }
  }
  return {
    kind: "track",
    title: track.name,
    artist: track.artist["#text"],
    albumArt,
    isPlaying: isRecord(track["@attr"]) && track["@attr"].nowplaying === "true",
    trackUrl:
      "https://open.spotify.com/search/" +
      encodeURIComponent(track.name + " " + track.artist["#text"]),
  };
}

export function parseMusic(value: unknown): MusicData {
  if (!isRecord(value)) return { kind: "unavailable" };
  if (value.kind === "idle") return { kind: "idle" };
  if (
    value.kind !== "track" ||
    typeof value.title !== "string" ||
    typeof value.artist !== "string" ||
    typeof value.isPlaying !== "boolean"
  )
    return { kind: "unavailable" };
  const trackUrl = httpsUrl(value.trackUrl);
  if (!trackUrl) return { kind: "unavailable" };
  return {
    kind: "track",
    title: value.title,
    artist: value.artist,
    isPlaying: value.isPlaying,
    albumArt: httpsUrl(value.albumArt),
    trackUrl,
  };
}
