import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "./common";
import { styles, spacing } from "./styles";

export const ResumePDFWorkExperience = ({
  heading,
  workExperiences,
  themeColor,
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {workExperiences.map(
        ({ company, position, website, startDate, endDate, summary, highlights }, idx) => (
          <View key={idx} style={idx !== 0 ? { marginTop: spacing["4"] } : {}}>
            {company && (
              <ResumePDFText style={styles.workCompany}>
                {company}
              </ResumePDFText>
            )}
            <View style={styles.flexRowBetween}>
              {position && (
                <ResumePDFText style={styles.workPosition}>{position}</ResumePDFText>
              )}
              {(startDate || endDate) && (
                <ResumePDFText style={styles.workDates}>
                  {startDate} - {endDate || "Present"}
                </ResumePDFText>
              )}
            </View>
            {website && (
              <ResumePDFText style={styles.link}>
                {website}
              </ResumePDFText>
            )}
            {summary && (
              <ResumePDFText style={styles.workSummary}>
                {summary}
              </ResumePDFText>
            )}
            {highlights?.length > 0 && (
              <View style={styles.bulletList}>
                <ResumePDFBulletList items={highlights} />
              </View>
            )}
          </View>
        )
      )}
    </ResumePDFSection>
  );
};