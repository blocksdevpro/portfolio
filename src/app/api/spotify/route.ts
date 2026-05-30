import { NextResponse } from "next/server";

const LASTFM_API_URL = "http://ws.audioscrobbler.com/2.0/";
const api_key = process.env.LASTFM_API_KEY!;
const username = process.env.LASTFM_USERNAME!;

interface LastFmImage {
  size: string;
  "#text": string;
}

interface LastFmTrack {
  name: string;
  artist: { "#text": string };
  album: { "#text": string };
  image: LastFmImage[];
  url: string;
  "@attr"?: { nowplaying: string };
}

export async function GET() {
  try {
    const res = await fetch(
      `${LASTFM_API_URL}?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json&limit=1`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("[LastFM] API error:", res.status);
      return NextResponse.json({ isPlaying: false });
    }

    const data = await res.json();
    const tracks: LastFmTrack[] = data.recenttracks?.track;

    if (!tracks || tracks.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = tracks[0];
    const isPlaying = track["@attr"]?.nowplaying === "true";

    // Get the largest available image
    const albumArt =
      track.image?.find((img) => img.size === "extralarge")?.["#text"] ||
      track.image?.find((img) => img.size === "large")?.["#text"] ||
      "";

    // Link to Spotify search for this track
    const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(`${track.name} ${track.artist["#text"]}`)}`;

    return NextResponse.json({
      isPlaying,
      title: track.name,
      artist: track.artist["#text"],
      album: track.album["#text"],
      albumArt: albumArt || undefined,
      trackUrl: spotifySearchUrl,
    });
  } catch (error) {
    console.error("[LastFM] API error:", error);
    return NextResponse.json({ isPlaying: false });
  }
}
