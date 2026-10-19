# BUNEX Street Press Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recast the existing BUNEX homepage as an original, photo-led “Street Press” experience while preserving every current content item, link, behavior, and accessibility contract.

**Architecture:** Keep the existing Next.js page and component boundaries, making only small semantic wrapper/class changes where the new composition needs them. Put the visual system in `app/globals.css`, retain the current server/client split and data modules, and protect preserved behavior with source-contract tests plus browser verification.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, `next/image`, Node.js test runner

**Spec:** `docs/superpowers/specs/2026-10-19-bunex-street-press-redesign.md`

## Global Constraints

- Work only on branch `redesign`.
- Preserve every existing visible content item, navigation target, menu item, price, review, opening-hours rule, external link, accessibility label, and local preference behavior.
- Do not reproduce Goldies’ layout, assets, logo, typography, copy, or animation.
- Continue using only Karla and Playfair Display and the existing BUNEX photography.
- Add no dependencies, paid APIs, remote runtime assets, accounts, analytics, cookie banners, or loyalty systems.
- Keep body text at least 16px, controls at least 44px, visible keyboard focus, reduced-motion support, static rendering, and no horizontal page scrolling.
- Update `README.md` when the visual redesign is complete.

## Review Focus

- A 320px-wide viewport must retain every heading and German compound word without horizontal overflow; Task 4 adds a CSS contract and browser measurement.
- Keyboard and touch users must be able to identify and operate filters, favorites, details, and CTAs without hover; Tasks 1 and 4 protect semantic controls and inspect focus/touch sizing.
- Saved category and favorite state must survive the visual restructuring unchanged; Task 1 runs the preference suite and preserves component logic.
- The hero and product images must retain reserved geometry without cumulative layout shift; Tasks 2 and 3 keep `next/image` fill containers with explicit aspect ratios.
- Review attribution must remain readable on every card color, including the brick-red card; Task 3 preserves and verifies the full-opacity contrast rule.

---

### Task 1: Lock Content and Structural Preservation

**Files:**
- Modify: `tests/redesign.test.mjs`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: Existing `MenuShowcase`, `OpeningStatus`, and `ReviewWall` component APIs without prop changes.
- Produces: Stable `streetTicker`, `heroPoster`, `sectionIndex`, and section composition hooks used by Tasks 2–4.

- [ ] **Step 1: Write failing preservation and composition tests**

Create source-contract tests named `preserves every homepage section and ordering action`, `adds original street press composition hooks`, and `keeps interactive component boundaries unchanged`. Assert the current anchors, visible text markers, component calls, external URLs, semantic section headings, and the four new composition hooks.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/redesign.test.mjs`

Expected: FAIL because the Street Press composition hooks do not exist yet.

- [ ] **Step 3: Add minimal structural hooks in `app/page.tsx`**

Introduce only the wrappers/classes needed for the original hero poster, proof ticker, section indices, and offset editorial layouts. Do not remove or rewrite visible content, links, accessibility labels, component calls, or `next/image` behavior.

- [ ] **Step 4: Run focused and full suites**

Run: `node --test tests/redesign.test.mjs && npm test`

Expected: all tests pass, including menu-memory and opening-hours tests.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx tests/redesign.test.mjs
git commit -m "test: lock redesign content and structure"
```

### Task 2: Establish the Street Press Foundation and Hero

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/redesign.test.mjs`

**Interfaces:**
- Consumes: Task 1 composition hooks and existing CSS class names.
- Produces: Color, spacing, border, typography, focus, header, button, hero, and proof-strip rules inherited by Task 3.

- [ ] **Step 1: Add failing visual-system contract tests**

Assert semantic BUNEX color variables, fluid body/hero type with `clamp()`, `font-feature-settings`, sharp poster geometry, a reserved hero image container, minimum 44px actions, visible `:focus-visible`, and reduced-motion handling.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/redesign.test.mjs`

Expected: FAIL because the new tokens and Street Press rules are absent.

- [ ] **Step 3: Implement the foundation, header, hero, and proof strip**

Rework the root tokens and the CSS through the proof strip. Use Karla for direct display text and Playfair only as a limited editorial accent; use full-bleed BUNEX photography, asymmetric offset blocks, strong rules, and original placement rather than the reference site’s centered overlay.

- [ ] **Step 4: Run the focused test and inspect the first view**

Run: `node --test tests/redesign.test.mjs`

Then inspect at 375px and 1440px. Expected: no horizontal overflow, readable hero copy, visible status and actions, stable image geometry, and a composition visually distinct from Goldies.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tests/redesign.test.mjs
git commit -m "feat: establish BUNEX street press direction"
```

### Task 3: Redesign Menu, Story, Reviews, Visit, and Footer

**Files:**
- Modify: `app/globals.css`
- Modify: `components/menu-showcase.tsx`
- Modify: `components/review-wall.tsx`
- Modify: `tests/redesign.test.mjs`
- Test: `tests/menu-preferences.test.mjs`
- Test: `tests/reviews.test.mjs`

**Interfaces:**
- Consumes: Task 2 tokens, buttons, type hierarchy, and section foundations.
- Produces: Complete responsive section/card/control styling without changing component public APIs or stored data.

- [ ] **Step 1: Add failing section and interaction contract tests**

Assert poster-grid hooks for products and reviews, tabular price styling, reserved product aspect ratios, filter/favorite minimum targets, blockquote wrapping, red-card attribution opacity, and the retained local-memory disclosure and reset control.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `node --test tests/redesign.test.mjs tests/reviews.test.mjs tests/menu-preferences.test.mjs`

Expected: FAIL only on the new redesign contracts.

- [ ] **Step 3: Add minimal semantic class hooks to the existing components**

Add presentation-only class names or wrappers where required. Preserve state, storage key, event handlers, data iteration, copy, source links, labels, and component exports.

- [ ] **Step 4: Implement all remaining section styles**

Create the editorial product grid, strong selected/focus states, black/yellow smash spread, original review collage, visit signposting, compact footer, and unobstructive mobile order bar. Avoid hover-only information and reserve image dimensions.

- [ ] **Step 5: Run focused and full suites**

Run: `node --test tests/redesign.test.mjs tests/reviews.test.mjs tests/menu-preferences.test.mjs && npm test`

Expected: all tests pass and all eight products retain their existing names, prices, images, filters, and favorite behavior.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css components/menu-showcase.tsx components/review-wall.tsx tests/redesign.test.mjs
git commit -m "feat: redesign BUNEX content sections"
```

### Task 4: Responsive, Accessibility, Documentation, and Release Verification

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/redesign.test.mjs`
- Modify: `README.md`

**Interfaces:**
- Consumes: Complete page from Tasks 1–3.
- Produces: Verified release candidate on branch `redesign` with current documentation.

- [ ] **Step 1: Add failing responsive safeguards where browser inspection exposes gaps**

Pin any discovered issue with a focused source contract, including 320px word wrapping, safe mobile bottom padding, reduced-motion behavior, and preserved focus visibility.

- [ ] **Step 2: Correct only verified responsive or accessibility defects**

Use mobile-first breakpoints and CSS fixes without changing content or component behavior.

- [ ] **Step 3: Update `README.md`**

Describe the BUNEX Street Press direction, retained feature set, responsive/accessibility guarantees, and unchanged content-maintenance locations.

- [ ] **Step 4: Run complete automated verification**

Run: `npm test && npm run build && git diff --check`

Expected: zero test failures, successful TypeScript/production build, static `/` route, and no whitespace errors.

- [ ] **Step 5: Complete browser verification**

Inspect 320px, 375px, 768px, 1024px, 1280px, and 1440px widths. Check page and internal text overflow, touch sizes, keyboard focus, filter/favorite/details behavior, local-memory persistence, source links, accessibility tree, reduced motion, mobile order-bar clearance, and visual originality against the reference.

- [ ] **Step 6: Request whole-branch review and resolve findings**

Compare `main...redesign`, classify every finding, fix accepted Critical/Important issues with regression coverage, and record rulings for declined or deferred findings.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css tests/redesign.test.mjs README.md
git commit -m "docs: finalize and verify street press redesign"
```
