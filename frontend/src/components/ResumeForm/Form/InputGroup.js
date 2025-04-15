import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useAutosizeTextareaHeight } from "../../../lib/hooks/useAutosizeTextareaHeight";

export const INPUT_CLASS_NAME = "input-default";

export const InputGroupWrapper = ({ label, className, children }) => (
  <label className={`label-wrapper ${className || ""}`}>
    {label}
    {children}
  </label>
);

export const Input = ({ name, value = "", placeholder, onChange, label, labelClassName }) => {
  return (
    <InputGroupWrapper label={label} className={labelClassName}>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={INPUT_CLASS_NAME}
      />
    </InputGroupWrapper>
  );
};

export const Textarea = ({ label, labelClassName, name, value = "", placeholder, onChange }) => {
  const textareaRef = useAutosizeTextareaHeight({ value });

  return (
    <InputGroupWrapper label={label} className={labelClassName}>
      <textarea
        ref={textareaRef}
        name={name}
        className={`${INPUT_CLASS_NAME} no-resize`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </InputGroupWrapper>
  );
};

export const BulletListTextarea = (props) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (ua.includes("Firefox") || (ua.includes("Safari") && !ua.includes("Chrome"))) {
      setShowFallback(true);
    }
  }, []);

  return showFallback
    ? <BulletListTextareaFallback {...props} />
    : <BulletListTextareaGeneral {...props} />;
};

const BulletListTextareaGeneral = ({
  label,
  labelClassName,
  name,
  value = [],
  placeholder,
  onChange,
  showBulletPoints = true,
}) => {
  const html = getHTMLFromBulletListStrings(value);
  return (
    <InputGroupWrapper label={label} className={labelClassName}>
      <ContentEditable
        contentEditable
        className={`content-editable ${showBulletPoints ? "bullets-on" : "bullets-off"}`}
        placeholder={placeholder}
        onChange={(e) => {
          if (e.type === "input") {
            const newText = e.currentTarget.innerText;
            onChange(name, getBulletListStringsFromInnerText(newText));
          }
        }}
        html={html}
      />
    </InputGroupWrapper>
  );
};

// helpers (unchanged)
const NORMALIZED_LINE_BREAK = "\n";
const normalizeLineBreak = (str) => str.replace(/\r?\n/g, NORMALIZED_LINE_BREAK);
const dedupeLineBreak = (str) => str.replace(/\n\n/g, NORMALIZED_LINE_BREAK);
const getStringsByLineBreak = (str) => str.split(NORMALIZED_LINE_BREAK);

const getBulletListStringsFromInnerText = (innerText) => {
  const text = dedupeLineBreak(normalizeLineBreak(innerText));
  return text === NORMALIZED_LINE_BREAK ? [] : getStringsByLineBreak(text);
};

const getHTMLFromBulletListStrings = (arr) =>
  arr.length === 0 ? "<div></div>" : arr.map((t) => `<div>${t}</div>`).join("");

const BulletListTextareaFallback = ({
  label,
  labelClassName,
  name,
  value = [],
  placeholder,
  onChange,
  showBulletPoints = true,
}) => {
  const textareaValue = getTextareaValueFromBulletListStrings(value, showBulletPoints);

  return (
    <Textarea
      label={label}
      labelClassName={labelClassName}
      name={name}
      value={textareaValue}
      placeholder={placeholder}
      onChange={(n, val) => {
        onChange(n, getBulletListStringsFromTextareaValue(val, showBulletPoints));
      }}
    />
  );
};

const getTextareaValueFromBulletListStrings = (arr, showBullets) => {
  const prefix = showBullets ? "• " : "";
  return arr.length === 0
    ? prefix
    : arr.map((line, i) => `${prefix}${line}${i !== arr.length - 1 ? "\r\n" : ""}`).join("");
};

const getBulletListStringsFromTextareaValue = (val, showBullets) => {
  const lines = getStringsByLineBreak(normalizeLineBreak(val));
  if (!showBullets) return lines;

  const clean = lines.filter((s) => s !== "•");
  let newLines = [];

  for (let line of clean) {
    if (line.startsWith("• ")) newLines.push(line.slice(2));
    else if (line.startsWith("•")) {
      const last = newLines.length - 1;
      if (last >= 0) newLines[last] += line.slice(1);
      else newLines.push(line.slice(1));
    } else {
      newLines.push(line);
    }
  }

  return newLines;
};
