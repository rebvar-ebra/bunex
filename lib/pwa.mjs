export const webAppManifest = Object.freeze({
  name: "BUNEX Smashburger",
  short_name: "BUNEX",
  description: "BUNEX Smashburger in Teltow — knusprig gesmasht, saftig serviert.",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#0a0a08",
  theme_color: "#ffec00",
  lang: "de",
  categories: Object.freeze(["food", "lifestyle"]),
  icons: Object.freeze([
    Object.freeze({ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }),
    Object.freeze({ src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }),
    Object.freeze({
      src: "/icons/icon-maskable-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    }),
  ]),
});

export const serviceWorkerRegistration = Object.freeze({
  scriptURL: "/sw.js",
  options: Object.freeze({ scope: "/", updateViaCache: "none" }),
});

export function shouldRegisterServiceWorker(environment) {
  return environment === "production";
}
