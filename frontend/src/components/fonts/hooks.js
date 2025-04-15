import { useEffect } from "react";
import { Font } from "@react-pdf/renderer";
import { ENGLISH_FONT_FAMILIES } from "../../components/fonts/constants";
import { getAllFontFamiliesToLoad } from "../../components/fonts/lib";

export const useRegisterReactPDFFont = () => {
  useEffect(() => {
    const allFontFamilies = getAllFontFamiliesToLoad();
    allFontFamilies.forEach((fontFamily) => {
      Font.register({
        family: fontFamily,
        fonts: [
          { src: `fonts/${fontFamily}-Regular.ttf` },
          { src: `fonts/${fontFamily}-Bold.ttf`, fontWeight: "bold" },
        ],
      });
    });
  }, []);
};

export const useRegisterReactPDFHyphenationCallback = (fontFamily) => {
  useEffect(() => {
    if (ENGLISH_FONT_FAMILIES.includes(fontFamily)) {
      Font.registerHyphenationCallback((word) => [word]);
    } else {
      Font.registerHyphenationCallback((word) =>
        word.split("").map((char) => [char, ""]).flat()
      );
    }
  }, [fontFamily]);
};
