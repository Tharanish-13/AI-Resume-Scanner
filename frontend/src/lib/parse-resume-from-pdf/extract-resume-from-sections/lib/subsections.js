// Divide sections into subsections based on keyword
const divideIntoSubsections = (sections, keyword) => {
    const subsections = [];
    let currentSubsection = [];
  
    for (let section of sections) {
      const sectionText = section
        .map((line) => line.map((item) => item.text).join(" "))
        .join(" ")
        .toLowerCase();
  
      if (sectionText.includes(keyword.toLowerCase())) {
        if (currentSubsection.length > 0) {
          subsections.push(currentSubsection);
        }
        currentSubsection = [section];
      } else {
        currentSubsection.push(section);
      }
    }
  
    if (currentSubsection.length > 0) {
      subsections.push(currentSubsection);
    }
  
    return subsections;
  };
  
  module.exports = { divideIntoSubsections };
  