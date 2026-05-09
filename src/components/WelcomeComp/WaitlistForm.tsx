import { useState } from "react";
import "./WelcomeComp.css";

export default function WaitlistForm() {
  const [WaitlistEmail, setWaitlistEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [AcceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_SITE_API;

  const joinWaitlist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!AcceptedTerms) {
        setError("You must accept the terms to join the waitlist.");
        return;
      }

      if (!API_BASE_URL) {
        setError("API URL is not configured.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: WaitlistEmail,
          firstName: FirstName,
          acceptedTerms: AcceptedTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to join the waitlist. Please try again.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="waitlist-form-container">
      <span className="thumb-tack thumb-tack-top-left" aria-hidden="true" />
      <span className="thumb-tack thumb-tack-top-right" aria-hidden="true" />
      <span className="thumb-tack thumb-tack-bottom-left" aria-hidden="true" />
      <span className="thumb-tack thumb-tack-bottom-right" aria-hidden="true" />

      {success ? (
        <div className="flex flex-col items-center text-center gap-4 py-10">
          <h2 className="text-3xl font-bold">You’re on the waitlist!</h2>
          <p className="text-gray-600 max-w-xl">
            Thanks, {FirstName || "there"} — we received your signup and will email you with updates about JurisSuite.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Join the Waitlist</h2>
            <p className="text-gray-600 max-w-xl">
              Be the first to know when JurisSuite launches. Sign up for our waitlist and get exclusive early access!
            </p>
          </div>

          <form onSubmit={joinWaitlist} className="flex flex-col items-center gap-5">
            <div className="flex flex-col gap-3 w-full max-w-md">
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full p-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={WaitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">
                {error}
              </p>
            )}

            <button
              style={{ fontFamily: "Michaela-Grace" }}
              className="waitlist-submit-button text-3xl py-2 px-10 rounded-md focus:outline-none disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Joining..." : "Join The Waitlist"}
            </button>

            <div className="flex items-start gap-2 w-full max-w-md">
              <input
                type="checkbox"
                id="AcceptTerms"
                name="AcceptTerms"
                required
                className="mt-1"
                checked={AcceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />

              <label htmlFor="AcceptTerms" className="text-xs text-gray-700 leading-relaxed">
                I consent to receive consulting services by email for information about the material and services offered by JurisSuite. I understand that I can unsubscribe at any time.
              </label>
            </div>
          </form>
        </>
      )}
    </div>
  );
}