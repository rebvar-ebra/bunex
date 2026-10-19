# BUNEX Street Press Redesign

## Intent

Redesign the existing BUNEX homepage with the energetic, image-led confidence of contemporary smashburger brands while remaining recognizably BUNEX and not reproducing Goldies’ layout, logo treatment, typography, copy, or assets. The redesign changes presentation only: every existing piece of restaurant content, navigation target, menu item, price, review, opening-hours rule, external link, accessibility label, and local preference behavior remains available.

The branch is named `redesign`.

## Goals

- Make the page feel louder, younger, and more street-food-forward.
- Give real BUNEX food photography more visual authority.
- Create a clearer path from first impression to menu exploration and ordering.
- Improve type scale, line length, hierarchy, and mobile readability.
- Keep the current accessibility, performance, and static-rendering strengths.
- Keep the README accurate after the visual changes.

## Non-goals

- Do not copy Goldies’ page composition, proprietary graphics, branding, fonts, copy, photography, or animation.
- Do not add new restaurant claims, menu products, prices, locations, reviews, legal text, or integrations.
- Do not remove or rewrite existing visible content.
- Do not add an account, paid API, analytics, cookie banner, loyalty system, or personalization service.
- Do not change the menu-memory storage contract or opening-hours logic.

## Visual direction: “BUNEX Street Press”

The page will combine bold food-poster composition with the current BUNEX editorial character:

- Use BUNEX yellow, warm cream, near-black, brick red, and status green as a disciplined high-contrast palette.
- Favor sharp edges, strong rules, oversized numbers, offset blocks, and deliberately asymmetric desktop grids.
- Retain the existing Karla and Playfair Display pairing. Karla provides the loud, direct street-food voice; Playfair supplies a limited BUNEX-specific editorial accent so the result does not imitate the all-condensed-sans reference.
- Replace decorative softness and excessive pill shapes with squared or lightly clipped poster forms. Pills remain only where they communicate control state or compact status.
- Use large, tightly set headings without reducing body readability. Body text stays at least 16px, uses a comfortable line height, and is constrained to readable measures.
- Use the current real food photography only. No reference-site imagery or generated substitutes.

## Page treatment

### Header and first view

- Keep the current sticky header content and links.
- Increase brand presence and simplify the header into a crisp cream/black bar with a prominent yellow order action.
- Turn the hero into a photo-led poster composition. The burger image occupies the dominant field while the current eyebrow, heading, introduction, actions, status, badge, caption, and alt text remain present.
- Use offset copy blocks and strong rules rather than reproducing the reference site’s centered overlay arrangement.

### Proof strip and menu

- Restyle the proof strip as a high-energy repeating press line using the existing three promises only.
- Preserve menu filters, counts, favorites, local memory disclosure, item names, prices, imagery, combo offer, allergen statement, and online-menu action.
- Recompose the menu into a bold editorial grid with large product photography, visible prices, oversized index numbers, and clear selected/focus states.
- Keep controls at least 44px high and functional without hover.

### Story, reviews, and visit

- Keep the three-step smash explanation and its existing image/copy, but present it as an alternating black/yellow editorial spread.
- Preserve all three curated review excerpts, attribution behavior, source links, and manual-update disclosure. The wall becomes a poster collage that is visually distinct from Goldies’ card patterns.
- Keep the complete visit section, address, hours, Maps action, Instagram link, footer content, and mobile ordering bar.
- Use large typographic signposting and strong section contrast to make ordering and directions easy to find.

## Typography

- Continue using no more than two typefaces: Karla and Playfair Display.
- Base text: fluid 16–18px, approximately 1.45 line height, with readable line lengths.
- Hero heading: fluid and viewport-aware, roughly 56–144px depending on width, with mobile wrapping deliberately controlled.
- Section headings: roughly 44–96px depending on width.
- Labels may use uppercase only when short, always with 5–12% letterspacing.
- Use real typographic punctuation, tabular numerals where prices align, visible link underlines where appropriate, and no body text below 12px.

## Interaction and motion

- Preserve all existing component behavior and semantic HTML.
- Use restrained CSS transitions for hover/focus feedback and optional entry emphasis; no animation library is added.
- Never hide essential information behind hover.
- Respect `prefers-reduced-motion` and retain the skip link and visible keyboard focus.
- Avoid client-side JavaScript for purely visual effects.

## Responsive behavior

- Design mobile-first and verify at 320px, 375px, 768px, 1024px, 1280px, and 1440px.
- No horizontal page scrolling or clipped German compound words.
- Poster overlaps collapse into an intentional single-column flow on small screens.
- Hero and product imagery retain reserved aspect ratios to prevent layout shift.
- The mobile ordering bar remains usable and does not cover the final content.

## Technical approach

- Continue using Next.js 16 App Router, React 19, TypeScript, `next/image`, and the current static data modules.
- Prefer styling changes in `app/globals.css` and minimal structural class changes in existing components.
- Keep the homepage a server component except for the already-interactive menu and opening-status components.
- Do not add dependencies or remote runtime assets.
- Update `README.md` to describe the revised visual direction while preserving setup and maintenance documentation.

## Verification

- Add or update source-contract tests only where needed to protect preserved content, links, semantics, and visual accessibility requirements.
- Run the complete Node test suite and production build.
- Inspect the page visually at mobile, tablet, and desktop sizes.
- Verify keyboard focus, accessible structure, reduced motion, contrast, text wrapping, and horizontal overflow.
- Compare the redesign with the reference only for overall energy; reject any result that appears like a direct clone.

## Builder discretion

The builder may choose exact grid ratios, crop positions, border widths, spacing values, class names, and responsive breakpoints as long as they support this direction and satisfy the preservation, accessibility, originality, and performance constraints above.
