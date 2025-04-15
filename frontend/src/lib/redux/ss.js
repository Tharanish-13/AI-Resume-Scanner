import { createSlice } from "@reduxjs/toolkit";

export const initialSettings = {
  showForms: {
    workExperiences: true,
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
  headings: {
    workExperiences: "Work Experiences",
    educations: "Educations",
    projects: "Projects",
    skills: "Skills",
    custom: "Custom",
  },
  formOrder: ["workExperiences", "educations", "projects", "skills", "custom"],
  showBulletPoints: {
    workExperiences: true,
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
  themeColor: "#38bdf8",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettings,
  reducers: {
    // Add setSettings reducer for full state updates
    setSettings: (state, action) => {
      return action.payload;
    },
    changeShowForm: (state, action) => {
      const { field, value } = action.payload;
      state.showForms[field] = value;
    },
    changeFormHeading: (state, action) => {
      const { field, value } = action.payload;
      state.headings[field] = value;
    },
    changeFormOrder: (state, action) => {
      const { form, type } = action.payload;
      const index = state.formOrder.indexOf(form);
      if (type === "up" && index > 0) {
        [state.formOrder[index - 1], state.formOrder[index]] = [
          state.formOrder[index],
          state.formOrder[index - 1],
        ];
      } else if (type === "down" && index < state.formOrder.length - 1) {
        [state.formOrder[index + 1], state.formOrder[index]] = [
          state.formOrder[index],
          state.formOrder[index + 1],
        ];
      }
    },
    changeShowBulletPoints: (state, action) => {
      const { field, value } = action.payload;
      state.showBulletPoints[field] = value;
    },
    changeThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
  },
});

// Export all actions including setSettings
export const {
  setSettings,
  changeShowForm,
  changeFormHeading,
  changeFormOrder,
  changeShowBulletPoints,
  changeThemeColor,
} = settingsSlice.actions;

export default settingsSlice.reducer;

// Selectors
export const selectFormsOrder = (state) => state.settings.formOrder;
export const selectShowByForm = (form) => (state) => state.settings.showForms[form];
export const selectHeadingByForm = (form) => (state) => state.settings.headings[form];
export const selectShowBulletPoints = (form) => (state) => state.settings.showBulletPoints[form];
export const selectThemeColor = (state) => state.settings.themeColor;
export const selectIsFirstForm = (form) => (state) => state.settings.formOrder[0] === form;
export const selectIsLastForm = (form) => (state) => state.settings.formOrder[state.settings.formOrder.length - 1] === form;
export const selectSettings = (state) => state.settings;