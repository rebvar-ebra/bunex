"use client";

import { useEffect, useState } from "react";
import { getOpeningStatusForDate } from "@/lib/opening-hours.mjs";

type OpeningStatusProps = {
  compact?: boolean;
};

export function OpeningStatus({ compact = false }: OpeningStatusProps) {
  const [status, setStatus] = useState<{ isOpen: boolean; label: string } | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpeningStatusForDate());
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const label = status
    ? compact
      ? status.isOpen
        ? "Jetzt geöffnet"
        : "Aktuell geschlossen"
      : status.label
    : compact
      ? "Öffnungszeiten"
      : "Öffnungszeiten werden geladen";

  return (
    <span className={`openingStatus ${status?.isOpen ? "isOpen" : ""}`} role="status" aria-live="polite">
      <i aria-hidden="true" />
      {label}
    </span>
  );
}
