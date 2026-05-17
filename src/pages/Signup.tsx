import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../lib/supabaseClient";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [authLoading, navigate, user]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Account created. Check your email to confirm your account.");
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-paper" aria-labelledby="signup-title">
          <p className="auth-eyebrow">Open a new file</p>
          <h1 id="signup-title" className="auth-title">
            Create account
          </h1>
          <p className="auth-copy">
            Start a JurisSuite workspace for briefs, analysis, and study tools.
          </p>

          <form className="auth-form" onSubmit={handleSignup}>
            <div className="auth-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-button" disabled={loading || authLoading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-message">{message}</p>}

          <div className="auth-footer-row">
            <span>
              Already have an account?{" "}
              <Link className="auth-link" to="/login">
                Log in
              </Link>
            </span>
          </div>
        </section>

        <aside className="auth-side-note" aria-label="Signup notes">
          <div>
            <h2 className="auth-note-title">Workspace checklist</h2>
            <ul className="auth-note-list">
              <li>Email confirmation depends on your Supabase project settings.</li>
              <li>Passwords are handled by Supabase Auth, not stored in this app.</li>
              <li>You can add profile and plan data after this base flow is working.</li>
            </ul>
          </div>
          <span className="auth-stamp">Filed</span>
        </aside>
      </div>
    </main>
  );
}
