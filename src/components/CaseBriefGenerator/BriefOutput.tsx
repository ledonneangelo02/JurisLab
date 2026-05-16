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
    <section className="brief-sticky-panel brief-output-panel">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="brief-panel-title">Generated Case Brief</h2>
          <p className="brief-panel-copy mt-1">
            Your returned brief data will appear below.
          </p>
        </div>
      </div>

      {hasBrief ? (
        <pre className="brief-output-content">
          {brief?.content}
        </pre>
      ) : (
        <div className="brief-empty-state">
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
          className="brief-button-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy Brief"}
        </button>

        <button
          type="button"
          className="brief-button-secondary"
        >
          Export PDF
        </button>
      </div>
    </section>
  );
}
