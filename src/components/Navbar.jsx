import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-black text-white flex items-center px-6 z-50">
      

      <div className="flex items-center gap-2">
        <img src="/jurislab_icon_white.svg" alt="JurisLab Icon" className="h-10 w-10" />
        <span className="font-bold text-2xl">JurisLab</span>
      </div>


      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-8 text-lg">
        <a href="/" className="hover:text-gray-400">Home</a>
        <a href="/tools" className="menu-hover hover:text-gray-400">Tools</a>
        <a href="/pricing" className="hover:text-gray-400">Pricing</a>
        <a href="/about" className="hover:text-gray-400">About Us</a>
        <a href="/contact" className="hover:text-gray-400">Contact</a>
      </div>
<div
            class="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Sunday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Monday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Tuesday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Wednesday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Thursday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Friday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Saturday
            </a>

        </div>

      <div className="hidden md:flex absolute right-6 gap-4">
        <button className="bg-white text-lg text-black px-3 py-1 rounded hover:bg-gray-300 transition">
          Sign In
        </button>
      </div>

      <div className="ml-auto md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>

  
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-black flex flex-col items-center gap-6 py-6 md:hidden">
          <a href="/" onClick={() => setIsOpen(false)}>Home</a>
          <a href="/tools" onClick={() => setIsOpen(false)}>Tools</a>
          <a href="/pricing" onClick={() => setIsOpen(false)}>Pricing</a>
          <a href="/about" onClick={() => setIsOpen(false)}>About Us</a>
          <a href="/contact" onClick={() => setIsOpen(false)}>Contact</a>

          <button className="bg-white text-black px-4 py-2 rounded">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}