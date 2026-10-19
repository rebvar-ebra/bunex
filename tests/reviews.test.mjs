import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  googleMapsReviewsUrl,
  reviews,
  reviewsUpdatedLabel,
} from '../lib/reviews.mjs';

const approvedQuotes = [
  'Sehr gute Qualität, sehr freundlicher Inhaber, sehr gern wieder.',
  'Beide Burger schmeckten sehr gut, besonders das Veggipatty hat überzeugt.',
  'Hot Chicken hat sehr gut geschmeckt und die Süßkartoffelpommes waren perfekt.',
];

test('publishes exactly the three approved review excerpts', () => {
  assert.deepEqual(
    reviews.map(({ quote }) => quote),
    approvedQuotes,
  );
  assert.equal(new Set(reviews.map(({ id }) => id)).size, 3);
});

test('keeps each review attributable and linkable', () => {
  assert.equal(
    googleMapsReviewsUrl,
    'https://www.google.com/maps/search/?api=1&query=Bunex+Smash+Burger+Potsdamer+Str.+61+Teltow',
  );
  assert.equal(reviewsUpdatedLabel, 'Oktober 2026');
  assert.ok(reviews.every(({ sourceLabel }) => sourceLabel.trim().length > 0));
});

test('supports a review without a public reviewer name', () => {
  const unnamedReviews = reviews.filter((review) => !('reviewer' in review));

  assert.equal(unnamedReviews.length, 2);
  assert.ok(unnamedReviews.every(({ sourceLabel }) => sourceLabel.startsWith('Google-Rezension')));
});

test('wires the accessible review wall into the homepage', async () => {
  const [componentSource, pageSource] = await Promise.all([
    readFile(new URL('../components/review-wall.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/page.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(componentSource, /<section[^>]+aria-labelledby="reviewsTitle"/);
  assert.match(componentSource, /<h2 id="reviewsTitle"/);
  assert.match(componentSource, /<blockquote>/);
  assert.match(componentSource, /"reviewer" in review/);
  assert.match(componentSource, /review\.reviewer\s*&&/);
  assert.match(componentSource, /Alle Google-Rezensionen ansehen/);
  assert.match(componentSource, /target="_blank"/);
  assert.match(componentSource, /rel="noreferrer"/);

  const smashSectionEnd = pageSource.indexOf('</section>', pageSource.indexOf('className="smashSection"'));
  const reviewWall = pageSource.indexOf('<ReviewWall />');
  const visitSection = pageSource.indexOf('className="visitSection"');

  assert.ok(smashSectionEnd < reviewWall);
  assert.ok(reviewWall < visitSection);
});

test('wraps long review words on narrow screens', async () => {
  const stylesheet = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
  const blockquoteRule = stylesheet.match(/\.reviewCard blockquote\s*\{[^}]+\}/s)?.[0] ?? '';

  assert.match(blockquoteRule, /overflow-wrap:\s*anywhere/);
});

test('keeps quotations separate from their Google Maps links', async () => {
  const componentSource = await readFile(
    new URL('../components/review-wall.tsx', import.meta.url),
    'utf8',
  );
  const cardMarkup = componentSource.slice(
    componentSource.indexOf('<li className='),
    componentSource.indexOf('</li>') + '</li>'.length,
  );

  assert.match(
    cardMarkup,
    /<a[\s\S]+className="reviewSourceLink"[\s\S]+<\/a>\s*<blockquote>/,
  );
});
