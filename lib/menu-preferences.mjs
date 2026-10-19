export const DEFAULT_MENU_MEMORY = Object.freeze({
  category: 'all',
  favorite: null,
});

const MENU_CATEGORIES = new Set(['all', 'beef', 'chicken', 'veggie', 'sides']);

export function parseMenuMemory(serialized, validItems) {
  try {
    const value = JSON.parse(serialized);
    const categoryIsValid = MENU_CATEGORIES.has(value?.category);
    const favoriteIsValid = value?.favorite === null || validItems.includes(value?.favorite);

    return categoryIsValid && favoriteIsValid
      ? { category: value.category, favorite: value.favorite }
      : DEFAULT_MENU_MEMORY;
  } catch {
    return DEFAULT_MENU_MEMORY;
  }
}

export function serializeMenuMemory(memory) {
  return JSON.stringify({
    category: memory.category,
    favorite: memory.favorite,
  });
}
