import { Fragment } from "react";
import { initialResumeState } from "../../lib/redux/resumeSlice";
import { deepClone } from "../../lib/deep-clone";

const TableRowHeader = ({ children }) => (
  <tr style={{ backgroundColor: "#f9fafb" }}>
    <th colSpan={2} style={{ padding: "8px", fontWeight: "600", textAlign: "left" }}>
      {children}
    </th>
  </tr>
);

const TableRow = ({ label, value, className }) => (
  <tr className={className}>
    <th style={{ padding: "8px", fontWeight: "500", textAlign: "left", borderTop: "1px solid #e5e7eb" }}>{label}</th>
    <td style={{ padding: "8px", borderTop: "1px solid #e5e7eb" }}>
      {Array.isArray(value)
        ? value.map((x, idx) => (
            <Fragment key={idx}>
              • {x}
              <br />
            </Fragment>
          ))
        : value || "N/A"}
    </td>
  </tr>
);

export const ResumeTable = ({ resume }) => {
  // Validate and filter educations
  const educations = Array.isArray(resume.educations) && resume.educations.length > 0
    ? resume.educations.filter((education) => education && education.school) // Filter out invalid entries
    : deepClone(initialResumeState.educations); // Provide fallback if no valid entries

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", color: "#111827", marginTop: "1rem" }}>
      <tbody>
        <TableRowHeader>Profile</TableRowHeader>
        <TableRow label="Name" value={resume.profile?.name} />
        <TableRow label="Email" value={resume.profile?.email} />
        <TableRow label="Phone" value={resume.profile?.phone} />
        <TableRow label="Location" value={resume.profile?.location?.address} />
        <TableRow label="Link" value={resume.profile?.url} />
        <TableRow label="Summary" value={resume.profile?.summary} />
        <TableRowHeader>Education</TableRowHeader>
        {educations.map((education, idx) => (
          <Fragment key={idx}>
            <TableRow label="School" value={education.school || "N/A"} />
            <TableRow label="Degree" value={education.degree || "N/A"} />
            <TableRow label="Start Date" value={education.startDate || "N/A"} />
            <TableRow label="End Date" value={education.endDate || "N/A"} />
            <TableRow label="Courses" value={education.courses || []} />
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};