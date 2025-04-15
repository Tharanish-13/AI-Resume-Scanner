import { View, Text } from "@react-pdf/renderer";
import { styles, spacing } from "./styles";

export const ResumePDFProject = ({ heading, projects, themeColor }) => {
  return (
    <View style={{ marginBottom: spacing[4] }}>
      {heading && (
        <Text style={styles.sectionHeading}>
          {heading}
        </Text>
      )}
      {projects.map((project, index) => (
        <View key={index} style={{ marginBottom: spacing[3] }}>
          <Text style={styles.boldText}>
            {project.project}
          </Text>
          <Text style={styles.text}>{project.description}</Text>
          {project.highlights?.length > 0 && (
            <View style={styles.bulletList}>
              {project.highlights.map((highlight, idx) => (
                <Text key={idx} style={styles.bulletItem}>
                  • {highlight}
                </Text>
              ))}
            </View>
          )}
          {project.links?.length > 0 && (
            <View>
              {project.links.map((link, idx) => (
                <Text
                  key={idx}
                  style={styles.link}
                >
                  {link.label}: {link.url}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};