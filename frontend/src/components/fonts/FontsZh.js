import { useEffect } from "react";

const FontsZh = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/fonts/fonts-zh.css"; // Path to the CSS file in the public folder
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); // Clean up the link tag on component unmount
    };
  }, []);

  return null;
};

export default FontsZh;