import { Page, View, Document } from "@react-pdf/renderer";
import { styles, spacing } from "./styles";
import { ResumePDFProfile } from "./ResumePDFProfile";
import { ResumePDFWorkExperience } from "./ResumePDFWorkExperience";
import { ResumePDFEducation } from "./ResumePDFEducation";
import { ResumePDFProject } from "./ResumePDFProject";
import { ResumePDFSkills } from "./ResumePDFSkills";
import { ResumePDFCustom } from "./ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "../../../lib/redux/settingsSlice";

export const ResumePDF = ({ resume, settings, isPDF = false }) => {
  const {
    profile = {},
    workExperiences = [],
    educations = [],
    projects = [],
    skills = {},
    volunteer = [],
    awards = [],
    certificates = [],
    publications = [],
    languages = [],
    interests = [],
    references = [],
  } = resume || {};

  const {
    fontFamily = "Helvetica",
    fontSize = 11,
    documentSize = "A4",
    formToHeading = {},
  } = settings || {};

  const themeColor = settings.themeColor || DEFAULT_FONT_COLOR;

  return (
    <Document title={`${profile.name} Resume`} author={profile.name}>
      <Page
        size={documentSize === "A4" ? "A4" : "LETTER"}
        style={{
          ...styles.flexCol,
          color: themeColor,
          fontFamily,
          fontSize: fontSize + "pt",
        }}
      >
        <View style={{ padding: spacing[4] }}>
          <ResumePDFProfile profile={profile} themeColor={themeColor} />
          {workExperiences.length > 0 && (
            <ResumePDFWorkExperience
              heading={formToHeading.workExperiences}
              workExperiences={workExperiences}
              themeColor={themeColor}
            />
          )}
          {educations.length > 0 && (
            <ResumePDFEducation
              heading={formToHeading.educations}
              educations={educations}
              themeColor={themeColor}
            />
          )}
          {projects.length > 0 && (
            <ResumePDFProject
              heading={formToHeading.projects}
              projects={projects}
              themeColor={themeColor}
            />
          )}
          {skills.featuredSkills?.length > 0 && (
            <ResumePDFSkills
              heading={formToHeading.skills}
              skills={skills}
              themeColor={themeColor}
            />
          )}
          {volunteer.length > 0 && (
            <ResumePDFCustom
              heading={formToHeading.volunteer || "VOLUNTEER"}
              content={{ descriptions: volunteer.map((v) => v.summary) }}
            />
          )}
          {awards.length > 0 && (
            <ResumePDFCustom
              heading={formToHeading.awards || "AWARDS"}
              content={{ descriptions: awards.map((a) => a.summary) }}
            />
          )}
          {certificates.length > 0 && (
            <ResumePDFCustom
              heading={formToHeading.certificates || "CERTIFICATES"}
              content={{ descriptions: certificates.map((c) => `${c.name} (${c.issuer})`) }}
            />
          )}
          {publications.length > 0 && (
            <ResumePDFCustom
              heading={formToHeading.publications || "PUBLICATIONS"}
              content={{ descriptions: publications.map((p) => `${p.name} (${p.publisher})`) }}
            />
          )}
          {languages.length > 0 && (
            <ResumePDFCustom
              heading={formToHeading.languages || "LANGUAGES"}
              content={{
                descriptions: languages.map(
                  (l) => `${l.language} (${l.fluency})`
                ),
              }}
            />
          )}
          {interests.length > 0 && (
            <ResumePDFCustom
              heading={formToHeading.interests || "INTERESTS"}
              content={{ descriptions: interests }}
            />
          )}
          {references.length > 0 && (
            <ResumePDFCustom
              heading={formToHeading.references || "REFERENCES"}
              content={{
                descriptions: references.map(
                  (r) => `${r.name}: ${r.reference}`
                ),
              }}
            />
          )}
        </View>
      </Page>
    </Document>
  );
};