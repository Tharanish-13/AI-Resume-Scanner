import { View, Text } from "@react-pdf/renderer";
import { styles, spacing } from "./styles";

export const ResumePDFCustom = ({ heading, content = {} }) => {
  const { descriptions = [] } = content;

  return (
    <View style={{ marginBottom: spacing[4] }}>
      {heading && (
        <Text style={styles.customSectionHeading}>
          {heading}
        </Text>
      )}
      {descriptions.map((desc, index) => (
        <Text key={index} style={styles.customSectionText}>
          {desc}
        </Text>
      ))}
    </View>
  );
};