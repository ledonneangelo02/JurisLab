import { useState } from 'react'
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

export default function Pricing() {
  const [activePlanIndex, setActivePlanIndex] = useState(1)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'next' | 'previous'>('next')
  const activePlan = plans[activePlanIndex]
  if (!activePlan) {
    return null
  }
  const showPlan = (nextIndex: number, direction: 'next' | 'previous') => {
    if (isFlipping || nextIndex === activePlanIndex) return

    setFlipDirection(direction)
    setIsFlipping(true)

    window.setTimeout(() => {
      setActivePlanIndex(nextIndex)
    }, 180)

    window.setTimeout(() => {
      setIsFlipping(false)
    }, 520)
  }

  const getPreviousIndex = () => {
    return activePlanIndex === 0 ? plans.length - 1 : activePlanIndex - 1
  }

  const getNextIndex = () => {
    return activePlanIndex === plans.length - 1 ? 0 : activePlanIndex + 1
  }

  const showPreviousPlan = () => {
    showPlan(getPreviousIndex(), 'previous')
  }

  const showNextPlan = () => {
    showPlan(getNextIndex(), 'next')
  }

  return (
    <section className="pricing-page">
      <div className="pricing-shell">
        <header className="pricing-hero">
          <span className="pricing-hero-tape pricing-hero-tape-left" aria-hidden="true" />
          <span className="pricing-hero-tape pricing-hero-tape-right" aria-hidden="true" />
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

        <div className="pricing-book-stage" aria-label="Pricing plans">
          <button
            type="button"
            className="pricing-book-arrow pricing-book-arrow-left"
            onClick={showPreviousPlan}
            disabled={isFlipping}
            aria-label="View previous plan"
          >
            <span aria-hidden="true" />
          </button>

          <PricingCard
            {...activePlan}
            planNumber={activePlanIndex + 1}
            planCount={plans.length}
            isFlipping={isFlipping}
            flipDirection={flipDirection}
          />

          <button
            type="button"
            className="pricing-book-arrow pricing-book-arrow-right"
            onClick={showNextPlan}
            disabled={isFlipping}
            aria-label="View next plan"
          >
            <span aria-hidden="true" />
          </button>
        </div>

        <div className="pricing-plan-tabs" aria-label="Choose a plan">
          {plans.map((plan) => (
            <button
              key={plan.title}
              type="button"
              className={`pricing-plan-tab ${
                plan.title === activePlan.title ? 'pricing-plan-tab-active' : ''
              }`}
              onClick={() =>
                showPlan(
                  plans.indexOf(plan),
                  plans.indexOf(plan) > activePlanIndex ? 'next' : 'previous',
                )
              }
              disabled={isFlipping}
            >
              <span>{plan.title}</span>
              <strong>{plan.price}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
