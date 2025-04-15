/**
 * @typedef {Object} ResumeProfile
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} url
 * @property {string} summary
 * @property {string} location
 */

/**
 * @typedef {Object} ResumeWorkExperience
 * @property {string} company
 * @property {string} jobTitle
 * @property {string} date
 * @property {string[]} descriptions
 */

/**
 * @typedef {Object} ResumeEducation
 * @property {string} school
 * @property {string} degree
 * @property {string} date
 * @property {string} gpa
 * @property {string[]} descriptions
 */

/**
 * @typedef {Object} ResumeProject
 * @property {string} project
 * @property {string} date
 * @property {string[]} descriptions
 */

/**
 * @typedef {Object} FeaturedSkill
 * @property {string} skill
 * @property {number} rating
 */

/**
 * @typedef {Object} ResumeSkills
 * @property {FeaturedSkill[]} featuredSkills
 * @property {string[]} descriptions
 */

/**
 * @typedef {Object} ResumeCustom
 * @property {string[]} descriptions
 */

/**
 * @typedef {Object} Resume
 * @property {ResumeProfile} profile
 * @property {ResumeWorkExperience[]} workExperiences
 * @property {ResumeEducation[]} educations
 * @property {ResumeProject[]} projects
 * @property {ResumeSkills} skills
 * @property {ResumeCustom} custom
 */

/**
 * @type {("profile" | "workExperiences" | "educations" | "projects" | "skills" | "custom")}
 */
export const ResumeKey = null;
