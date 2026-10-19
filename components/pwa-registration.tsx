"use client";

import { useEffect } from "react";
import { serviceWorkerRegistration, shouldRegisterServiceWorker } from "@/lib/pwa.mjs";

export function PwaRegistration() {
  useEffect(() => {
    if (
      !shouldRegisterServiceWorker(process.env.NODE_ENV) ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    navigator.serviceWorker
      .register(serviceWorkerRegistration.scriptURL, serviceWorkerRegistration.options)
      .catch(() => {
        // The website remains fully usable if this browser rejects PWA registration.
      });
  }, []);

  return null;
}
