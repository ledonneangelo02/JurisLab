import "./FooterHeader.css"

export default function Navbar() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist")

    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", "#waitlist")
      return
    }

    window.location.href = "/#waitlist"
  }

  return (
    <nav className="FooterHeader main-nav">
      <div className="nav-brand">
        <a href="/" className="brand-link flex items-center gap-2">
          <img src="/jurisSuite_icon_white.svg" alt="JurisSuite Icon" className="h-10 w-10" />
          <span className="font-bold text-2xl">JurisSuite</span>
        </a>
      </div>

      <div className="nav-links">
        <a href="/" className="nav-item hidden">Home</a>
        <div className="nav-item dropdown hidden">
          <a href="/tools" className="dropdown-trigger">Tools</a>
          <div className="dropdown-menu">
            <a href="/tools/brief-generator" className="dropdown-link">Brief Generator</a>
            <a href="/tools/case-analyzer" className="dropdown-link">Case Analyzer</a>
          </div>
        </div>
        <a href="/pricing" className="nav-item hidden">Pricing</a>
        <a href="/about" className="nav-item hidden">About Us</a>
        <a href="/contact" className="nav-item hidden">Contact</a>
      </div>

      <button
        className="nav-button"
        onClick={scrollToWaitlist}
      >
        Join Waitlist
      </button>
    </nav>
  )
}
