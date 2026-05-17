export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonHref?: string;
  featured?: boolean;
  badgeText?: string;
  planNumber: number;
  planCount: number;
  isFlipping: boolean;
  flipDirection: "next" | "previous";
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonHref = "/contact",
  featured = false,
  badgeText = "Best Value",
  planNumber,
  planCount,
  isFlipping,
  flipDirection,
}: PricingCardProps) {
  return (
    <article
      className={`pricing-book ${featured ? "pricing-book-featured" : ""} ${
        isFlipping ? `pricing-book-flipping pricing-book-flipping-${flipDirection}` : ""
      }`}
    >
      <div className="pricing-book-cover" aria-hidden="true" />
      <div className="pricing-book-spine" aria-hidden="true" />
      <div className="pricing-book-turn-page" aria-hidden="true" />

      <section className="pricing-book-page pricing-book-page-left">
        <div className="pricing-book-page-content">
          <p className="pricing-book-kicker">
            Plan {planNumber} of {planCount}
          </p>

          <div className="pricing-card-header">
            <h2 className="pricing-card-plan">{title}</h2>
            {featured && <span className="pricing-card-badge">{badgeText}</span>}
          </div>

          <div className="pricing-card-price">
            {price}
            {period && <span>{period}</span>}
          </div>

          <p className="pricing-card-description">{description}</p>
        </div>

        <a
          href={buttonHref}
          className={`pricing-card-button ${
            featured ? "" : "pricing-card-button-secondary"
          }`}
        >
          {buttonText}
        </a>
      </section>

      <section className="pricing-book-page pricing-book-page-right">
        <div>
          <p className="pricing-book-kicker">Included tools</p>
          <h3 className="pricing-book-feature-title">What you get</h3>
        <ul className="pricing-card-features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

        <p className="pricing-book-note">
          Switch plans anytime as your semester, clinic, or research workload changes.
        </p>
      </section>
    </article>
  );
}
