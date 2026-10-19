import type { NextConfig } from "next";
import { serviceWorkerHeaders } from "./lib/pwa.mjs";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [...serviceWorkerHeaders],
      },
    ];
  },
};

export default nextConfig;
