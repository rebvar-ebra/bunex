import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pageSource = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
const layoutSource = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const stylesheetSource = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
const menuSource = await readFile(new URL('../components/menu-showcase.tsx', import.meta.url), 'utf8');
const reviewSource = await readFile(new URL('../components/review-wall.tsx', import.meta.url), 'utf8');

test('preserves every homepage section and ordering action', () => {
  for (const anchor of ['top', 'karte', 'smash', 'besuch']) {
    assert.match(pageSource, new RegExp(`id="${anchor}"`));
  }

  for (const marker of [
    'Smash mit Kante.',
    'Finde den Smash',
    'Drei Schritte.',
    'Dein Tisch ist nah.',
    'Potsdamer Str. 61',
    'Online bestellen',
    'Route in Google Maps',
  ]) {
    assert.match(pageSource, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(pageSource, /https:\/\/bunexsmashburger\.online-karte\.com\/bunexsmashburger/);
  assert.match(pageSource, /https:\/\/www\.google\.com\/maps\/search/);
  assert.match(pageSource, /aria-labelledby="heroTitle"/);
  assert.match(pageSource, /aria-labelledby="menuTitle"/);
  assert.match(pageSource, /aria-labelledby="smashTitle"/);
  assert.match(pageSource, /aria-labelledby="visitTitle"/);
});

test('uses a distinct process photo outside the menu card set', () => {
  assert.match(pageSource, /src="\/bunex-smash-process\.jpg"/);
  assert.match(pageSource, /alt="BUNEX Smashburger mit Pommes und weiteren Gerichten im Hintergrund"/);
});

test('adds the photo-first composition hooks', () => {
  assert.match(pageSource, /className="announcementBar"/);
  assert.match(pageSource, /className="heroPoster heroOverlay"/);
  assert.match(pageSource, /sizes="100vw"/);
  assert.match(pageSource, /className="sectionFrame menuFrame menuDeck"/);
  assert.match(pageSource, /className="streetTicker"/);
  assert.match(pageSource, /className="sectionIndex"/);
  assert.match(pageSource, /className="sectionFrame/);
});

test('uses one condensed display family and one matching body family', () => {
  assert.match(layoutSource, /import \{ Barlow, Barlow_Condensed \} from "next\/font\/google"/);
  assert.match(layoutSource, /variable: "--font-body"/);
  assert.match(layoutSource, /variable: "--font-display"/);
  assert.doesNotMatch(layoutSource, /Playfair_Display|Karla/);
});

test('keeps interactive component boundaries unchanged', () => {
  assert.equal((pageSource.match(/<MenuShowcase\s*\/>/g) ?? []).length, 1);
  assert.equal((pageSource.match(/<ReviewWall\s*\/>/g) ?? []).length, 1);
  assert.equal((pageSource.match(/<OpeningStatus(?:\s+compact)?\s*\/>/g) ?? []).length, 3);
});

test('defines the accessible photo-first visual foundation', () => {
  assert.match(stylesheetSource, /--yellow:\s*#ffec00/i);
  assert.match(stylesheetSource, /--ink:\s*#0a0a08/i);
  assert.match(stylesheetSource, /--cream:\s*#f7f4ec/i);
  assert.match(stylesheetSource, /--card-radius:\s*22px/);
  assert.match(stylesheetSource, /--pill-radius:\s*999px/);
  assert.match(stylesheetSource, /body\s*\{[^}]*font-size:\s*clamp\(/s);
  assert.match(stylesheetSource, /body\s*\{[^}]*font-feature-settings:[^}]*"kern"\s+1/s);
  assert.match(stylesheetSource, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(/s);
  assert.match(stylesheetSource, /\.announcementBar\s*\{[^}]*background:\s*var\(--yellow\)[^}]*color:\s*var\(--ink\)/s);
  assert.match(stylesheetSource, /\.siteHeader\s*\{[^}]*position:\s*absolute[^}]*background:\s*transparent/s);
  assert.match(stylesheetSource, /\.heroOverlay\s*\{[^}]*min-height:\s*calc\(100svh\s*-\s*36px\)/s);
  assert.match(stylesheetSource, /\.heroVisual\s*\{[^}]*position:\s*absolute[^}]*inset:\s*0/s);
  assert.match(stylesheetSource, /\.heroVisual img\s*\{[^}]*object-fit:\s*cover/s);
  assert.match(stylesheetSource, /\.headerActions \.openingStatus\s*\{[^}]*background:\s*rgba\(0,0,0,\.72\)/s);
  assert.match(stylesheetSource, /\.button\s*\{[^}]*border-radius:\s*var\(--pill-radius\)[^}]*min-height:\s*48px/s);
  assert.match(stylesheetSource, /\.buttonSmall\s*\{[^}]*min-height:\s*44px/s);
  assert.match(stylesheetSource, /:focus-visible/);
  assert.match(stylesheetSource, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test('keeps the photo hero and menu fluid without mobile overflow', () => {
  const mobileRules = stylesheetSource.match(/@media \(max-width: 700px\)\s*\{[\s\S]+?\n\}/)?.[0] ?? '';

  assert.match(mobileRules, /\.siteHeader nav,\s*\.headerActions\s*\{[^}]*display:\s*none/s);
  assert.match(mobileRules, /\.heroOverlay\s*\{[^}]*min-height:\s*720px/s);
  assert.match(mobileRules, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(/s);
  assert.match(mobileRules, /\.heroBadge\s*\{[^}]*display:\s*none/s);
  assert.match(mobileRules, /\.productGrid\s*\{[^}]*grid-template-columns:\s*1fr/s);
});

test('provides rounded menu deck hooks without changing menu memory behavior', () => {
  assert.match(menuSource, /className="memoryPanel memoryCard"/);
  assert.match(menuSource, /className="productGrid menuCardGrid"/);
  assert.match(menuSource, /className="priceTag"/);
  assert.match(menuSource, /localStorage\.getItem\(memoryKey\)/);
  assert.match(menuSource, /localStorage\.removeItem\(memoryKey\)/);
  assert.match(menuSource, /Nur deine letzte Kategorie und dein Favorit—lokal in diesem Browser, ohne Konto\./);
});

test('provides a clear review deck with preserved attribution', () => {
  assert.match(reviewSource, /className="reviewGrid reviewDeck"/);
  assert.match(reviewSource, /className="sectionIndex"/);
  assert.match(reviewSource, /<blockquote>/);
  assert.match(stylesheetSource, /\.reviewCard blockquote\s*\{[^}]*overflow-wrap:\s*anywhere/s);
  assert.match(stylesheetSource, /\.reviewCard3 \.reviewAttribution > span\s*\{[^}]*opacity:\s*1/s);
});

test('reserves product imagery and keeps controls touch-safe', () => {
  assert.match(stylesheetSource, /\.productImage\s*\{[^}]*aspect-ratio:/s);
  assert.match(stylesheetSource, /\.productInfo strong\s*\{[^}]*font-variant-numeric:\s*tabular-nums/s);
  assert.match(stylesheetSource, /\.menuFilters button\s*\{[^}]*min-height:\s*(?:4[4-9]|[5-9]\d)px/s);
  assert.match(stylesheetSource, /\.favoriteButton\s*\{[^}]*width:\s*(?:4[4-9]|[5-9]\d)px[^}]*height:\s*(?:4[4-9]|[5-9]\d)px/s);
});

test('allows image-led sections to shrink at 320px', () => {
  const mobileRules = stylesheetSource.match(/@media \(max-width: 700px\)\s*\{[\s\S]+?\n\}/)?.[0] ?? '';

  assert.match(mobileRules, /\.heroVisual\s*\{[^}]*min-width:\s*0[^}]*min-height:\s*0/s);
  assert.match(mobileRules, /\.smashImage, \.smashCopy\s*\{[^}]*min-width:\s*0/s);
});

test('uses a two-column menu deck at tablet widths', () => {
  const tabletRules = stylesheetSource.match(/@media \(max-width: 900px\)\s*\{[\s\S]+?\n\}/)?.[0] ?? '';

  assert.match(tabletRules, /\.productGrid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(tabletRules, /\.smashSection\s*\{[^}]*grid-template-columns:\s*1fr/s);
});

test('reserves enough mobile page space for the fixed order bar', () => {
  const mobileRules = stylesheetSource.match(/@media \(max-width: 700px\)\s*\{[\s\S]+?\n\}/)?.[0] ?? '';

  assert.match(mobileRules, /body\s*\{[^}]*padding-bottom:\s*calc\(72px\s*\+/s);
});

test('keeps brand and visit links touch-safe', () => {
  assert.match(stylesheetSource, /\.brand\s*\{[^}]*min-height:\s*44px/s);
  assert.match(stylesheetSource, /\.visitDetails a\s*\{[^}]*min-height:\s*44px[^}]*display:\s*inline-flex/s);
});

test('keeps ordering actions and small labels legible', () => {
  assert.match(stylesheetSource, /\.menuSection\s*\{[^}]*background:\s*var\(--yellow\)/s);
  assert.match(stylesheetSource, /\.reviewSection\s*\{[^}]*background:\s*var\(--ink\)[^}]*color:\s*var\(--cream\)/s);
  assert.match(stylesheetSource, /\.productCard\s*\{[^}]*background:\s*var\(--white\)[^}]*border-radius:\s*var\(--card-radius\)/s);
  assert.match(stylesheetSource, /\.buttonLight\s*\{[^}]*color:\s*var\(--ink\)/s);
  assert.match(stylesheetSource, /\.memoryLabel\s*\{[^}]*color:\s*var\(--ink\)/s);
  assert.match(stylesheetSource, /\.productInfo > p\s*\{[^}]*color:\s*var\(--ink\)/s);
  assert.match(stylesheetSource, /\.comboBanner > div > p\s*\{[^}]*color:\s*var\(--cream\)/s);
  assert.match(stylesheetSource, /\.comboPrice\s*\{[^}]*color:\s*var\(--cream\)/s);
  assert.match(stylesheetSource, /\.comboBanner > div > span\s*\{[^}]*color:\s*var\(--cream\)[^}]*opacity:\s*1/s);
});
