export { readPdf } from "./read-pdf";
export { groupTextItemsIntoLines } from "./group-text-items-into-lines";
export { groupLinesIntoSections } from "./group-lines-into-sections";
export { extractResumeFromSections } from "./extract-resume-from-sections";
export async function parseResumeFromPdf(fileUrl) {
  // Dummy parser for now
  return {
    workExperiences: [],
    educations: [],
    projects: [],
    skills: { descriptions: [] },
    custom: { descriptions: [] },
  };
}
