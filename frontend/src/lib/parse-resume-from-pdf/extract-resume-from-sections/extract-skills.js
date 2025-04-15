export const extractSkills = (sections) => {
    const descriptions = [];
    const featuredSkills = [];
  
    for (const section of sections) {
      if (!section.title.toLowerCase().includes("skill")) continue;
  
      const lines = section.content.split("\n").filter(Boolean);
  
      for (const line of lines) {
        if (line.includes(",")) {
          const keywords = line.split(",").map((s) => s.trim());
          for (const skill of keywords) {
            featuredSkills.push({ skill });
          }
        } else {
          descriptions.push(line);
        }
      }
    }
  
    return { descriptions, featuredSkills };
  };
  