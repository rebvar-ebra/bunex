import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seite nicht gefunden — BUNEX",
  description: "Die gesuchte BUNEX Seite wurde nicht gefunden.",
};

export default function NotFound() {
  return (
    <main className="notFoundPage">
      <header className="notFoundHeader">
        <Link className="brand" href="/" aria-label="BUNEX Startseite">
          BUN<span>EX</span>
        </Link>
        <span className="notFoundMeta">Fehler 404</span>
      </header>

      <div className="notFoundGrid">
        <section className="notFoundCopy" aria-labelledby="notFoundTitle">
          <p className="eyebrow eyebrowLight">Seite nicht gefunden</p>
          <h1 id="notFoundTitle">Dieser Smash ist vom Tisch.</h1>
          <p className="notFoundLead">
            Die gesuchte Seite gibt es nicht mehr oder der Link ist falsch. Dein nächster Smash ist aber nur einen Klick entfernt.
          </p>
          <div className="notFoundActions" aria-label="Zurück zu BUNEX">
            <Link className="button buttonAccent" href="/">Zur Startseite</Link>
            <Link className="notFoundTextLink" href="/#karte">Speisekarte ansehen</Link>
          </div>
        </section>

        <div className="notFoundArtwork" aria-hidden="true">
          <span className="notFoundCode">404</span>
          <span className="notFoundPlate">
            <span className="notFoundPatty" />
          </span>
          <p>Der falsche Weg.<br />Der richtige Geschmack.</p>
        </div>
      </div>

      <footer className="notFoundFooter">
        <span>Potsdamer Str. 61 · 14513 Teltow</span>
        <span>Frisch gesmasht · Sieben Tage die Woche</span>
      </footer>
    </main>
  );
}
