"use client";

/**
 * Suppress ResumePDF development errors.
 * See ResumePDF doc string for context.
 */
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  const consoleError = console.error;
  const SUPPRESSED_WARNINGS = ["DOCUMENT", "PAGE", "TEXT", "VIEW"];

  console.error = function filterWarnings(msg, ...args) {
    const firstArg = args[0];
    const isSuppressible =
      typeof firstArg === "string" &&
      SUPPRESSED_WARNINGS.some((entry) => firstArg.includes(entry));

    if (!isSuppressible) {
      consoleError(msg, ...args);
    }
  };
}

export const SuppressResumePDFErrorMessage = () => {
  return null;
};
