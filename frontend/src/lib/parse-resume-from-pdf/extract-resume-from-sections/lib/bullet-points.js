// List of bullet points
// Reference: https://stackoverflow.com/questions/56540160/why-isnt-there-a-medium-small-black-circle-in-unicode
// U+22C5   DOT OPERATOR (⋅)
// U+2219   BULLET OPERATOR (∙)
// U+1F784  BLACK SLIGHTLY SMALL CIRCLE (🞄)
// U+2022   BULLET (•) -------- most common
// U+2981   Z NOTATION SPOT (⦁)
// U+26AB   MEDIUM BLACK CIRCLE (⚫︎)
// U+25CF   BLACK CIRCLE (●)
// U+2B24   BLACK LARGE CIRCLE (⬤)
// U+26AC   MEDIUM SMALL WHITE CIRCLE ⚬
// U+25CB   WHITE CIRCLE ○
const BULLET_POINTS = [
    "⋅",
    "∙",
    "🞄",
    "•",
    "⦁",
    "⚫︎",
    "●",
    "⬤",
    "⚬",
    "○",
  ];
  
  export { BULLET_POINTS };
  // Convert bullet point lines into a string array aka descriptions.
  const getBulletPointsFromLines = (lines) => {
    // Simply return all lines with text item joined together if there is no bullet point
    const firstBulletPointLineIndex = getFirstBulletPointLineIdx(lines);
    if (firstBulletPointLineIndex === undefined) {
      return lines.map((line) => line.map((item) => item.text).join(" "));
    }
  
    // Otherwise, process and remove bullet points
  
    // Combine all lines into a single string
    let lineStr = "";
    for (let item of lines.flat()) {
      const text = item.text;
      // Make sure a space is added between 2 words
      if (!lineStr.endsWith(" ") && !text.startsWith(" ")) {
        lineStr += " ";
      }
      lineStr += text;
    }
  
    // Get the most common bullet point
    const commonBulletPoint = getMostCommonBulletPoint(lineStr);
  
    // Start line string from the beginning of the first bullet point
    const firstBulletPointIndex = lineStr.indexOf(commonBulletPoint);
    if (firstBulletPointIndex !== -1) {
      lineStr = lineStr.slice(firstBulletPointIndex);
    }
  
    // Divide the single string using bullet point as divider
    return lineStr
      .split(commonBulletPoint)
      .map((text) => text.trim())
      .filter((text) => text !== "");
  };
  