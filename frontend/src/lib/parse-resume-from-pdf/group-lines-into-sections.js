import { isSectionTitleLine } from "./extract-resume-from-sections/lib/common-features";

/**
 * Groups lines into sections based on section title heuristics.
 * Returns a mapping of section title -> lines[]
 */
export function groupLinesIntoSections(lines) {
  const sections = {};
  let currentSection = "profile";
  sections[currentSection] = [];

  for (const line of lines) {
    if (isSectionTitleLine(line)) {
      currentSection = line[0].text.toLowerCase().replace(/\s+/g, "-");
      sections[currentSection] = [];
    } else {
      sections[currentSection].push(line);
    }
  }

  return sections;
}