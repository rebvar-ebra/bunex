import test from 'node:test';
import assert from 'node:assert/strict';

test('shares opening-hours logic with the Next.js client component', async () => {
  let module;

  try {
    module = await import('../lib/opening-hours.mjs');
  } catch {
    module = undefined;
  }

  assert.equal(typeof module?.getOpeningStatusForDate, 'function');
  assert.deepEqual(module?.getOpeningStatusForDate(new Date('2026-07-03T22:00:00Z')), {
    isOpen: false,
    label: 'Geschlossen · öffnet um 11:30',
  });
});

test('filters the real photographed menu by category', async () => {
  let module;

  try {
    module = await import('../lib/menu.mjs');
  } catch {
    module = undefined;
  }

  assert.equal(typeof module?.getMenuItems, 'function');
  assert.deepEqual(
    module?.getMenuItems('chicken').map(({ name, price }) => [name, price]),
    [
      ['Hot Chicken', '9,90 €'],
      ['Special Chicken', '9,90 €'],
    ],
  );
  assert.equal(module?.getMenuItems('all').length, 8);
});

test('keeps the photographed menu mapped to the published prices', async () => {
  const { menuItems } = await import('../lib/menu.mjs');

  assert.deepEqual(
    menuItems.map(({ name, price, image }) => [name, price, image]),
    [
      ['Cheeseburger', '6,90 €', '/menu/cheeseburger.webp'],
      ['Double Cheeseburger', '9,90 €', '/menu/double-cheeseburger.webp'],
      ['BBQ Burger', '11,90 €', '/menu/bbq-burger.webp'],
      ['Hot Chicken', '9,90 €', '/menu/hot-chicken.webp'],
      ['Special Chicken', '9,90 €', '/menu/special-chicken.webp'],
      ['Veggie Cheeseburger', '6,90 €', '/menu/veggie-cheeseburger.webp'],
      ['Special Burger (Veggie)', '10,90 €', '/menu/special-veggie.webp'],
      ['Pommes', '3,50 €', '/menu/pommes.webp'],
    ],
  );
});
