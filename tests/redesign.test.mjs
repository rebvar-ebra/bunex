import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pageSource = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
const stylesheetSource = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

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

test('adds original street press composition hooks', () => {
  assert.match(pageSource, /className="heroPoster"/);
  assert.match(pageSource, /className="streetTicker"/);
  assert.match(pageSource, /className="sectionIndex"/);
  assert.match(pageSource, /className="sectionFrame/);
});

test('keeps interactive component boundaries unchanged', () => {
  assert.equal((pageSource.match(/<MenuShowcase\s*\/>/g) ?? []).length, 1);
  assert.equal((pageSource.match(/<ReviewWall\s*\/>/g) ?? []).length, 1);
  assert.equal((pageSource.match(/<OpeningStatus(?:\s+compact)?\s*\/>/g) ?? []).length, 3);
});

test('defines the accessible street press visual foundation', () => {
  assert.match(stylesheetSource, /--signal-red:\s*#c83d24/i);
  assert.match(stylesheetSource, /--poster-edge:\s*0px/);
  assert.match(stylesheetSource, /body\s*\{[^}]*font-size:\s*clamp\(/s);
  assert.match(stylesheetSource, /body\s*\{[^}]*font-feature-settings:[^}]*"kern"\s+1/s);
  assert.match(stylesheetSource, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(/s);
  assert.match(stylesheetSource, /\.heroPoster\s*\{[^}]*grid-template-columns:/s);
  assert.match(stylesheetSource, /\.heroVisual\s*\{[^}]*aspect-ratio:/s);
  assert.match(stylesheetSource, /\.buttonSmall\s*\{[^}]*min-height:\s*44px/s);
  assert.match(stylesheetSource, /:focus-visible/);
  assert.match(stylesheetSource, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test('collapses the street press hero and ticker without mobile overflow', () => {
  const mobileRules = stylesheetSource.match(/@media \(max-width: 700px\)\s*\{[\s\S]+?\n\}/)?.[0] ?? '';

  assert.match(mobileRules, /\.heroPoster\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(mobileRules, /\.streetTicker\s*\{[^}]*min-width:\s*0[^}]*grid-template-columns:\s*1fr/s);
});
