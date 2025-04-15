export const extractWorkExperiences = (sections) => {
    const workExperiences = [];
  
    for (const section of sections) {
      if (!section.title.toLowerCase().includes("work") &&
          !section.title.toLowerCase().includes("experience")) continue;
  
      const lines = section.content.split("\n").filter(Boolean);
  
      for (const line of lines) {
        workExperiences.push({
          company: line,
          title: "",
          startDate: "",
          endDate: "",
          description: "",
        });
      }
    }
  
    return workExperiences;
  };
  