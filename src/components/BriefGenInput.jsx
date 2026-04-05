import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function BriefGenInput() {
  const [text, setText] = useState("");
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const sections = [
    "Case Name",
    "Evidentiary Facts",
    "Procedural Facts",
    "Issue",
    "Court Holding",
    "Rule Applied or Created",
    "Court Reasoning",
    "Judgment",
    "Concurring Opinions",
    "Dissenting Opinions",
  ];

  const sectionMap = [
    { label: "Evidentiary Facts", key: "evidentiaryFacts", number: 1 },
    { label: "Procedural Facts", key: "proceduralFacts", number: 2 },
    { label: "Issue", key: "issue", number: 3 },
    { label: "Court Holding", key: "courtHolding", number: 4 },
    { label: "Rule Applied or Created", key: "ruleAppliedOrCreated", number: 5 },
    { label: "Court Reasoning", key: "courtReasoning", number: 6 },
    { label: "Judgment", key: "judgment", number: 7 },
    { label: "Concurring Opinions", key: "concurringOpinions", number: 8 },
    { label: "Dissenting Opinions", key: "dissentingOpinions", number: 9 },
  ];

  const formatSectionContent = (value) => {
    if (!value || !value.trim()) {
      return "Not clearly stated in the excerpt.";
    }

    const lines = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) {
      return "Not clearly stated in the excerpt.";
    }

    return lines
      .map((line) => {
        // Keep existing markdown bullets
        if (line.startsWith("- ")) {
          return line;
        }

        // Keep numbered items
        if (/^\d+\.\s/.test(line)) {
          return line;
        }

        // Promote label-style lines into bold lead-ins
        if (
          line.endsWith(":") ||
          /^[A-Z][A-Za-z\s/&-]{2,60}$/.test(line)
        ) {
          return `**${line}**`;
        }

        // Default to bullet line
        return `- ${line}`;
      })
      .join("\n\n");
  };

  const fullBrief = useMemo(() => {
    if (!brief) return "";

    const caseName = brief.caseName?.trim() || "Untitled Case";

    return [
      `# ${caseName}`,
      "",
      ...sectionMap.flatMap((section) => [
        `## (${section.number}) ${section.label}`,
        "",
        formatSectionContent(brief[section.key]),
        "",
      ]),
    ].join("\n");
  }, [brief]);

  const handleCopy = async () => {
    if (!fullBrief) return;

    try {
      await navigator.clipboard.writeText(fullBrief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleSubmit = async (e) => {
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

      const data = await response.json();
      console.log("Frontend received:", data);

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      setBrief(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              JurisLab
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Generate Case Brief
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Paste case text, generate a structured brief, and review everything in one clean,
              study-friendly workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!fullBrief}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy Brief"}
            </button>

            <button
              type="button"
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-100"
            >
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <aside className="xl:col-span-3">
            <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Brief Sections</h2>
              <p className="mt-1 text-sm text-slate-500">
                Use this as your study structure for every case brief.
              </p>

              <nav className="mt-5 space-y-2">
                {sections.map((section, index) => (
                  <div
                    key={section}
                    className={`flex items-center justify-between rounded-2xl px-3 py-3 text-sm ${
                      index === 0
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span>{section}</span>
                    <span className="text-xs opacity-70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

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
                    onClick={() => {
                      setText("");
                      setBrief(null);
                      setError("");
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-100"
                  >
                    Clear Text
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || !text.trim()}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Brief"}
                </button>
              </div>

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </form>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Generated Case Brief</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Your formatted case brief will appear below.
                  </p>
                </div>
              </div>

              {brief ? (
                <div
                  className="
                    brief-output text-gray-900 leading-8
                    [&_h1]:mb-8 [&_h1]:text-4xl [&_h1]:font-bold
                    [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold
                    [&_p]:mb-4
                    [&_strong]:font-semibold
                    [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-7
                    [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-7
                    [&_li]:mb-3
                  "
                >
                  <ReactMarkdown>{fullBrief}</ReactMarkdown>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                  {loading
                    ? "Your brief is being generated..."
                    : "No brief generated yet. Paste a case and click Generate Brief."}
                </div>
              )}
            </section>
          </main>

          <aside className="space-y-6 xl:col-span-3">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Case Metadata</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Class / Course
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                    placeholder="e.g. Constitutional Law"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Topic
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                    placeholder="e.g. Judicial Review"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Professor Notes
                  </label>
                  <textarea
                    className="min-h-[110px] w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                    placeholder="Add your own study notes here..."
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              <div className="mt-4 grid gap-3">
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left text-sm font-medium hover:bg-slate-200">
                  Highlight key rule
                </button>
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left text-sm font-medium hover:bg-slate-200">
                  Turn into flashcards
                </button>
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left text-sm font-medium hover:bg-slate-200">
                  Compare to another brief
                </button>
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left text-sm font-medium hover:bg-slate-200">
                  Print study version
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Progress</h2>
              <div className="mt-4 rounded-2xl bg-slate-100 p-4">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Status</span>
                  <span>{brief ? "Complete" : loading ? "Working" : "Waiting"}</span>
                </div>

                <div className="mt-3 h-3 rounded-full bg-slate-200">
                  <div
                    className={`h-3 rounded-full bg-slate-900 transition-all ${
                      brief ? "w-full" : loading ? "w-2/3" : "w-1/4"
                    }`}
                  />
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  {brief
                    ? "Your case brief has been generated and is ready to review."
                    : loading
                    ? "Generating your structured brief now."
                    : "Paste a case and generate a brief to begin."}
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}