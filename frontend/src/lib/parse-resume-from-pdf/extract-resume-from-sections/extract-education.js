export const extractEducation = (sections) => {
  if (!Array.isArray(sections)) {
    console.error("Invalid sections data in extractEducation:", sections);
    return [];
  }

  const educations = [];

  for (const section of sections) {
    if (!section.title.toLowerCase().includes("education")) continue;

    const lines = section.content.split("\n").filter(Boolean);

    for (const line of lines) {
      if (line.trim()) {
        educations.push({
          school: line.trim(),
          degree: "",
          startDate: "",
          endDate: "",
          grade: "",
          description: "",
        });
      }
    }
  }

  return educations;
};