import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_MENU_MEMORY,
  parseMenuMemory,
  serializeMenuMemory,
} from '../lib/menu-preferences.mjs';

const validItems = ['Cheeseburger', 'Hot Chicken', 'Pommes'];

test('restores a valid saved category and favorite', () => {
  assert.deepEqual(
    parseMenuMemory('{"category":"chicken","favorite":"Hot Chicken"}', validItems),
    { category: 'chicken', favorite: 'Hot Chicken' },
  );
});

test('falls back safely when stored menu memory is malformed or unknown', () => {
  assert.deepEqual(parseMenuMemory('not-json', validItems), DEFAULT_MENU_MEMORY);
  assert.deepEqual(
    parseMenuMemory('{"category":"dessert","favorite":"Mystery Burger"}', validItems),
    DEFAULT_MENU_MEMORY,
  );
});

test('serializes only the public menu-memory contract', () => {
  assert.equal(
    serializeMenuMemory({ category: 'veggie', favorite: 'Cheeseburger', ignored: 'private' }),
    '{"category":"veggie","favorite":"Cheeseburger"}',
  );
});
