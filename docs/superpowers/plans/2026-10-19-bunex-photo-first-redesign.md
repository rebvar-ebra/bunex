# BUNEX Photo-First Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the BUNEX homepage as a photo-first, condensed-type restaurant experience that is materially closer to the Goldies reference while remaining original and preserving all BUNEX content and behavior.

**Architecture:** Keep the existing App Router page and client menu component boundaries. Replace the visual composition through targeted JSX hooks, a new Barlow font pairing, and a rewritten global design layer; retain all data modules and browser-memory logic.

**Tech Stack:** Next.js 16.4.2, React 19.3.1, TypeScript, global CSS, next/image, next/font

**Spec:** `docs/superpowers/specs/2026-10-19-bunex-photo-first-redesign.md`

## Global Constraints

- Work on branch `redesign-v2`.
- Preserve all BUNEX content, menu data, review excerpts, URLs, and interaction behavior.
- Use only BUNEX assets; do not copy Goldies assets, logo, copy, or exact layout.
- Add no runtime dependencies.
- Keep only the existing menu showcase as a client component.
- Maintain 44px targets, visible focus, reduced motion, WCAG AA contrast, and no page-level overflow from 320px through 1440px.
- Update README.md.
- After verification, merge to `main` and push without requesting another confirmation.

## Review Focus

- At 320px and 375px, the hero overlay must remain readable and all CTA text must remain visible.
- At 768px, ticker, menu controls, cards, and review cards must fit without clipped content.
- Local category/favorite memory must survive a reload and remain user-forgettable.
- All Google review links and external order/map links must remain correctly attributed.
- The result must resemble the reference’s visual rhythm without reusing its protected brand assets or exact composition.

---

### Task 1: Lock the v2 design contract

**Files:**
- Modify: `tests/redesign.test.mjs`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: current semantic sections and component boundaries.
- Produces: `announcementBar`, `heroOverlay`, `menuDeck`, Barlow font variables.

- [ ] Replace Street Press assertions with failing photo-first composition and typography assertions.
- [ ] Run `node --test tests/redesign.test.mjs` and confirm expected failures.
- [ ] Add the minimal font and composition hooks.
- [ ] Run `npm test` and confirm all tests pass.
- [ ] Commit with `feat: establish photo-first BUNEX composition`.

### Task 2: Build the visual system

**Files:**
- Modify: `app/globals.css`
- Modify: `components/menu-showcase.tsx`
- Modify: `components/review-wall.tsx`
- Test: `tests/redesign.test.mjs`

**Interfaces:**
- Consumes: Task 1 hooks.
- Produces: responsive hero overlay, pill controls, rounded menu cards, image-led story, dark review field, and location CTA.

- [ ] Add failing tests for palette, pill geometry, rounded cards, contrast, and responsive breakpoints.
- [ ] Run the focused test and confirm expected failures.
- [ ] Replace the Street Press override layer with the photo-first design system.
- [ ] Add only presentation hooks to menu and review components; do not modify state or storage logic.
- [ ] Run `npm test` and confirm all tests pass.
- [ ] Commit with `feat: build Goldies-inspired BUNEX visual system`.

### Task 3: Verify, document, and integrate

**Files:**
- Modify: `README.md`
- Test: `tests/redesign.test.mjs`

**Interfaces:**
- Consumes: completed homepage.
- Produces: verified and documented release.

- [ ] Add regression assertions for 320px shrinking, tablet layout, touch targets, reduced motion, and local-memory hooks.
- [ ] Run the focused test RED then GREEN for any corrections.
- [ ] Verify live layouts at 320, 375, 768, 1024, 1280, and 1440px.
- [ ] Verify filter, favorite, reload persistence, disclosure, links, accessibility tree, and console.
- [ ] Update README.md with the photo-first direction and workflow.
- [ ] Run `npm test && npm run build && git diff --check`.
- [ ] Request a read-only whole-branch review and resolve Critical/Important findings.
- [ ] Commit with `docs: verify photo-first redesign`.
- [ ] Merge `redesign-v2` into `main`, rerun tests/build, and push `main`.

