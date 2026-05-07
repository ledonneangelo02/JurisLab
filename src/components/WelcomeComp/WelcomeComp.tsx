import "./WelcomeComp.css"
import WaitlistForm from "./WaitlistForm"

export default function WelcomeComp() {
  return (
    <section className="welcome-container flex flex-col w-full justify-center">
      <div className="hero-grid">
        <div className="handwriting-container flex-1">
          <h2>Filler</h2>
        </div>

        <div className="description-container flex-1">
          <p className="eyebrow">Legal intelligence designed for courtroom clarity</p>
          <h1 className="hero-title">
            Craft case briefs that feel premium, confident, and effortless.
          </h1>
          <p className="hero-copy">
            JurisSuite transforms your facts and filings into polished briefing
            summaries with elegant structure and trusted legal tone.
          </p>

          <div className="hero-actions">
            <a href="/pricing" className="primary-cta">View Plans</a>
            <a href="/contact" className="secondary-cta">Book a Demo</a>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="waitlist-form container">
        <WaitlistForm />
      </div>

      <hr className="divider" />

      <div className="feature-panel">
        <div className="feature-card">
          <h2>Briefs in minutes</h2>
          <p>Capture key facts, issues, holdings, and reasoning without the manual grind.</p>
        </div>
        <div className="feature-card">
          <h2>Designed for counsel</h2>
          <p>Visual clarity, confident language, and an elegant lawyer-first presentation.</p>
        </div>
        <div className="feature-card">
          <h2>Trusted workflow</h2>
          <p>Seamless integration with your case intake and drafting process.</p>
        </div>
      </div>

      <hr className="divider" />
    </section>
  )
}
