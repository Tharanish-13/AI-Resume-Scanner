import { useEffect, useRef } from "react";

/**
 * Hook to autosize a textarea's height based on its content.
 *
 * Example usage:
 * const textareaRef = useAutosizeTextareaHeight({ value });
 * <textarea ref={textareaRef} className="your-textarea-class" />
 */
export const useAutosizeTextareaHeight = ({ value }) => {
  const textareaRef = useRef(null);

  const resizeHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "0px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeHeight();
  }, [value]);

  useEffect(() => {
    window.addEventListener("resize", resizeHeight);
    return () => window.removeEventListener("resize", resizeHeight);
  }, []);

  return textareaRef;
};
