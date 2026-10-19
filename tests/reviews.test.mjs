import test from 'node:test';
import assert from 'node:assert/strict';
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
