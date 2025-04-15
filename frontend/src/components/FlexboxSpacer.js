import React from "react";

export const FlexboxSpacer = ({ maxWidth, minWidth = 0, className = "" }) => {
  const spacerStyle = {
    maxWidth: `${maxWidth}px`,
    minWidth: `${minWidth}px`,
    flexShrink: 10000,
    flexGrow: 1,
    visibility: "hidden"
  };

  return <div className={`flexbox-spacer ${className}`} style={spacerStyle}></div>;
};
