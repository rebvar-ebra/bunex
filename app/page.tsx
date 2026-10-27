import Image from "next/image";
import Link from "next/link";
import { AnnouncementTicker } from "@/components/announcement-ticker";
import { Icon } from "@/components/icons";
import { MenuShowcase } from "@/components/menu-showcase";
import { OpeningStatus } from "@/components/opening-status";
import { ReviewWall } from "@/components/review-wall";
import heroImage from "@/assets/bunex-smashburger-hero.webp";

const orderUrl = "https://bunexsmashburger.online-karte.com/bunexsmashburger";
const routeUrl =
  "https://www.google.com/maps/search/?api=1&query=Bunex+Smash+Burger+Potsdamer+Str.+61+Teltow";

export default function Home() {
  return (
    <>
      <a className="skipLink" href="#main">
        Zum Inhalt springen
      </a>

      <div className="announcementBar" aria-label="BUNEX Aktuell">
        <AnnouncementTicker />
      </div>

      <header className="siteHeader">
        <div className="headerInner">
          <a className="brand" href="#top" aria-label="BUNEX Startseite">
            BUN<span>EX</span>
          </a>
          <nav aria-label="Hauptnavigation">
            <a href="#karte">Speisekarte</a>
            <a href="#smash">Unser Smash</a>
            <a href="#besuch">Besuch uns</a>
          </nav>
          <div className="headerActions">
            <OpeningStatus />
            <a className="button buttonDark buttonSmall" href={orderUrl} target="_blank" rel="noreferrer">
              <Icon name="shoppingBag" />
              Online bestellen
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="heroTitle">
          <div className="heroPoster heroOverlay">
            <div className="heroCopy">
              <p className="eyebrow">Smashburger · Teltow</p>
              <h1 id="heroTitle">Smash mit Kante.<br /><em>Saftig</em> bis zum letzten Biss.</h1>
              <p className="heroIntro">
                Frisch gepresst, kräftig gebräunt und genau dann gebaut, wenn du bestellst.
              </p>
              <div className="heroCta">
                <a className="button buttonDark" href={orderUrl} target="_blank" rel="noreferrer">
                  <Icon name="shoppingBag" />
                  Jetzt online bestellen
                </a>
                <a className="textLink" href="#karte">Menü entdecken</a>
              </div>
              <div className="heroStatus"><OpeningStatus /></div>
            </div>

            <div className="heroVisual">
              <Image
                src={heroImage}
                alt="BUNEX Double Smashburger mit knusprigen Pattys, Käse, Gurken und Soße"
                fill
                preload
                sizes="100vw"
              />
              <div className="heroBadge">
                <span>Made to order</span>
                <strong>100 % Smash</strong>
              </div>
              <p className="heroCaption">Echtes BUNEX Food · Fotografiert in Teltow</p>
            </div>
          </div>
        </section>

        <section className="proofStrip" aria-label="BUNEX Versprechen">
          <div className="streetTicker">
            <p><span>01</span> Frisch gesmasht</p>
            <p><span>02</span> Auf Bestellung gebaut</p>
            <p><span>03</span> Mit echten Produktfotos</p>
          </div>
        </section>

        <section className="menuSection" id="karte" aria-labelledby="menuTitle">
          <div className="sectionFrame menuFrame menuDeck">
            <div className="sectionIntro menuHeading">
              <span className="sectionIndex" aria-hidden="true">01</span>
              <div>
                <p className="eyebrow">Dein Menü</p>
                <h2 id="menuTitle">Finde den Smash,<br />der heute <em>passt.</em></h2>
              </div>
              <p>
                Beef, Chicken oder Veggie: Filtere die Auswahl, merke dir deinen Favoriten und steige beim nächsten Besuch dort wieder ein.
              </p>
            </div>
            <MenuShowcase />
          </div>
        </section>

        <section className="smashSection" id="smash" aria-labelledby="smashTitle">
          <div className="smashImage">
            <Image
              src="/bunex-smash-process.jpg"
              alt="BUNEX Smashburger mit Pommes und weiteren Gerichten im Hintergrund"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
            />
            <p>Die Kante macht den Smash.</p>
          </div>
          <div className="smashCopy">
            <span className="sectionIndex" aria-hidden="true">02</span>
            <p className="eyebrow eyebrowLight">Warum Smash?</p>
            <h2 id="smashTitle">Drei Schritte.<br />Ein klarer Unterschied.</h2>
            <ol className="smashSteps">
              <li><span>01</span><div><h3>Press</h3><p>Das Patty kommt direkt auf die heiße Platte und wird sofort flach gepresst.</p></div></li>
              <li><span>02</span><div><h3>Sizzle</h3><p>Volle Hitze baut die kräftige Kruste auf, während das Innere saftig bleibt.</p></div></li>
              <li><span>03</span><div><h3>Stack</h3><p>American Cheese, weiche Buns und abgestimmte Soßen machen ihn komplett.</p></div></li>
            </ol>
          </div>
        </section>

        <ReviewWall />

        <section className="visitSection" id="besuch" aria-labelledby="visitTitle">
          <div className="visitCopy">
            <span className="sectionIndex" aria-hidden="true">04</span>
            <p className="eyebrow">Komm vorbei</p>
            <h2 id="visitTitle">Dein Tisch ist nah.<br /><em>Teltow</em> auch.</h2>
            <p className="visitLead">Potsdamer Straße 61. Frisch von der Platte, sieben Tage die Woche.</p>
            <a className="button buttonDark" href={routeUrl} target="_blank" rel="noreferrer"><Icon name="mapPin" />Route in Google Maps</a>
          </div>
          <div className="visitDetails">
            <div><span>Adresse</span><strong>Potsdamer Str. 61<br />14513 Teltow</strong></div>
            <div><span>Öffnungszeiten</span><strong>So–Do&nbsp; 11:30–23:00<br />Fr–Sa&nbsp; 11:30–00:00</strong></div>
            <div><span>Instagram</span><a className="socialLink" href="https://instagram.com/bunexsmashburger" target="_blank" rel="noreferrer"><Icon name="instagram" />@bunexsmashburger</a></div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <a className="brand" href="#top" aria-label="Zurück nach oben">BUN<span>EX</span></a>
        <p>Frisch gesmasht in Teltow.</p>
        <div>
          <a className="footerSocial" href="https://instagram.com/bunexsmashburger" target="_blank" rel="noreferrer"><Icon name="instagram" />Instagram</a>
          <Link href="/impressum">Impressum</Link>
          <span>Datenschutz folgt</span>
          <span>{"©\u00a02026 BUNEX"}</span>
          <span>Entwickelt von Rebvar Ebrahimi</span>
        </div>
      </footer>

      <div className="mobileOrderBar">
        <OpeningStatus compact />
        <a href={orderUrl} target="_blank" rel="noreferrer"><Icon name="shoppingBag" />Jetzt bestellen</a>
      </div>
    </>
  );
}
