// Get common features between two sets
const getCommonFeatures = (features1, features2) => {
  if (!Array.isArray(features1) || !Array.isArray(features2)) return [];

  const set1 = new Set(features1.map((f) => f.toLowerCase()));
  const set2 = new Set(features2.map((f) => f.toLowerCase()));

  const common = [];
  for (let item of set1) {
    if (set2.has(item)) {
      common.push(item);
    }
  }

  return common;
};

// Determine if a line is a section title based on heuristics
const isSectionTitleLine = (line) => {
  if (!Array.isArray(line) || line.length === 0) return false;

  const text = line.map((item) => item.text).join(" ");
  const isUpperCase = text === text.toUpperCase();
  const isBold = line.some((item) => item.fontWeight === "bold");

  return isUpperCase || isBold;
};

// Determine if an item is bold
const isBold = (item) => {
  return item.fontWeight === "bold";
};

module.exports = { getCommonFeatures, isSectionTitleLine, isBold };