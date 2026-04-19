import "./BriefGenerator.css";
import type { Brief } from "./BriefTypes";

interface BriefOutputProps {
  brief: Brief | null;
  loading: boolean;
  copied: boolean;
  onCopy: () => void;
}

export default function BriefOutput({
  brief,
  loading,
  copied,
  onCopy,
}: BriefOutputProps) {
  const hasBrief = Boolean(brief);

  return (
    <section className="xl:col-span-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Generated Case Brief</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your returned brief data will appear below.
          </p>
        </div>
      </div>

      {hasBrief ? (
        <pre className="overflow-x-auto rounded-2xl bg-slate-50 p-4 text-sm text-slate-800">
          {brief?.content}
        </pre>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
          {loading
            ? "Your brief is being generated..."
            : "No brief generated yet. Paste a case and click Generate Brief."}
        </div>
      )}

      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCopy}
          disabled={!hasBrief}
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
    </section>
  );
}
