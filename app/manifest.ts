import type { MetadataRoute } from "next";
import { webAppManifest } from "@/lib/pwa.mjs";

export default function manifest(): MetadataRoute.Manifest {
  return webAppManifest as MetadataRoute.Manifest;
}
