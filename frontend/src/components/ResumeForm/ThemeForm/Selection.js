import { PX_PER_PT } from "../../../lib/constants";
import {
  FONT_FAMILY_TO_STANDARD_SIZE_IN_PT,
  FONT_FAMILY_TO_DISPLAY_NAME,
} from "../../../components/fonts/constants";
import { getAllFontFamiliesToLoad } from "../../../components/fonts/lib";
import dynamic from "next/dynamic";

// Selection box component
const Selection = ({
  selectedColor,
  isSelected,
  style = {},
  onClick,
  children,
}) => {
  const selectedStyle = {
    color: "white",
    backgroundColor: selectedColor,
    borderColor: selectedColor,
    ...style,
  };

  return (
    <div
      className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
      onClick={onClick}
      style={isSelected ? selectedStyle : style}
      onKeyDown={(e) => {
        if (["Enter", " "].includes(e.key)) onClick();
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

// Wrapper for selection boxes
const SelectionsWrapper = ({ children }) => {
  return <div className="mt-2 flex flex-wrap gap-3">{children}</div>;
};

// Font family picker
const FontFamilySelections = ({ selectedFontFamily, themeColor, handleSettingsChange }) => {
  const allFontFamilies = getAllFontFamiliesToLoad();

  return (
    <SelectionsWrapper>
      {allFontFamilies.map((fontFamily, idx) => {
        const isSelected = selectedFontFamily === fontFamily;
        const standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];

        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{
              fontFamily,
              fontSize: `${standardSizePt * PX_PER_PT}px`,
            }}
            onClick={() => handleSettingsChange("fontFamily", fontFamily)}
          >
            {FONT_FAMILY_TO_DISPLAY_NAME[fontFamily]}
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};

// Export CSR-only component since it uses navigator
export const FontFamilySelectionsCSR = dynamic(
  () => Promise.resolve(FontFamilySelections),
  { ssr: false }
);

// Font size picker
export const FontSizeSelections = ({
  selectedFontSize,
  fontFamily,
  themeColor,
  handleSettingsChange,
}) => {
  const standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
  const compactSizePt = standardSizePt - 1;

  return (
    <SelectionsWrapper>
      {["Compact", "Standard", "Large"].map((type, idx) => {
        const fontSizePt = String(compactSizePt + idx);
        const isSelected = fontSizePt === selectedFontSize;

        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{
              fontFamily,
              fontSize: `${Number(fontSizePt) * PX_PER_PT}px`,
            }}
            onClick={() => handleSettingsChange("fontSize", fontSizePt)}
          >
            {type}
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};

// Document size picker
export const DocumentSizeSelections = ({
  selectedDocumentSize,
  themeColor,
  handleSettingsChange,
}) => {
  return (
    <SelectionsWrapper>
      {["Letter", "A4"].map((type, idx) => (
        <Selection
          key={idx}
          selectedColor={themeColor}
          isSelected={type === selectedDocumentSize}
          onClick={() => handleSettingsChange("documentSize", type)}
        >
          <div className="flex flex-col items-center">
            <div>{type}</div>
            <div className="text-xs">
              {type === "Letter" ? "(US, Canada)" : "(other countries)"}
            </div>
          </div>
        </Selection>
      ))}
    </SelectionsWrapper>
  );
};
