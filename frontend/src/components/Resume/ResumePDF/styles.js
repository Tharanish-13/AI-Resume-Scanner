import { StyleSheet } from "@react-pdf/renderer";

// Tailwindcss Spacing Design System (converted to pt for react-pdf)
export const spacing = {
  0: "0",
  0.5: "1.5pt",
  1: "3pt",
  1.5: "4.5pt",
  2: "6pt",
  2.5: "7.5pt",
  3: "9pt",
  3.5: "10.5pt",
  4: "12pt",
  5: "15pt",
  6: "18pt",
  7: "21pt",
  8: "24pt",
  9: "27pt",
  10: "30pt",
  11: "33pt",
  12: "36pt",
  14: "42pt",
  16: "48pt",
  20: "60pt",
  24: "72pt",
};

export const styles = StyleSheet.create({
  // General Flexbox Styles
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexRowBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },

  // A4 Page Layout
  page: {
    padding: spacing[4],
      fontSize: "10pt",
      lineHeight: 1.5,
    fontFamily: "Helvetica",
  },

  // Section Heading
  sectionHeading: {
    fontSize: "12pt",
    fontWeight: "bold",
    marginBottom: spacing[2],
    color: "#333",
  },

  // Text Styles
  text: {
    fontSize: "10pt",
    marginBottom: spacing[1],
    color: "#333",
  },
  boldText: {
    fontSize: "10pt",
    fontWeight: "bold",
    marginBottom: spacing[1],
    color: "#333",
  },

  // Bullet List
  bulletList: {
    marginLeft: spacing[2],
    marginBottom: spacing[1],
  },
  bulletItem: {
    fontSize: "10pt",
    marginBottom: spacing[0.5],
  },

  // Links
  link: {
    color: "#007BFF",
    textDecoration: "underline",
    fontSize: "10pt",
  },

  // Profile Section
  profileName: {
    fontSize: "14pt",
    fontWeight: "bold",
    marginBottom: spacing[1],
  },
  profileLabel: {
    fontSize: "12pt",
    marginBottom: spacing[2],
  },
  profileContact: {
    fontSize: "10pt",
    marginBottom: spacing[1],
  },

  // Work Experience Section
  workCompany: {
    fontSize: "12pt",
    fontWeight: "bold",
    marginBottom: spacing[1],
  },
  workPosition: {
    fontSize: "10pt",
    marginBottom: spacing[0.5],
  },
  workDates: {
    fontSize: "10pt",
    color: "#666",
    marginBottom: spacing[1],
  },
  workSummary: {
    fontSize: "10pt",
    marginBottom: spacing[1],
  },

  // Education Section
  educationSchool: {
    fontSize: "12pt",
    fontWeight: "bold",
    marginBottom: spacing[1],
  },
  educationDegree: {
    fontSize: "10pt",
    marginBottom: spacing[0.5],
  },
  educationDates: {
    fontSize: "10pt",
    color: "#666",
    marginBottom: spacing[1],
  },

  // Skills Section
  skillItem: {
    fontSize: "10pt",
    marginBottom: spacing[0.5],
  },

  // Custom Sections (Volunteer, Awards, etc.)
  customSectionHeading: {
    fontSize: "12pt",
    fontWeight: "bold",
    marginBottom: spacing[2],
  },
  customSectionText: {
    fontSize: "10pt",
    marginBottom: spacing[1],
  },
}); 