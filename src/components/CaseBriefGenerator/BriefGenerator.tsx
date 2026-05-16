import { useState } from "react";
import type { Brief } from "./BriefTypes";
import "./BriefGenerator.css";

export default function BriefGenerator() {
  const [text, setText] = useState("");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;

  const handleCopy = async () => {
    if (!brief) return;

    try {
      await navigator.clipboard.writeText(
        brief.content ?? JSON.stringify(brief, null, 2),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submittedText = text.trim();
    if (!submittedText) return;

    setLoading(true);
    setError("");
    setBrief(null);
    setCopied(false);

    // clears the sticky note immediately
    setText("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/brief`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: submittedText }),
      });

      const data: unknown = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : `Server error: ${response.status}`;

        throw new Error(errorMessage);
      }

      setBrief(data as Brief);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="brief-generator-page text-slate-900">
      <div className="brief-generator-shell">
        <div className="brief-generator-grid brief-generator-grid-solo">
          <main className="brief-generator-main">
            <form
              onSubmit={handleSubmit}
              className="brief-sticky-panel brief-input-panel"
            >
              {loading ? (
                <div className="brief-loading-state">
                  <span
                    className="brief-loading-spinner"
                    aria-hidden="true"
                  />
                  <p className="brief-panel-title">Generating Brief...</p>
                  <p className="brief-panel-copy">
                    Your case text is being converted into a structured brief.
                  </p>
                </div>
              ) : brief ? (
                <>
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="brief-panel-title">
                        Generated Case Brief
                      </h2>
                      <p className="brief-panel-copy mt-1">
                        Your generated case brief is ready.
                      </p>
                    </div>
                  </div>

                  <pre className="brief-output-content">{brief.content}</pre>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      className="brief-button-secondary"
                      onClick={() => {
                        setText("");
                        setBrief(null);
                        setError("");
                        setCopied(false);
                      }}
                    >
                      Start Over
                    </button>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="brief-button-secondary"
                      >
                        {copied ? "Copied!" : "Copy Brief"}
                      </button>

                      <button type="button" className="brief-button-secondary">
                        Export PDF
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="brief-panel-title">Input Case Text</h2>
                      <p className="brief-panel-copy mt-1">
                        Paste the case text you want converted into a structured
                        brief.
                      </p>
                    </div>

                    <span className="brief-char-count">
                      {text.length.toLocaleString()} chars
                    </span>
                  </div>

                  <label className="brief-label mt-5 block">
                    Enter case text:
                  </label>

                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="brief-textarea mt-2"
                    placeholder="Paste the case text here..."
                  />

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="brief-button-secondary"
                        onClick={() => {
                          setText("");
                          setBrief(null);
                          setError("");
                        }}
                      >
                        Clear Text
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={!text.trim()}
                      className="brief-button-primary inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Generate Brief
                    </button>
                  </div>
                </>
              )}

              {error && <p className="brief-error mt-4">{error}</p>}
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
