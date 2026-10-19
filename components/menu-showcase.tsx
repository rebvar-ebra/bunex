"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getMenuItems, menuItems } from "@/lib/menu.mjs";
import {
  DEFAULT_MENU_MEMORY,
  parseMenuMemory,
  serializeMenuMemory,
} from "@/lib/menu-preferences.mjs";

const categories = [
  ["all", "Alle"],
  ["beef", "Beef"],
  ["chicken", "Chicken"],
  ["veggie", "Veggie"],
  ["sides", "Sides"],
] as const;

type MenuCategory = (typeof categories)[number][0];

const memoryKey = "bunex-menu-memory-v1";
const orderUrl = "https://bunexsmashburger.online-karte.com/bunexsmashburger";
const itemNames = menuItems.map((item) => item.name);

export function MenuShowcase() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(DEFAULT_MENU_MEMORY.category);
  const [favorite, setFavorite] = useState<string | null>(DEFAULT_MENU_MEMORY.favorite);
  const [memoryReady, setMemoryReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(memoryKey);
    const memory = parseMenuMemory(stored, itemNames);
    setActiveCategory(memory.category);
    setFavorite(memory.favorite);
    setMemoryReady(true);
  }, []);

  useEffect(() => {
    if (!memoryReady) return;
    window.localStorage.setItem(
      memoryKey,
      serializeMenuMemory({ category: activeCategory, favorite }),
    );
  }, [activeCategory, favorite, memoryReady]);

  const items = getMenuItems(activeCategory);
  const favoriteItem = favorite
    ? menuItems.find((item) => item.name === favorite) ?? null
    : null;

  const toggleFavorite = (name: string) => {
    setFavorite((current) => current === name ? null : name);
  };

  const resetMemory = () => {
    window.localStorage.removeItem(memoryKey);
    setActiveCategory(DEFAULT_MENU_MEMORY.category);
    setFavorite(DEFAULT_MENU_MEMORY.favorite);
  };

  return (
    <>
      <aside className="memoryPanel" aria-labelledby="memoryTitle">
        <div>
          <p className="memoryLabel">Dein nächster Smash</p>
          <h3 id="memoryTitle">
            {favoriteItem ? `Wieder Lust auf ${favoriteItem.name}?` : "Beim nächsten Mal direkt weitermachen."}
          </h3>
          <p>
            {favoriteItem
              ? "Du hast ihn als Favoriten markiert. Wir halten ihn auf diesem Gerät für dich bereit."
              : "Wähle eine Kategorie oder markiere einen Favoriten. BUNEX merkt sich deine Auswahl nur in diesem Browser."}
          </p>
        </div>
        <div className="memoryActions">
          {favoriteItem ? (
            <a className="button buttonAccent" href={orderUrl} target="_blank" rel="noreferrer">
              {favoriteItem.name} bestellen
            </a>
          ) : null}
          <details>
            <summary>Was wird gespeichert?</summary>
            <p>Nur deine letzte Kategorie und dein Favorit—lokal in diesem Browser, ohne Konto.</p>
            <button type="button" onClick={resetMemory}>Auswahl vergessen</button>
          </details>
        </div>
      </aside>

      <div className="menuFilters" aria-label="Speisekarte filtern">
        {categories.map(([value, label]) => (
          <button
            type="button"
            key={value}
            className={activeCategory === value ? "active" : ""}
            aria-pressed={activeCategory === value}
            onClick={() => setActiveCategory(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="screenReaderOnly" aria-live="polite" aria-atomic="true">
        {items.length === 1 ? "1 Eintrag angezeigt" : `${items.length} Einträge angezeigt`}
      </p>

      <div className="productGrid">
        {items.map((item, index) => (
          <article className="productCard" key={item.name}>
            <div className="productImage">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
              />
              <span className="productNumber">{String(index + 1).padStart(2, "0")}</span>
              <button
                className="favoriteButton"
                type="button"
                aria-label={favorite === item.name ? `${item.name} nicht mehr merken` : `${item.name} als Favoriten merken`}
                aria-pressed={favorite === item.name}
                onClick={() => toggleFavorite(item.name)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 20.6 3.8 12.7A5.3 5.3 0 0 1 11.3 5l.7.8.7-.8a5.3 5.3 0 0 1 7.5 7.7Z" />
                </svg>
              </button>
            </div>
            <div className="productInfo">
              <p>{categories.find(([value]) => value === item.category)?.[1] ?? item.category}</p>
              <div>
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="comboBanner">
        <p className="comboPrice">+6&nbsp;€</p>
        <div><p>Mach mehr daraus</p><h3>BUNEX Combo</h3><span>Pommes, Getränk, Salat und Soße dazu.</span></div>
        <a className="button buttonLight" href={orderUrl} target="_blank" rel="noreferrer">Zur Online-Karte</a>
      </div>
      <p className="allergenNote">Allergene: A Gluten, C Eier, F Soja, G Milch, M Senf. Fragen zu Zutaten beantworten wir gern vor Ort.</p>
    </>
  );
}
