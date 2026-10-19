# BUNEX Google Review Wall Design

## Intent

Add credible social proof to the homepage without a paid API, API key, runtime dependency, or recurring service cost. The section should reinforce the customer promise that BUNEX is delicious and worth returning to.

## Approved direction

- Use the selected “Community wall” direction (Option B).
- Place the section between “Warum Smash?” and “Besuch uns”.
- Use three short, manually curated excerpts from public Google reviews.
- Identify each item as a Google review, retain the available reviewer/date attribution, and link users to the BUNEX Google Maps listing.
- Include a prominent “Alle Google-Rezensionen ansehen” action.
- State that the wall is a curated selection and show the maintenance date; do not imply that it updates automatically.
- Keep the implementation static, dependency-free, responsive, keyboard accessible, and visually consistent with the existing BUNEX design.

## Content

1. Tim König: “Sehr gute Qualität, sehr freundlicher Inhaber, sehr gern wieder.”
2. Public Google review, May 2026: “Beide Burger schmeckten sehr gut, besonders das Veggipatty hat überzeugt.”
3. Public Google review: “Hot Chicken hat sehr gut geschmeckt und die Süßkartoffelpommes waren perfekt.”

The implementation must not invent star ratings, dates, reviewer names, or a current aggregate rating that cannot be verified from the cited public excerpts.

## Non-goals

- No Google Places API integration or Google Cloud billing.
- No review scraping, background refresh, carousel, or client-side state.
- No third-party review widget or added package.
- No claim that Google verifies individual reviews.

## Source and maintenance

The excerpts were selected from public pages that identify them as Google reviews for BUNEX SMASH BURGER. A future maintainer can replace entries in the static review data module and update the displayed maintenance date. Every card and the section CTA resolve to the BUNEX Google Maps listing so visitors can inspect the current source context.
