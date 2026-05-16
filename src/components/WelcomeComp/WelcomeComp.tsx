import { useEffect } from "react"
import notepadMagnifyingImage from "../../assets/images/Notepad_and_magnifying.png"
import notepadPenImage from "../../assets/images/Notepad_and_Pen.png"
import scalesImage from "../../assets/images/Scales_of_Justice.png"
import "./WelcomeComp.css"
import WaitlistForm from "./WaitlistForm"

const toolCards = [
  {
    title: "Brief Generator",
    description: "Turn long case text into a clean brief with facts, issues, holdings, and reasoning.",
    image: notepadMagnifyingImage,
    alt: "Notepad and magnifying glass representing generated case briefs",
  },
  {
    title: "Case Analyzer",
    description: "Scan notes and case materials for the details that matter most before class.",
    image: scalesImage,
    alt: "Scales representing legal case analysis",
  },
  {
    title: "Outline Builder",
    description: "Shape class notes into organized outlines you can review before exams.",
    image: notepadPenImage,
    alt: "Notepad and pen representing legal outline drafting",
  },
]

export default function WelcomeComp() {
  useEffect(() => {
    if (window.location.hash !== "#waitlist") return

    window.requestAnimationFrame(() => {
      document.getElementById("waitlist")?.scrollIntoView({ block: "start" })
    })
  }, [])

  return (
    <section className="welcome-container flex flex-col w-full justify-center">
      <div className="hero-grid">
        <div className="description-container flex-1">
          <p className="eyebrow">A smart, all-in-one law school study companion</p>

          <p className="hero-copy">
            Focus on learning and analysis while we handle the formatting and organization.
          </p>

          <div className="hero-actions">
            
          </div>
        </div>

        <div className="primary-description-container flex-1">
          <h3 className="hero-title">
            JurisSuite simplifies your law school workload
          </h3>
          <ul className="feature-list">
            <li>Brief Generator: Create clear, concise briefs in minutes.</li>
            <li>Case Analyzer: Instantly extract key facts, issues, and holdings.</li>
            <li>Flash Cards: Reinforce your memory with interactive study cards.</li>
            <li>Outline Builder: Create comprehensive outlines in minutes.</li>
          </ul>
        </div>
      </div>

      <hr className="divider" />

      <div className="feature-panel">
        {toolCards.map((tool) => (
          <article className="feature-card" key={tool.title}>
            <div className="feature-card-media">
              <img src={tool.image} alt={tool.alt} loading="lazy" />
            </div>
            <div className="feature-card-body">
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
            </div>
          </article>
        ))}
      </div>

      <hr className="divider" />
    
      <div id="waitlist" className="waitlist-form container">
        <WaitlistForm />
      </div>
    </section>
  )
}
