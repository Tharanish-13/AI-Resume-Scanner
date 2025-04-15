"use client";
import { ResumePDF } from "../components/Resume/ResumePDF";
import { initialResumeState } from "../lib/redux/resumeSlice"; // Static resume data
import { initialSettings } from "../lib/redux/settingsSlice"; // Static settings
import { ResumeIframeCSR } from "../components/Resume/ResumeIFrame";
import { useTailwindBreakpoints } from "../lib/hooks/useTailwindBreakpoints"; // Responsive breakpoints

export const StaticResume = () => {
  const { isLg } = useTailwindBreakpoints();

  return (
    <div className="static-resume">
      <ResumeIframeCSR documentSize="Letter" scale={isLg ? 0.7 : 0.5}>
        <ResumePDF
          resume={initialResumeState}
          settings={{
            ...initialSettings,
            fontSize: "12",
            formToHeading: {
              workExperiences: "WORK EXPERIENCE",
              educations: "EDUCATION",
              projects: "PROJECTS",
              skills: "SKILLS",
              volunteer: "VOLUNTEER",
              awards: "AWARDS",
              certificates: "CERTIFICATES",
              publications: "PUBLICATIONS",
              languages: "LANGUAGES",
              interests: "INTERESTS",
              references: "REFERENCES",
            },
          }}
        />
      </ResumeIframeCSR>
    </div>
  );
};