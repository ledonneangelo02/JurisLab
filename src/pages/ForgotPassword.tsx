import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Password reset instructions have been sent if that email is on file.");
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-paper" aria-labelledby="forgot-password-title">
          <p className="auth-eyebrow">Recover access</p>
          <h1 id="forgot-password-title" className="auth-title">
            Reset password
          </h1>
          <p className="auth-copy">
            Enter the email on your account and Supabase will send a recovery link.
          </p>

          <form className="auth-form" onSubmit={handleResetPassword}>
            <div className="auth-field">
              <label htmlFor="reset-email">Email</label>
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className="auth-button" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-message">{message}</p>}

          <div className="auth-footer-row">
            <Link className="auth-link" to="/login">
              Back to login
            </Link>
            <Link className="auth-link" to="/signup">
              Create account
            </Link>
          </div>
        </section>

        <aside className="auth-side-note" aria-label="Password reset notes">
          <div>
            <h2 className="auth-note-title">Recovery notes</h2>
            <ul className="auth-note-list">
              <li>Check your spam folder if the email does not arrive quickly.</li>
              <li>The reset link behavior is controlled in your Supabase Auth settings.</li>
              <li>A full update-password screen can be added once redirects are finalized.</li>
            </ul>
          </div>
          <span className="auth-stamp">Recovery</span>
        </aside>
      </div>
    </main>
  );
}
