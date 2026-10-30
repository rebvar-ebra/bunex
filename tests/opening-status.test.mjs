import test from 'node:test';
import assert from 'node:assert/strict';
import * as app from '../lib/opening-hours.mjs';

const { getOpeningStatus } = app;

test('reports closed before the daily 11:30 opening time', () => {
  assert.deepEqual(getOpeningStatus(4, 11, 29), {
    isOpen: false,
    label: 'Geschlossen · öffnet um 11:30',
  });
});

test('closes at 22:00 every day', () => {
  assert.deepEqual(getOpeningStatus(4, 21, 59), {
    isOpen: true,
    label: 'Geöffnet · bis 22:00',
  });
  assert.deepEqual(getOpeningStatus(4, 22, 0), {
    isOpen: false,
    label: 'Geschlossen · öffnet morgen um 11:30',
  });
  assert.deepEqual(getOpeningStatus(5, 21, 59), {
    isOpen: true,
    label: 'Geöffnet · bis 22:00',
  });
  assert.deepEqual(getOpeningStatus(6, 22, 0), {
    isOpen: false,
    label: 'Geschlossen · öffnet morgen um 11:30',
  });
});

test('uses Berlin local time for visitors in any timezone', () => {
  assert.equal(typeof app.getBerlinTime, 'function');
  assert.deepEqual(app.getBerlinTime(new Date('2026-07-03T21:45:00Z')), {
    day: 5,
    hour: 23,
    minute: 45,
  });
  assert.deepEqual(app.getBerlinTime(new Date('2026-01-04T10:15:00Z')), {
    day: 0,
    hour: 11,
    minute: 15,
  });
});

test('recomputes the displayed status from a fresh date at a closing boundary', () => {
  assert.equal(typeof app.getOpeningStatusForDate, 'function');
  assert.deepEqual(app.getOpeningStatusForDate(new Date('2026-07-03T19:59:00Z')), {
    isOpen: true,
    label: 'Geöffnet · bis 22:00',
  });
  assert.deepEqual(app.getOpeningStatusForDate(new Date('2026-07-03T20:00:00Z')), {
    isOpen: false,
    label: 'Geschlossen · öffnet morgen um 11:30',
  });
});
