/**
 * A helper function that handles changes for a form field.
 * 
 * Expected usage:
 * handleChange("school", "Harvard University");
 * handleChange("descriptions", ["Bullet 1", "Bullet 2"]);
 * 
 * @param {string} field - The name of the field (e.g. "school", "date", or "descriptions").
 * @param {string|string[]} value - The value to set, either a string or an array of strings.
 */
export function handleChange(field, value) {
    if (field === "descriptions") {
      // value is an array of bullet points
      console.log("Updating descriptions:", value);
    } else {
      // value is a string (e.g., school, degree, etc.)
      console.log(`Updating ${field}:`, value);
    }
  
    // You can dispatch or update state here based on your usage.
  }
  