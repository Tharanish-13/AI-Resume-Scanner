import { extractProfile } from "./extract-profile.js";
import { extractEducation } from "./extract-education.js";
import { extractProjects } from "./extract-project.js";
import { extractSkills } from "./extract-skills.js";
import { extractWorkExperiences } from "./extract-work-experience.js";

export const extractResumeFromSections = (sections) => {
  // Validate sections input
  if (!Array.isArray(sections) || sections.length === 0) {
    console.error("Invalid or empty sections data:", sections);
    return {
      profile: {},
      educations: [],
      projects: [],
      skills: { descriptions: [], featuredSkills: [] },
      workExperiences: [],
      custom: { descriptions: [] },
    };
  }

  // Extract data from sections
  try {
    return {
      profile: extractProfile(sections) || {},
      educations: extractEducation(sections) || [],
      projects: extractProjects(sections) || [],
      skills: extractSkills(sections) || { descriptions: [], featuredSkills: [] },
      workExperiences: extractWorkExperiences(sections) || [],
      custom: { descriptions: [] },
    };
  } catch (error) {
    console.error("Error extracting resume data from sections:", error);
    return {
      profile: {},
      educations: [],
      projects: [],
      skills: { descriptions: [], featuredSkills: [] },
      workExperiences: [],
      custom: { descriptions: [] },
    };
  }
};