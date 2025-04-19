import { createSlice } from "@reduxjs/toolkit";

export const initialResumeState = {
  profile: {
    name: "",
    email: "",
    phone: "",
    url: "",
    summary: "",
    location: "",
  },
  workExperiences: [
    {
      company: "",
      jobTitle: "",
      date: "",
      descriptions: "",
    },
  ],
  educations: [
    {
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
      activities: "",
    },
  ],
  projects: [
    {
      project: "",
      date: "",
      descriptions: [],
    },
  ],
  skills: {
    featuredSkills: [],
    descriptions: [],
  },
  custom: {
    descriptions: [],
  },
};

const resumeSlice = createSlice({
  name: "resume",
  initialState: initialResumeState,
  reducers: {
    // Replace entire state
    setResume: (state, action) => {
      return action.payload;
    },

    // Profile section updates
    changeProfile: (state, action) => {
      const { field, value } = action.payload;
      state.profile[field] = value;
    },

    // Work experiences updates
    addWorkExperience: (state) => {
      state.workExperiences.push({
        company: "",
        jobTitle: "",
        date: "",
        descriptions: "",
      });
    },
    removeWorkExperience: (state, action) => {
      state.workExperiences.splice(action.payload, 1);
    },
    changeWorkExperiences: (state, action) => {
      const { idx, field, value } = action.payload;
      state.workExperiences[idx][field] = value;
    },

    // Education updates
    addEducation: (state) => {
      state.educations.push({
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
        activities: "",
      });
    },
    removeEducation: (state, action) => {
      state.educations.splice(action.payload, 1);
    },
    changeEducations: (state, action) => {
      const { idx, field, value } = action.payload;
      state.educations[idx][field] = value;
    },

    // Projects updates
    addProject: (state) => {
      state.projects.push({
        project: "",
        date: "",
        descriptions: [],
      });
    },
    removeProject: (state, action) => {
      state.projects.splice(action.payload, 1);
    },
    changeProjects: (state, action) => {
      const { idx, field, value } = action.payload;
      state.projects[idx][field] = value;
    },

    // Skills updates
    changeSkills: (state, action) => {
      const { field, value, idx, skill, rating } = action.payload;
      if (field === "featuredSkills") {
        if (idx !== undefined) {
          state.skills.featuredSkills[idx] = { skill, rating };
        } else {
          state.skills.featuredSkills.push({ skill, rating });
        }
      } else {
        state.skills[field] = value;
      }
    },
    removeSkill: (state, action) => {
      const idx = action.payload;
      state.skills.featuredSkills.splice(idx, 1);
    },

    // Custom section updates
    changeCustom: (state, action) => {
      const { field, value } = action.payload;
      state.custom[field] = value;
    },

    // Generic add section
    addSectionInForm: (state, action) => {
      const { form } = action.payload;
      if (Array.isArray(state[form])) {
        state[form].push({});
      }
    },

    // Generic delete by index
    deleteSectionInFormByIdx: (state, action) => {
      const { form, idx } = action.payload;
      if (Array.isArray(state[form])) {
        state[form].splice(idx, 1);
      }
    },

    // Generic move section
    moveSectionInForm: (state, action) => {
      const { form, idx, direction } = action.payload;
      if (
        Array.isArray(state[form]) &&
        idx >= 0 &&
        idx < state[form].length &&
        ((direction === "up" && idx > 0) || (direction === "down" && idx < state[form].length - 1))
      ) {
        const newIndex = direction === "up" ? idx - 1 : idx + 1;
        const temp = state[form][newIndex];
        state[form][newIndex] = state[form][idx];
        state[form][idx] = temp;
      }
    },
  },
});

// Export actions
export const {
  setResume,
  changeProfile,
  addWorkExperience,
  removeWorkExperience,
  changeWorkExperiences,
  addEducation,
  removeEducation,
  changeEducations,
  addProject,
  removeProject,
  changeProjects,
  changeSkills,
  removeSkill,
  changeCustom,
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} = resumeSlice.actions;

// Selectors
export const selectResume = (state) => state.resume;
export const selectProfile = (state) => state.resume.profile;
export const selectWorkExperiences = (state) => state.resume.workExperiences;
export const selectEducations = (state) => state.resume.educations;
export const selectProjects = (state) => state.resume.projects;
export const selectSkills = (state) => state.resume.skills;
export const selectCustom = (state) => state.resume.custom;

// Export reducer
export default resumeSlice.reducer;
