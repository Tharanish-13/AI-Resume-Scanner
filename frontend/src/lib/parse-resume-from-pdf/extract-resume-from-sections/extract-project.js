export const extractProjects = (sections) => {
    const projects = [];
  
    for (const section of sections) {
      if (!section.title.toLowerCase().includes("project")) continue;
  
      const lines = section.content.split("\n").filter(Boolean);
  
      for (const line of lines) {
        projects.push({
          project: line,
          description: "",
        });
      }
    }
  
    return projects;
  };
  