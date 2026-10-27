import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — BUNEX",
  description: "Rechtliche Anbieter- und Kontaktdaten von BUNEX Smashburger in Teltow.",
};

export default function ImpressumPage() {
  return (
    <div className="legalPage">
      <a className="skipLink" href="#impressumContent">
        Zum Inhalt springen
      </a>

      <header className="legalHeader">
        <Link className="brand" href="/" aria-label="BUNEX Startseite">
          BUN<span>EX</span>
        </Link>
        <Link className="legalHeaderLink" href="/">
          Zur Startseite
        </Link>
      </header>

      <main className="legalMain" id="impressumContent">
        <section className="legalHero" aria-labelledby="impressumTitle">
          <p className="eyebrow eyebrowLight">Rechtliche Angaben</p>
          <h1 id="impressumTitle">Impressum</h1>
          <p>Angaben gemäß §&nbsp;5 DDG.</p>
        </section>

        <div className="legalGrid">
          <section className="legalCard" aria-labelledby="providerTitle">
            <span className="sectionIndex" aria-hidden="true">01</span>
            <div>
              <h2 id="providerTitle">Diensteanbieter</h2>
              <address>
                <strong>BUNEX Smashburger</strong><br />
                Vahab Ghalandari<br />
                Potsdamer Str. 61<br />
                14513 Teltow<br />
                Deutschland
              </address>
            </div>
          </section>

          <section className="legalCard legalCardAccent" aria-labelledby="contactTitle">
            <span className="sectionIndex" aria-hidden="true">02</span>
            <div>
              <h2 id="contactTitle">Kontakt</h2>
              <dl className="legalContactList">
                <div>
                  <dt>Telefon</dt>
                  <dd><a href="tel:+4917632646111">+49&nbsp;176&nbsp;32646111</a></dd>
                </div>
                <div>
                  <dt>E-Mail</dt>
                  <dd><a href="mailto:bunexsmashburger@gmail.com">bunexsmashburger@gmail.com</a></dd>
                </div>
              </dl>
            </div>
          </section>
        </div>

        <nav className="legalActions" aria-label="Weiterführende Links">
          <Link className="button buttonAccent" href="/">Zur Startseite</Link>
          <Link className="legalTextLink" href="/#karte">Speisekarte ansehen</Link>
        </nav>
      </main>

      <footer className="legalFooter">
        <span>©&nbsp;2026 BUNEX</span>
        <span>Frisch gesmasht in Teltow.</span>
      </footer>
    </div>
  );
}
