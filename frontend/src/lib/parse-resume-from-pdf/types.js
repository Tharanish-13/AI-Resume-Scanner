/**
 * @typedef {Object} TextItem
 * @property {string} text
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {string} fontName
 * @property {boolean} hasEOL
 */

/** @typedef {TextItem[]} TextItems */
/** @typedef {TextItem[]} Line */
/** @typedef {Line[]} Lines */

/**
 * @typedef {Object<string, Lines>} ResumeSectionToLines
 */

/** @typedef {Lines[]} Subsections */

/**
 * @typedef {-4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4} FeatureScore
 * @typedef {boolean} ReturnMatchingTextOnly
 */

/**
 * A feature set can be either:
 * - a [function, score]
 * - or a [function that returns RegExpMatchArray, score, returnTextOnly]
 * @typedef {[ (item: TextItem) => boolean, FeatureScore ] |
*           [ (item: TextItem) => RegExpMatchArray | null, FeatureScore, ReturnMatchingTextOnly ]} FeatureSet
*/

/**
* @typedef {Object} TextScore
* @property {string} text
* @property {number} score
* @property {boolean} match
*/

/** @typedef {TextScore[]} TextScores */
