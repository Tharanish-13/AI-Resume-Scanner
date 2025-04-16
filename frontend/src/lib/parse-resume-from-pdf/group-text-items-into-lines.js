export const groupTextItemsIntoLines = (textItems) => {
  const lines = [];

  let line = [];
  for (let item of textItems) {
    if (item.hasEOL) {
      if (item.text.trim() !== "") {
        line.push({ ...item });
      }
      lines.push(line);
      line = [];
    } else if (item.text.trim() !== "") {
      line.push({ ...item });
    }
  }

  if (line.length > 0) {
    lines.push(line);
  }

  const typicalCharWidth = getTypicalCharWidth(lines.flat());

  for (let line of lines) {
    for (let i = line.length - 1; i > 0; i--) {
      const currentItem = line[i];
      const leftItem = line[i - 1];
      const leftItemXEnd = leftItem.x + leftItem.width;
      const distance = currentItem.x - leftItemXEnd;

      if (distance <= typicalCharWidth) {
        if (shouldAddSpaceBetweenText(leftItem.text, currentItem.text)) {
          leftItem.text += " ";
        }
        leftItem.text += currentItem.text;
        const currentItemXEnd = currentItem.x + currentItem.width;
        leftItem.width = currentItemXEnd - leftItem.x;
        line.splice(i, 1);
      }
    }
  }

  return lines;
};

const BULLET_POINTS = ["•", "‣", "◦", "-", "‒", "–", "—", "*"];
// Helper: decide if space should be added when merging text
const shouldAddSpaceBetweenText = (leftText, rightText) => {
  const leftTextEnd = leftText[leftText.length - 1];
  const rightTextStart = rightText[0];

  // Ensure BULLET_POINTS is iterable
  const bulletPoints = Array.isArray(BULLET_POINTS) ? BULLET_POINTS : [];

  const conditions = [
    [":", ",", "|", ".", ...bulletPoints].includes(leftTextEnd) &&
      rightTextStart !== " ",
    leftTextEnd !== " " && ["|", ...bulletPoints].includes(rightTextStart),
  ];

  return conditions.some((c) => c);
};

/**
 * Get the average width of a "typical" character from commonly used font/height
 */
const getTypicalCharWidth = (textItems) => {
  textItems = textItems.filter((item) => item.text.trim() !== "");

  const heightToCount = {};
  let commonHeight = 0;
  let heightMaxCount = 0;

  const fontNameToCount = {};
  let commonFontName = "";
  let fontNameMaxCount = 0;

  for (let item of textItems) {
    const { text, height, fontName } = item;

    heightToCount[height] = (heightToCount[height] || 0) + 1;
    if (heightToCount[height] > heightMaxCount) {
      commonHeight = height;
      heightMaxCount = heightToCount[height];
    }

    fontNameToCount[fontName] = (fontNameToCount[fontName] || 0) + text.length;
    if (fontNameToCount[fontName] > fontNameMaxCount) {
      commonFontName = fontName;
      fontNameMaxCount = fontNameToCount[fontName];
    }
  }

  const commonTextItems = textItems.filter(
    (item) => item.fontName === commonFontName && item.height === commonHeight
  );

  const [totalWidth, numChars] = commonTextItems.reduce(
    ([preWidth, prevChars], cur) => [
      preWidth + cur.width,
      prevChars + cur.text.length,
    ],
    [0, 0]
  );

  return totalWidth / numChars;
};
