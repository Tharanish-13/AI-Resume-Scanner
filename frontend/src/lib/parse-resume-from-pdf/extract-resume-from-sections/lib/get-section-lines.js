// Break a block of items into line-based items
const getSectionLines = (items) => {
    const lines = [];
    let currentLine = [];
  
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
  
      // If the current item is on a new line
      if (
        currentLine.length > 0 &&
        Math.abs(currentLine[currentLine.length - 1].y - item.y) > 2
      ) {
        lines.push(currentLine);
        currentLine = [];
      }
  
      currentLine.push(item);
    }
  
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
  
    return lines;
  };
  
  module.exports = { getSectionLines };
  