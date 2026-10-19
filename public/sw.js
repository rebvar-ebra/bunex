const CACHE_VERSION = "bunex-pwa-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const ACTIVE_CACHES = new Set([STATIC_CACHE, RUNTIME_CACHE]);
const PRECACHE_URLS = [
  "/",
  "/offline.html",
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name.startsWith("bunex-pwa-") && !ACTIVE_CACHES.has(name))
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

async function rememberResponse(cacheName, request, response) {
  if (!response.ok) return;

  await caches
    .open(cacheName)
    .then((cache) => cache.put(request, response.clone()))
    .catch(() => {
      // Cache quota errors must never prevent a successful network response.
    });
}

async function handleNavigation(request) {
  try {
    const response = await fetch(request);
    await rememberResponse(RUNTIME_CACHE, request, response);
    return response;
  } catch {
    return (
      (await caches.match(request)) ||
      (await caches.match("/offline.html"))
    );
  }
}

async function handleStaticAsset(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  await rememberResponse(RUNTIME_CACHE, request, response);
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (["font", "image", "script", "style"].includes(request.destination)) {
    event.respondWith(handleStaticAsset(request));
  }
});
