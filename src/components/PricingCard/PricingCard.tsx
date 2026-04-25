interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  featured?: boolean;
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  featured = false,
}: PricingCardProps) {
  return (
    <div className={`pricing-card ${featured ? "pricing-card-featured" : ""}`}>
      {featured && <div className="pricing-card-badge">Most Popular</div>}

      <div>
        <h2 className="pricing-card-plan">{title}</h2>

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

      <button
        className={`pricing-card-button ${
          featured ? "" : "pricing-card-button-secondary"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}