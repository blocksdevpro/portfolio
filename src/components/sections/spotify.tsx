"use client";

import React, { useEffect, useState } from "react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  trackUrl?: string;
}

const SpotifyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1DB954" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

export const SpotifyNowPlaying: React.FC = () => {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/spotify");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch Spotify data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, []);

  // Loading skeleton — matches the compact bar style
  if (loading) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-2 border border-border rounded-md animate-pulse">
        <div className="w-8 h-8 rounded bg-muted shrink-0" />
        <SpotifyIcon className="w-4 h-4 shrink-0 opacity-30" />
        <div className="h-2.5 w-32 rounded bg-muted" />
      </div>
    );
  }

  // Has track data (currently playing or recently played)
  if (data?.title) {
    return (
      <a
        href={data.trackUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2.5 px-3 py-2 border border-border rounded-md hover:bg-primary-foreground transition-all duration-200 group"
      >
        {/* Album Art */}
        {data.albumArt && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.albumArt}
            alt={data.album}
            className="w-8 h-8 rounded shadow-sm shrink-0"
          />
        )}

        <SpotifyIcon className="w-4 h-4 shrink-0" />

        {data.isPlaying && (
          <div className="flex items-end gap-[2px] h-3 shrink-0">
            <span className="spotify-bar w-[2.5px] rounded-full bg-[#1DB954]" style={{ animationDelay: "0s" }} />
            <span className="spotify-bar w-[2.5px] rounded-full bg-[#1DB954]" style={{ animationDelay: "0.2s" }} />
            <span className="spotify-bar w-[2.5px] rounded-full bg-[#1DB954]" style={{ animationDelay: "0.4s" }} />
          </div>
        )}

        <span className="text-xs text-muted-foreground truncate">
          {data.isPlaying ? "Listening to" : "Last played"}
          {" "}
          <span className="font-medium text-foreground group-hover:underline underline-offset-4">
            {data.title}
          </span>
          {" "}
          <span className="text-muted-foreground">by</span>
          {" "}
          <span className="font-medium text-foreground">
            {data.artist}
          </span>
        </span>
      </a>
    );
  }

  // No track data at all — minimal fallback
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 border border-border rounded-md">
      <SpotifyIcon className="w-4 h-4 shrink-0" />
      <span className="text-xs text-muted-foreground">
        Not playing anything right now
      </span>
    </div>
  );
};
