# BUNEX Progressive Web App Design

## Goal

Turn the existing BUNEX website into an installable, native-feeling Progressive Web App without changing its restaurant content or adding a third-party PWA dependency.

## Experience

- Browsers can install the site to a phone or desktop home screen.
- The installed app opens in standalone mode with BUNEX yellow browser chrome.
- BUNEX uses crisp 192 px and 512 px application icons plus a maskable 512 px icon.
- A previously visited page can reopen when the connection is unavailable.
- If a requested page is not cached, a compact German BUNEX offline page explains the state and provides a retry action.
- Ordering, Maps, Instagram, Google reviews, and all other cross-origin destinations remain network-only.

## Architecture

Use Next.js App Router's native `app/manifest.ts` metadata convention. A small client component registers a custom service worker in production. The service worker is served from `public/sw.js` with strict response headers configured in `next.config.ts`.

The service worker uses two versioned caches:

- A static cache for the self-contained offline page, favicon, and install icons.
- A runtime cache for successful same-origin navigations and static image, font, script, and stylesheet requests.

Navigations use network-first behavior so restaurant content stays current. When the network fails, the worker checks the runtime cache before the static cache and otherwise returns the offline page. The home document is not precached because incomplete Next.js HTML without its hashed application assets would be unreliable; until a controlled online navigation has cached the complete page and its same-origin assets, the guaranteed self-contained fallback is used. Static assets use cache-first behavior after their first successful load. Only `GET` requests on the BUNEX origin are intercepted.

Activation deletes only obsolete cache entries with the BUNEX PWA prefix, so unrelated browser cache data is never touched. The registration asks the browser not to cache the service-worker script, and the server gives `/sw.js` the official Next.js guide's JavaScript content type, no-cache policy, and same-origin content security policy.

## Identity

- Name: `BUNEX Smashburger`
- Short name: `BUNEX`
- Language: German
- Start URL and scope: `/`
- Display: `standalone`
- Theme color: `#ffec00`
- Background color: `#0a0a08`
- Categories: `food`, `lifestyle`

The icons reuse the existing B-shaped BUNEX favicon language: near-black field, vivid yellow mark, and generous safe space for maskable cropping.

## Offline Page

The fallback is a self-contained `public/offline.html` file with inline styles and no dependency on Next.js JavaScript or font files. It shows the BUNEX mark, a clear German offline message, and a button that reloads the home page. This guarantees a useful response even when no application chunks have been cached yet.

## Boundaries

- No push notifications, background sync, location tracking, or custom install banner.
- No cache of non-GET requests or cross-origin resources.
- No change to menu, reviews, restaurant information, or the existing visual direction.
- Service-worker registration is production-only to avoid stale development bundles.

## Verification

- Automated tests validate the manifest contract, icon dimensions, production-only registration, service-worker request boundaries and fallback order, response headers, and README documentation.
- A production build must complete successfully.
- A production server check must confirm the manifest and service-worker headers, and a browser check must confirm that the service worker reaches the activated state.
