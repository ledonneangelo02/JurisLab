import { useState, type FormEvent } from "react";
import BriefOutput from "./BriefOutput";
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
      await navigator.clipboard.writeText(JSON.stringify(brief, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setBrief(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/brief`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      // ✅ safer typing instead of implicit any
      const data: unknown = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as any).error === "string"
            ? (data as any).error
            : `Server error: ${response.status}`;

        throw new Error(errorMessage);
      }

      setBrief(data as Brief); // cast to your type
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <main className="space-y-6 xl:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Input Case Text</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Paste the case text you want converted into a structured brief.
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {text.length.toLocaleString()} chars
                </span>
              </div>

              <label className="mt-5 block text-sm font-semibold text-slate-700">
                Enter case text:
              </label>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-2 min-h-[260px] w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                placeholder="Paste the case text here..."
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-100"
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
                  disabled={loading || !text.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading && (
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                  )}
                  <span>{loading ? "Generating..." : "Generate Brief"}</span>
                </button>
              </div>

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </form>
          </main>

          <BriefOutput
            brief={brief}
            loading={loading}
            copied={copied}
            onCopy={handleCopy}
          />
        </div>
      </div>
    </div>
  );
}
