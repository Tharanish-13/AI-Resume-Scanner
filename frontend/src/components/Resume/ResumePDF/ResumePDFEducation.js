import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "./common";
import { styles, spacing } from "./styles";

export const ResumePDFEducation = ({ heading, educations, themeColor }) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {educations.map(({ school, degree, startDate, endDate, courses }, idx) => (
        <View key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
          <ResumePDFText style={styles.educationSchool} bold={true}>
            {school}
          </ResumePDFText>
          <View
            style={{
              ...styles.flexRowBetween,
              marginTop: spacing["1.5"],
            }}
          >
            <ResumePDFText style={styles.educationDegree}>{degree}</ResumePDFText>
            <ResumePDFText style={styles.educationDates}>
              {startDate} - {endDate || "Present"}
            </ResumePDFText>
          </View>
          <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
            <ResumePDFBulletList items={courses} />
          </View>
        </View>
      ))}
    </ResumePDFSection>
  );
};