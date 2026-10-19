import {
  googleMapsReviewsUrl,
  reviews,
  reviewsUpdatedLabel,
} from "@/lib/reviews.mjs";

export function ReviewWall() {
  return (
    <section className="reviewSection" aria-labelledby="reviewsTitle">
      <div className="reviewInner">
        <header className="reviewHeader">
          <div>
            <p className="eyebrow eyebrowLight">Von Gästen empfohlen</p>
            <h2 id="reviewsTitle">
              Lecker gesagt.<br />
              <em>Gern wieder.</em>
            </h2>
          </div>
          <div className="reviewHeaderCopy">
            <p>
              Keine Werbesprüche. Eine kleine Auswahl öffentlicher Stimmen von Menschen,
              die bei BUNEX gegessen haben.
            </p>
            <a
              className="button buttonAccent reviewCta"
              href={googleMapsReviewsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Alle Google-Rezensionen ansehen
            </a>
          </div>
        </header>

        <ul className="reviewGrid">
          {reviews.map((review, index) => (
            <li className={`reviewCard reviewCard${index + 1}`} key={review.id}>
              <article className="reviewCardInner">
                <a
                  className="reviewSourceLink"
                  href={googleMapsReviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${review.sourceLabel} auf Google Maps ansehen`}
                >
                  <span className="reviewSourceMark" aria-hidden="true">G</span>
                  <span translate="no">Google Maps</span>
                  <span className="reviewArrow" aria-hidden="true">↗</span>
                </a>
                <blockquote>“{review.quote}”</blockquote>
                <span className="reviewAttribution">
                  {"reviewer" in review && review.reviewer && <cite>{review.reviewer}</cite>}
                  <span>{review.sourceLabel}</span>
                </span>
              </article>
            </li>
          ))}
        </ul>

        <p className="reviewDisclosure">
          Manuell ausgewählte öffentliche Rezensionen · Stand {reviewsUpdatedLabel} ·
          Aktuelle Bewertungen findest du direkt bei <span translate="no">Google Maps</span>.
        </p>
      </div>
    </section>
  );
}
