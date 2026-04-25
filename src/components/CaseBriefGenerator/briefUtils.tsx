import type { Brief } from "./BriefTypes";
import { briefSections } from "./briefSections";

export function formatSectionContent(value: string) {
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
      if (line.startsWith("- ")) {
        return line;
      }

      if (/^\d+\.\s/.test(line)) {
        return line;
      }

      if (line.endsWith(":") || /^[A-Z][A-Za-z\s/&-]{2,60}$/.test(line)) {
        return `**${line}**`;
      }

      return `- ${line}`;
    })
    .join("\n\n");
}

export function buildFullBrief(brief: Brief | null) {
  if (!brief) return "";

  const caseName = brief.caseName?.trim() || "Untitled Case";

  const lines = [`# ${caseName}`, ""];

  for (const section of briefSections) {
    lines.push(`## (${section.number}) ${section.label}`);
    lines.push("");
    lines.push(formatSectionContent(brief[section.key] || ""));
    lines.push("");
  }

  return lines.join("\n");
}
