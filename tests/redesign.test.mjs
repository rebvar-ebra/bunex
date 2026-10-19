import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pageSource = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');

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
