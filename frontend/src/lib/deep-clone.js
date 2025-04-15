/**
 * Deep clone utility using JSON serialization.
 * Avoids cloning functions, undefined, and other non-serializable values.
 * For client-side, prefer `structuredClone()` if available.
 */
export const deepClone = (object) => {
  if (object === undefined) return undefined;

  try {
    return JSON.parse(JSON.stringify(object));
  } catch (error) {
    console.error("deepClone error: invalid object for JSON cloning", error);
    return null;
  }
};
