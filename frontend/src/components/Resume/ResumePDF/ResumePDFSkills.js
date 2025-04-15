import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumeFeaturedSkill,
} from "./common";
import { styles, spacing } from "./styles";

export const ResumePDFSkills = ({
  heading,
  skills,
  themeColor,
  showBulletPoints,
}) => {
  const { descriptions, featuredSkills } = skills;

  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {featuredSkills.length > 0 && (
        <View style={{ ...styles.flexRowBetween, marginTop: spacing["0.5"] }}>
          {featuredSkills.map((skill, idx) => (
            <ResumeFeaturedSkill
              key={idx}
              skill={skill.skill}
              rating={skill.rating}
              themeColor={themeColor}
              style={styles.skillItem}
            />
          ))}
        </View>
      )}
      <View style={styles.flexCol}>
        <ResumePDFBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFSection>
  );
};