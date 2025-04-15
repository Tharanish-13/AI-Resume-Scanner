export const extractProfile = (sections) => {
  if (!Array.isArray(sections)) {
    console.error("Invalid sections data in extractProfile:", sections);
    return {
      name: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
    };
  }

  let name = "";
  let email = "";
  let phone = "";
  let location = "";
  let website = "";
  let linkedin = "";
  let github = "";

  const contactKeywords = ["email", "phone", "linkedin", "github", "location", "address"];

  for (const section of sections) {
    if (section.title?.toLowerCase().includes("profile") || section.title?.toLowerCase().includes("contact")) {
      const lines = section.content?.split("\n") || [];

      for (const line of lines) {
        const lower = line.toLowerCase();
        if (lower.includes("email")) email = line;
        else if (lower.includes("phone")) phone = line;
        else if (lower.includes("linkedin")) linkedin = line;
        else if (lower.includes("github")) github = line;
        else if (lower.includes("location") || lower.includes("address")) location = line;
        else if (lower.includes("http")) website = line;
        else if (!contactKeywords.some((kw) => lower.includes(kw)) && name === "") {
          name = line;
        }
      }
    }
  }

  return {
    name,
    email,
    phone,
    location,
    website,
    linkedin,
    github,
  };
};