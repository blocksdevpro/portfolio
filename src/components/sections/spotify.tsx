"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MusicNotes } from "@phosphor-icons/react";
import { parseMusic, type MusicData } from "@/lib/widget-data";

export function SpotifyNowPlaying() {
  const [music, setMusic] = useState<MusicData | { kind: "loading" }>({
    kind: "loading",
  });
  useEffect(() => {
    const controller = new AbortController();
    let pending = false;
    async function load() {
      if (document.hidden || pending) return;
      pending = true;
      try {
        const response = await fetch("/api/spotify", {
          signal: controller.signal,
        });
        const data: unknown = await response.json();
        if (!controller.signal.aborted) setMusic(parseMusic(data));
      } catch {
        if (!controller.signal.aborted) setMusic({ kind: "unavailable" });
      } finally {
        pending = false;
      }
    }
    void load();
    const timer = setInterval(load, 30_000);
    document.addEventListener("visibilitychange", load);
    return () => {
      controller.abort();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", load);
    };
  }, []);

  return (
    <div className="music-widget">
      {music.kind === "track" ? (
        <div className="music-row">
          {music.albumArt ? (
            <Image
              src={music.albumArt}
              width={32}
              height={32}
              alt=""
              unoptimized
              referrerPolicy="no-referrer"
            />
          ) : (
            <MusicNotes size={18} aria-hidden="true" />
          )}
          {music.isPlaying && (
            <span className="music-equalizer" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          )}
          <span>
            {music.isPlaying ? "On repeat right now" : "Last listened to"}
            <br />
            <a href={music.trackUrl} target="_blank" rel="noopener noreferrer">
              {music.title}
            </a>
            <span> · {music.artist}</span>
          </span>
        </div>
      ) : (
        <div className="music-row">
          <MusicNotes size={17} aria-hidden="true" />
          <span>
            {music.kind === "loading"
              ? "Loading listening activity…"
              : music.kind === "idle"
                ? "Nothing on the turntable right now."
                : "Listening activity is unavailable."}
          </span>
        </div>
      )}
    </div>
  );
}
