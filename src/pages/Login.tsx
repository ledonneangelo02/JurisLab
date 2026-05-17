import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../lib/supabaseClient";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [authLoading, navigate, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-paper" aria-labelledby="login-title">
          <p className="auth-eyebrow">Client file access</p>
          <h1 id="login-title" className="auth-title">
            Welcome back
          </h1>
          <p className="auth-copy">
            Sign in to pick up your briefs, study workflow, and account details.
          </p>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-button" disabled={loading || authLoading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {error && <p className="auth-error">{error}</p>}

          <div className="auth-footer-row">
            <span>
              No account?{" "}
              <Link className="auth-link" to="/signup">
                Sign up
              </Link>
            </span>
            <Link className="auth-link" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </section>

        <aside className="auth-side-note" aria-label="Account notes">
          <div>
            <h2 className="auth-note-title">Before court starts</h2>
            <ul className="auth-note-list">
              <li>Use the same email you used when creating your JurisSuite account.</li>
              <li>Your session is managed by Supabase Auth.</li>
              <li>Password resets are sent directly to your inbox.</li>
            </ul>
          </div>
          <span className="auth-stamp">Authorized</span>
        </aside>
      </div>
    </main>
  );
}
