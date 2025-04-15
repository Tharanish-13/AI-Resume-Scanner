import { deepClone } from "./deep-clone";

/**
 * @typedef {Object.<string, any>} GenericObject
 */

/**
 * makeObjectCharIterator is a generator that gradually transforms the `start` object into the `end` object,
 * character by character for string fields.
 *
 * @param {GenericObject} start
 * @param {GenericObject} end
 * @param {number} [level=0]
 * @returns {Generator<GenericObject>}
 */
export function* makeObjectCharIterator(start, end, level = 0) {
  const object = level === 0 ? deepClone(start) : start;

  for (const [key, endValue] of Object.entries(end)) {
    if (typeof endValue === "object" && endValue !== null && !Array.isArray(endValue)) {
      if (!object[key]) object[key] = {};
      const recursiveIterator = makeObjectCharIterator(object[key], endValue, level + 1);
      while (true) {
        const next = recursiveIterator.next();
        if (next.done) break;
        yield deepClone(object);
      }
    } else if (Array.isArray(endValue)) {
      object[key] = object[key] || [];
      for (let i = 0; i < endValue.length; i++) {
        if (typeof endValue[i] === "object" && endValue[i] !== null) {
          object[key][i] = object[key][i] || {};
          const subIterator = makeObjectCharIterator(object[key][i], endValue[i], level + 1);
          while (true) {
            const next = subIterator.next();
            if (next.done) break;
            yield deepClone(object);
          }
        }
      }
    } else {
      if (typeof endValue !== "string") continue;
      for (let i = 1; i <= endValue.length; i++) {
        object[key] = endValue.slice(0, i);
        yield deepClone(object);
      }
    }
  }
}

/**
 * Counts the total number of characters in all string fields of an object.
 *
 * @param {GenericObject} object
 * @returns {number}
 */
export const countObjectChar = (object) => {
  let count = 0;
  for (const value of Object.values(object)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      count += countObjectChar(value);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "object" && item !== null) {
          count += countObjectChar(item);
        }
      }
    } else if (typeof value === "string") {
      count += value.length;
    }
  }
  return count;
};
