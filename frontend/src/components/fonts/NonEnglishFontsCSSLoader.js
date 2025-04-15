import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "../fonts/lib";

const FontsZhCSR = dynamic(() => import("../fonts/FontsZh"), {
  ssr: false,
});

export const NonEnglishFontsCSSLazyLoader = () => {
  const [shouldLoadFontsZh, setShouldLoadFontsZh] = useState(false);

  useEffect(() => {
    if (getAllFontFamiliesToLoad().includes("NotoSansSC")) {
      setShouldLoadFontsZh(true);
    }
  }, []);

  return <>{shouldLoadFontsZh && <FontsZhCSR />}</>;
};
