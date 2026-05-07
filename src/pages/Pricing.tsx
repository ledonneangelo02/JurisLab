import PricingCard from '../components/PricingCard/PricingCard.js'
import '../components/PricingCard/PricingCard.css'

const plans = [
  {
    title: 'Free',
    price: '$0',
    period: '/month',
    description: 'A focused starter plan for trying JurisSuite with light coursework.',
    features: [
      'Brief Generator access',
      '10 document analysis credits per month',
      'Basic study workflow tools',
      'Community support',
    ],
    buttonText: 'Start Free',
    buttonHref: '/contact',
  },
  {
    title: 'Basic',
    price: '$9.99',
    period: '/month',
    description: 'For students who brief cases regularly and want faster prep each week.',
    features: [
      'Brief Generator and Case Analyzer access',
      '100 document analysis credits per month',
      'Flash cards and outline builder',
      'Email support',
    ],
    buttonText: 'Choose Basic',
    buttonHref: '/contact',
    featured: true,
  },
  {
    title: 'Pro',
    price: '$29.99',
    period: '/month',
    description: 'For heavy research weeks, clinics, journals, and advanced legal analysis.',
    features: [
      'Everything in Basic',
      '500 document analysis credits per month',
      'Advanced analytics tools',
      'Priority email support',
    ],
    buttonText: 'Choose Pro',
    buttonHref: '/contact',
  },
]

const comparisonRows = [
  ['Document analysis credits', '10/month', '100/month', '500/month'],
  ['Brief Generator', 'Yes', 'Yes', 'Yes'],
  ['Case Analyzer', 'Limited', 'Yes', 'Yes'],
  ['Flash cards and outlines', 'No', 'Yes', 'Yes'],
  ['Support', 'Community', 'Email', 'Priority email'],
]

export default function Pricing() {
  return (
    <section className="pricing-page">
      <div className="pricing-shell">
        <header className="pricing-hero">
          <p className="pricing-eyebrow">Simple plans for law school work</p>
          <h1>Choose the JurisSuite plan that fits your study load.</h1>
          <p>
            Start small, then move up when your reading list gets heavier. Each plan is
            built around faster briefs, cleaner analysis, and less formatting friction.
          </p>

          <div className="pricing-hero-points" aria-label="Pricing highlights">
            <span>No long-term contract</span>
            <span>Built for case prep</span>
            <span>Upgrade anytime</span>
          </div>
        </header>

        <div className="pricing-grid" aria-label="Pricing plans">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>

        <section className="pricing-comparison" aria-labelledby="pricing-comparison-title">
          <div className="pricing-section-header">
            <p className="pricing-eyebrow">Compare plans</p>
            <h2 id="pricing-comparison-title">What each plan includes</h2>
          </div>

          <div className="pricing-table-scroll">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Free</th>
                  <th scope="col">Basic</th>
                  <th scope="col">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feature, free, basic, pro]) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    <td>{free}</td>
                    <td>{basic}</td>
                    <td>{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  )
}
