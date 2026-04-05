import WelcomeComp from "../components/WelcomeComp/WelcomeComp"


export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-4 pt-20 text-center">
      <div class="col-span-1">
        <h1 className="pt-4 text-4xl font-bold mb-4 animate-fadeInUp">
          Welcome to JurisLab
        </h1>

        <p className="text-lg text-gray-700 mb-6 animate-fadeInUp delay-200">
          Your one-stop solution for legal research and analysis. Explore our tools and resources to stay ahead in the legal field.
        </p>

        <button className="bg-black font-bold text-white px-6 py-3 rounded-lg 
          hover:bg-gray-600 transition duration-300 ease-in-out 
          transform hover:-translate-y-1 hover:scale-105
          animate-fadeInUp delay-500">
          Get Started
        </button>
        <WelcomeComp />
      </div>
      
    </div>
  )
}