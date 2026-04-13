import WelcomeComp from "../components/WelcomeComp/WelcomeComp.js"
import HandWriting from "../components/WelcomeComp/HandWriting.js"

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 pt-20 text-center">
        <div class="col-span-1">
          <HandWriting />
        </div>
        <div class="col-span-1">
          <h1 className="pt-4 text-4xl font-bold mb-4 animate-fadeInUp">
            Welcome to JurisLab
          </h1>

          <button className="bg-black font-bold text-white px-6 py-3 rounded-lg 
            hover:bg-gray-600 transition duration-300 ease-in-out 
            transform hover:-translate-y-1 hover:scale-105
            animate-fadeInUp delay-500">
            Get Started
          </button>
          <WelcomeComp />
        </div>
      </div>
      <div className="mt-10">
        <hr className="h-3 border-0 bg-gradient-to-t from-black to-transparent" />
        <h1>Hello World</h1>

      </div>
    </div>
  )
}