interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonHref?: string;
  featured?: boolean;
  badgeText?: string;
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
}: PricingCardProps) {
  return (
    <article className={`pricing-card ${featured ? "pricing-card-featured" : ""}`}>
      <div className="pricing-card-content">
        <div className="pricing-card-header">
          <h2 className="pricing-card-plan">{title}</h2>
          {featured && <span className="pricing-card-badge">{badgeText}</span>}
        </div>

        <div className="pricing-card-price">
          {price}
          {period && <span>{period}</span>}
        </div>

        <p className="pricing-card-description">{description}</p>

        <hr className="pricing-card-divider" />

        <ul className="pricing-card-features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <a
        href={buttonHref}
        className={`pricing-card-button ${
          featured ? "" : "pricing-card-button-secondary"
        }`}
      >
        {buttonText}
      </a>
    </article>
  );
}
