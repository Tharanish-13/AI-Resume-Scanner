import { ResumePDFSection, ResumePDFText } from "./common";
import { styles } from "./styles";

export const ResumePDFProfile = ({ heading, profile, themeColor }) => {
  const {
    name,
    label,
    email,
    phone,
    location = {},
    profiles = [],
    summary,
  } = profile;

  return (
    <ResumePDFSection heading={heading} themeColor={themeColor}>
      {name && (
        <ResumePDFText style={styles.profileName}>
          {name}
        </ResumePDFText>
      )}
      {label && (
        <ResumePDFText style={styles.profileLabel}>
          {label}
        </ResumePDFText>
      )}
      {summary && (
        <ResumePDFText style={styles.text}>{summary}</ResumePDFText>
      )}
      {(email || phone || location.address) && (
        <ResumePDFText style={styles.profileContact}>
          {email && `Email: ${email}`}
          {phone && ` | Phone: ${phone}`}
          {location.address && ` | Address: ${location.address}, ${location.city}, ${location.region}`}
        </ResumePDFText>
      )}
      {profiles.length > 0 && (
        <ResumePDFSection heading="Profiles" themeColor={themeColor}>
          {profiles.map((profile, index) => (
            <ResumePDFText key={index} style={styles.text}>
              {profile.network}: {profile.url}
            </ResumePDFText>
          ))}
        </ResumePDFSection>
      )}
    </ResumePDFSection>
  );
};