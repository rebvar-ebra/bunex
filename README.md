# BUNEX Smashburger

The official website for BUNEX Smashburger in Teltow. It presents the restaurant, photographed menu, opening status, customer reviews, directions, and direct online ordering in a fast, responsive photo-first experience.

## Current features

- Responsive restaurant landing page in German
- Original photo-first design with a full-bleed food hero and bold menu deck
- Real BUNEX menu photography and published prices
- Beef, chicken, veggie, and side filters
- Locally remembered menu category and favorite
- Live open/closed status using Europe/Berlin time
- Curated Google review wall with transparent manual-update date
- Direct links for online ordering, Google Maps, and Instagram
- Footer ownership and developer attribution
- Installable Progressive Web App for phones and desktops
- Versioned offline support with a branded, self-contained fallback page
- Keyboard navigation, semantic landmarks, and mobile ordering bar
- Static rendering for a lightweight production deployment

## Design direction

The interface combines BUNEX yellow, near-black, warm white, full-bleed restaurant photography, pill-shaped controls, and rounded white menu cards. Barlow supplies readable mixed-case headings and body text; Barlow Condensed is reserved for the compact brand mark and badge. The hero heading scales from 32–44px on phones to a maximum of 64px on desktop; section headings stay within 28–44px, menu names at 18px, and review text at 18px. These bounds, comfortable line spacing, and compact section spacing keep content ahead of decorative typography.

The hero text participates in normal layout flow with reserved space below the navigation, so shorter screens and enlarged text do not cause clipping or overlap. Emphasized text on yellow sections inherits the dark text color to keep every word visible. When changing typography, verify the rendered layout at desktop and mobile widths, including 200% zoom, rather than only checking CSS values.

The responsive system scales from a four-column desktop menu to two columns on tablets and one column on phones. The mobile hero keeps the photograph and ordering action prominent, with a persistent bottom order bar. Every layout retains visible keyboard focus, 44px minimum controls, reduced-motion support, safe order-bar clearance, and protected wrapping for long German words.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Native Web App Manifest, Service Worker, and Cache Storage APIs
- CSS without a component-library dependency
- Node.js built-in test runner

## Local development

Requirements: a current Node.js release and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev     # Start the development server
npm test        # Run the automated test suite
npm run build   # Create and type-check the production build
npm run start   # Serve the completed production build
```

Before merging changes, run both:

```bash
npm test
npm run build
```

The responsive release checklist covers 320, 375, 768, 1024, 1280, and 1440px viewports. It also verifies menu filters, favorite persistence, the local-storage disclosure, external destinations, the accessibility tree, and browser-console output.

## Project structure

```text
app/          Page composition, metadata, and global styles
assets/       Imported source imagery
components/   Interactive and presentational page sections, including PWA registration
lib/          Menu, opening-hours, preferences, reviews, and PWA configuration
public/       Public photography, icons, offline page, and service worker
tests/        Node-based behavior and integration tests
docs/         Design specifications and implementation plans
```

## Updating restaurant content

- Menu items and prices: `lib/menu.mjs`
- Opening hours: `lib/opening-hours.mjs`
- Curated review excerpts: `lib/reviews.mjs`
- Address, ordering, Maps, and Instagram links: `app/page.tsx`
- Page metadata: `app/layout.tsx`
- Editorial photo for the “Warum Smash?” section: `public/bunex-smash-process.jpg`

Google reviews are intentionally curated without a paid API. When changing them, verify the wording against the public source, keep the source link intact, update `reviewUpdateLabel`, and run the tests.

## Progressive Web App maintenance

The production site registers `public/sw.js`; development mode deliberately does not. After visiting the production site once, supported browsers can install BUNEX from their browser menu. The self-contained `public/offline.html` fallback is always available after installation; pages are cached only after a service-worker-controlled online visit, so incomplete Next.js HTML is never presented as a working offline page.

When changing the precached shell or caching behavior, increment `CACHE_VERSION` in `public/sw.js`. Keep the icon paths in `app/manifest.ts` and `PRECACHE_URLS` aligned, retain the `/sw.js` security headers in `next.config.ts`, and run both the automated tests and production build. Ordering, Maps, Instagram, Google reviews, and all other cross-origin requests remain network-only by design.

## Contribution workflow

All changes are developed on a separate branch and merged into `main` only after verification. Once verified, changes are merged and pushed without another confirmation. Keep this README current whenever a change affects features, setup, commands, architecture, content-maintenance instructions, or the contribution workflow.
