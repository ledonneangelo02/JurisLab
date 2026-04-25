import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-black text-white flex items-center px-6 z-50">
      
      <div className="flex items-center gap-2">
        <img src="/jurisSuite_icon_white.svg" alt="JurisSuite Icon" className="h-10 w-10" />
        <span className="font-bold text-2xl">JurisSuite</span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex gap-8 text-lg items-center">
        <a href="/" className="hover:text-gray-400 transition">
          Home
        </a>

        <div className="relative group">
          <a href="/tools" className="hover:text-gray-400 transition block py-2"
          >
            Tools
          </a>

          <div className="absolute left-1/2 top-full -translate-x-1/2 hidden min-w-[220px] rounded-md bg-white py-2 text-black shadow-lg group-hover:block">
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

      <div className="absolute right-6 hidden">
        <button className="bg-white text-lg text-black px-3 py-1 rounded hover:bg-gray-300 transition">
          Sign In
        </button>
      </div>

    </nav>
  );
}