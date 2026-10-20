"use client";

import { useState } from "react";

const announcement = "BUNEX Teltow · Frisch gesmasht · Sieben Tage die Woche · BUNEX Teltow · Frisch gesmasht";

export function AnnouncementTicker() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <p className="screenReaderOnly">{announcement}</p>
      <div className="announcementViewport" aria-hidden="true">
        <div className="announcementTrack" data-paused={paused}>
          <span>{announcement} ·</span>
          <span>{announcement} ·</span>
        </div>
      </div>
      <button
        type="button"
        className="announcementToggle"
        aria-label={paused ? "Lauftext fortsetzen" : "Lauftext pausieren"}
        onClick={() => setPaused((current) => !current)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {paused
            ? <path d="M8 5v14l11-7Z" />
            : <path d="M6 5h4v14H6Zm8 0h4v14h-4Z" />}
        </svg>
      </button>
    </>
  );
}
