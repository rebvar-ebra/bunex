# BUNEX Photo-First Redesign Specification

## Intent

Replace the current Street Press treatment with a more direct, energetic restaurant experience informed by the visual rhythm of Goldies Smashburger: photo-first hero composition, saturated yellow fields, condensed bold typography, pill-shaped controls, clean white menu cards, and simple black framing.

The result must feel recognizably BUNEX, not like a reproduction of Goldies. It must use only BUNEX copy, photography, links, review excerpts, logo treatment, and menu data.

## Goals

- Make the opening viewport image-led, with navigation and headline layered over the BUNEX hero photograph.
- Use a strict yellow, black, and warm-white palette with no decorative serif typography.
- Use Barlow for readable body copy and Barlow Condensed for display headings.
- Present menu products as consistent rounded white cards on a saturated yellow section.
- Keep every existing content section, menu filter, favorite control, local menu memory behavior, review attribution, opening status, map link, order link, and Instagram link.
- Keep mobile ordering prominent and touch-safe.
- Preserve static rendering and the existing lightweight Next.js architecture.

## Visual System

- Announcement ticker: saturated yellow, black condensed uppercase type.
- Header: transparent over the hero at the top; white logo/navigation; yellow order pill.
- Hero: full-viewport BUNEX photograph, dark gradient for text contrast, large white condensed headline anchored low and left.
- Buttons: pill geometry, black/yellow or yellow/black, minimum 44px height.
- Menu: yellow field, simple black rules, rounded white product cards with bold black titles and compact category labels.
- Memory: compact white card on yellow, explicit local-only explanation and forget control.
- Story: image-led black section with large white heading and yellow numbered steps.
- Reviews: black background, rounded cream/yellow review cards, source links and attribution unchanged.
- Visit: yellow call-to-action field paired with black location details.
- Footer: black with white/yellow brand treatment.

## Typography

- Maximum two font families: Barlow Condensed for display and Barlow for body/interface copy.
- Body text at least 16px with 1.4–1.5 line height and readable line lengths.
- Uppercase labels are short and use 0.05–0.1em tracking.
- No serif emphasis, fake small caps, underlining, or centered body paragraphs.
- Existing German punctuation, en dashes, curly quotes, and nonbreaking spaces remain correct.

## Interaction and Memory

The menu memory remains the only relationship-aware behavior. It stores only the last category and one favorite in local storage, explains this transparently, and offers “Auswahl vergessen.” No account, tracking, inferred personalization, or agentic features are added.

## Accessibility and Performance

- WCAG AA text contrast, visible focus, semantic landmarks, accurate image alt text.
- 44×44px minimum interactive targets.
- No page-level horizontal overflow from 320px through 1440px.
- Reduced-motion support.
- Hero image retains Next.js preload and responsive sizes; product images retain lazy loading and reserved aspect ratios.
- Server components remain server-rendered; only the existing menu interaction remains a client component.

## Non-goals

- Copying Goldies’ logo, script wordmark, torn-paper edge, app promotion, navigation wording, assets, or exact section order.
- Adding dependencies, animation libraries, accounts, APIs, or remote imagery.
- Rewriting restaurant facts, menu prices, review quotes, or external destinations.

