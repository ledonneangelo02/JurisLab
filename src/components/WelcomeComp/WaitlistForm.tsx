import { useState } from "react"
import "./WelcomeComp.css"


export default function WaitlistForm() {
  
  const [WaitlistEmail, setWaitlistEmail] = useState("")
  const [AcceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;
  const API_BASE_URL = (import.meta as any).env.VITE_SITE_API;

  
  const joinWaitlist = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      if (!AcceptedTerms) {
        setError("You must accept the terms to join the waitlist.");
        return;
      } else {

        const response = await fetch(`${API_BASE_URL}/api/waitlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
    
            email: WaitlistEmail,

          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Server error: ${response.status}`);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="waitlist-form-container justify-center bg-gray-100 p-8 m-5 rounded-lg shadow-md">
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="text-3xl font-bold mb-4">Join the Waitlist</h2>
        <p className="text-gray-600">
          Be the first to know when JurisSuite launches. Sign up for our waitlist and get exclusive early access!
        </p>
      </div>
      <form onSubmit={joinWaitlist} className="flex flex-col gap-4 ">
        <div className="justify-center flex flex-row gap-5">
          <input 
            type="email"
            placeholder="Enter your email"
            className="p-3 w-2/5 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            value={WaitlistEmail}
            onChange={(e) => setWaitlistEmail(e.target.value)}
          />
          <button style={{ fontFamily: "Michaela-Grace" }} className=" w-fit text-3xl bg-black text-white py-2 px-10 rounded-md hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          type="submit"
          >
            Join The Waitlist
          </button>
        </div>
      
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="AcceptTerms"
            name="AcceptTerms"
            required
            className="mt-1"
            value={AcceptedTerms ? "accepted" : "not_accepted"}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label htmlFor="AcceptTerms" className="text-xs">
            I consent to receive consulting services by email for information about the material and services offered by JurisLab. I understand that I can unsubscribe at any time.
          </label>
        </div>
        
      </form>
    </div>
  )
}