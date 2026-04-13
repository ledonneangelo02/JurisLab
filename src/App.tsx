import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar.js'
import Home from './pages/Home.js'
import About from './pages/About.js'
import Contact from './pages/Contact.js'
import Footer from './components/Layout/Footer.js'
import Tools from './pages/Tools.js'
import Pricing from './pages/Pricing.js'
import CaseBriefGenerator from './pages/CaseBriefGenerator.js'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/brief-generator" element={<CaseBriefGenerator />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App