import "./FooterHeader.css"

export default function Navbar() {
  return (
    <nav className="FooterHeader fixed border-b top-0 left-0 w-full h-20 text-black flex items-center z-50">
      
      <a href="/" className="flex items-center gap-2">
        <img src="/jurisSuite_icon.svg" alt="JurisSuite Icon" className="h-10 w-10" />
        <span className="font-bold text-2xl">JurisSuite</span>
      </a>

      <div className="flex gap-8 text-lg items-center ml-auto mr-6">
        <a href="/" className="hover:text-gray-400 transition">
          Home
        </a>

        <div className="relative group">
          <a href="/tools" className="hover:text-gray-400 transition block py-2"
          >
            Tools
          </a>

          <div className="left-1/2 top-full -translate-x-1/2 hidden min-w-[220px] rounded-md bg-white py-2 text-black shadow-lg group-hover:block">
            <a href="/tools/brief-generator" className="block px-4 py-2 hover:bg-gray-100">
              Brief Generator
            </a>
            <a href="/tools/case-analyzer" className="block px-4 py-2 hover:bg-gray-100">
              Case Analyzer
            </a>
          </div>
        </div>

        <a href="/pricing" className="hover:text-gray-400 transition">
          Pricing
        </a>
        <a href="/about" className="hover:text-gray-400 transition">
          About Us
        </a>
        <a href="/contact" className="hover:text-gray-400 transition">
          Contact
        </a>
      </div>

      <div className="right-6">
        <button className="bg-white text-lg text-black px-3 py-1 rounded hover:bg-gray-300 transition onClick={() => window.location.href='/waitlist'}">
          Join Waitlist
        </button>
      </div>

    </nav>
  );
}