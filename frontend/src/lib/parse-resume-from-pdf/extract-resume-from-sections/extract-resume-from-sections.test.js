import { extractResumeFromSections } from "./index.js";

const mockSections = [
  { title: "Profile", content: "John Doe\nEmail: john@example.com\nPhone: 1234567890" },
  { title: "Education", content: "University of Testing\nB.Sc. in Mock Data" },
  { title: "Projects", content: "Mock Project\nBuilt with love" },
  { title: "Skills", content: "JavaScript\nReact\nNode.js" },
  { title: "Work Experience", content: "Company A\nFrontend Developer" },
];

try {
  const resume = extractResumeFromSections(mockSections);
  console.log(JSON.stringify(resume, null, 2));
} catch (error) {
  console.error("Error extracting resume:", error);
}