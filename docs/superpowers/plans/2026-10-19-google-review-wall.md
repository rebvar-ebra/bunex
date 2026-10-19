# BUNEX Google Review Wall Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive, no-cost community review wall containing three curated Google review excerpts and a clear link to the live BUNEX Google Maps listing.

**Architecture:** Keep review content in a small framework-neutral data module so its maintenance contract can be tested with Node’s built-in test runner. Render that data through a server component inserted into the existing static App Router page, and extend the existing global stylesheet for the approved community-wall presentation.

**Tech Stack:** Next.js 16.4.2 App Router, React 19 server components, TypeScript, global CSS, Node test runner

**Spec:** `docs/superpowers/specs/2026-10-19-google-review-wall-design.md`

## Global Constraints

- No Google Places API, Google Cloud billing, API key, third-party widget, runtime fetch, scraping, or new dependency.
- Use exactly three approved excerpts and do not invent ratings, authors, dates, or aggregate scores.
- Every review card and the section CTA must link to the BUNEX Google Maps listing in a new tab with safe external-link attributes.
- State that the reviews are a curated selection and identify the manual maintenance date.
- Preserve the page as statically prerendered content and follow the existing global-CSS architecture.
- Maintain keyboard access, visible focus, semantic quotation markup, comfortable touch targets, reduced-motion behavior, and responsive layouts from 320px upward.

## Review Focus

- Missing optional reviewer names must render a neutral “Google-Rezension” label without an empty author element; Task 1 tests this data case and Task 2 renders it conditionally.
- Excerpts must not silently change or become empty during manual maintenance; Task 1 tests exact non-empty approved copy.
- External links must not expose the opener window; Task 2 verifies `target="_blank"` and `rel="noreferrer"` through source assertions and the production build.
- Very narrow screens must not overflow or create unreadably narrow cards; Task 2 adds a one-column 320px layout and verifies it in the local browser.
- The section must remain understandable without color or decorative symbols; Task 2 uses headings, quotation elements, source text, and descriptive links, then verifies the accessibility tree.

---

### Task 1: Curated review content contract

**Files:**
- Create: `lib/reviews.mjs`
- Create: `tests/reviews.test.mjs`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `googleMapsReviewsUrl: string`, `reviewsUpdatedLabel: string`, and `reviews: ReadonlyArray<{ id: string; quote: string; reviewer?: string; sourceLabel: string }>`.
- Consumes: The exact excerpts and attribution limits in the approved design spec.

- [ ] **Step 1: Write the failing content-contract test**

Create tests named `publishes exactly the three approved review excerpts`, `keeps each review attributable and linkable`, and `supports a review without a public reviewer name`. Assert the exact copy, three unique IDs, non-empty source labels, the BUNEX Google Maps URL, and that unnamed entries omit `reviewer`.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/reviews.test.mjs`

Expected: FAIL because `lib/reviews.mjs` does not exist.

- [ ] **Step 3: Implement the static review data module**

Create the exports defined above in `lib/reviews.mjs`, using `Oktober 2026` as the manual maintenance label and the existing BUNEX Maps search target for Potsdamer Str. 61, Teltow.

- [ ] **Step 4: Ignore brainstorming artifacts**

Add `.superpowers/` to `.gitignore` so visual-companion mockups never enter production commits.

- [ ] **Step 5: Run the focused test to verify it passes**

Run: `node --test tests/reviews.test.mjs`

Expected: 3 tests pass, 0 fail.

- [ ] **Step 6: Commit the content contract**

```bash
git add .gitignore lib/reviews.mjs tests/reviews.test.mjs docs/superpowers/specs/2026-10-19-google-review-wall-design.md docs/superpowers/plans/2026-10-19-google-review-wall.md
git commit -m "test: define curated review content"
```

### Task 2: Community review wall

**Files:**
- Create: `components/review-wall.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/reviews.test.mjs`

**Interfaces:**
- Consumes: `reviews`, `googleMapsReviewsUrl`, and `reviewsUpdatedLabel` from Task 1.
- Produces: `ReviewWall(): JSX.Element`, a static server component rendered between `smashSection` and `visitSection`.

- [ ] **Step 1: Add failing integration-contract assertions**

Extend `tests/reviews.test.mjs` with a test named `wires the accessible review wall into the homepage`. Read the component and page sources and assert the section heading ID, `blockquote` use, conditional reviewer output, descriptive Google Maps link text, safe external-link attributes, and `<ReviewWall />` placement after the smash section and before the visit section.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/reviews.test.mjs`

Expected: FAIL because `components/review-wall.tsx` and the homepage integration do not exist.

- [ ] **Step 3: Implement `ReviewWall()`**

Create a server component with a `section` labelled by its `h2`, a three-item semantic list, one `blockquote` per entry, conditional reviewer/date attribution, a visible “Google Maps” source label, the manual-selection disclosure, and a large “Alle Google-Rezensionen ansehen” link. Keep decorative marks hidden from assistive technology.

- [ ] **Step 4: Insert the section into the homepage**

Import and render `<ReviewWall />` in `app/page.tsx` immediately after `smashSection` and before `visitSection`; do not convert the page to a client component.

- [ ] **Step 5: Add the approved community-wall styling**

Extend `app/globals.css` with a dark section shell, yellow/red/cream review tiles, asymmetric desktop grid, readable display typography, visible source/maintenance text, hover/focus treatment consistent with existing controls, a two-column tablet layout, and a single-column mobile layout without horizontal overflow.

- [ ] **Step 6: Run automated verification**

Run: `npm test && npm run build`

Expected: all tests pass; the Next.js build exits 0 and reports `/` as statically prerendered.

- [ ] **Step 7: Verify the rendered section in the local browser**

Inspect desktop and mobile widths. Confirm section order, exact quotes, readable attribution, working Maps links, keyboard focus, no clipping at 320px, and an accessibility tree containing one labelled section and three quotations.

- [ ] **Step 8: Commit the review wall**

```bash
git add app/page.tsx app/globals.css components/review-wall.tsx tests/reviews.test.mjs
git commit -m "feat: add curated Google review wall"
```
