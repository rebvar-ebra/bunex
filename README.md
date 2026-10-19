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
- Keyboard navigation, semantic landmarks, and mobile ordering bar
- Static rendering for a lightweight production deployment

## Design direction

The interface uses a deliberately bold BUNEX visual language: vivid yellow, near-black, warm white, full-bleed restaurant photography, oversized Barlow Condensed headlines, pill-shaped controls, and rounded white menu cards. The result takes inspiration from contemporary smashburger sites while keeping BUNEX content, photography, functionality, and identity original.

The responsive system scales from a four-column desktop menu to two columns on tablets and one column on phones. The mobile hero keeps the photograph and ordering action prominent, with a persistent bottom order bar. Every layout retains visible keyboard focus, 44px minimum controls, reduced-motion support, safe order-bar clearance, and protected wrapping for long German words.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
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
components/   Interactive and presentational page sections
lib/          Menu, opening-hours, preferences, and review data
public/       Public menu photography and favicon
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

## Contribution workflow

All changes are developed on a separate branch and merged into `main` only after verification. Once verified, changes are merged and pushed without another confirmation. Keep this README current whenever a change affects features, setup, commands, architecture, content-maintenance instructions, or the contribution workflow.
