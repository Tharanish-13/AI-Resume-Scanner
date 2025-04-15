import { createSlice } from "@reduxjs/toolkit";

export const initialSettings = {
  theme: "light",
  language: "en",
  font: "sans",
  formsOrder: ["workExperiences", "educations", "projects", "skills", "custom"], // Add formsOrder here
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettings,
  reducers: {
    setSettings: (state, action) => {
      return action.payload;
    },
    setFormsOrder: (state, action) => {
      state.formsOrder = action.payload; // Add a reducer to update formsOrder
    },
  },
});

export const { setSettings, setFormsOrder } = settingsSlice.actions;

// Selector to get formsOrder
export const selectFormsOrder = (state) => state.settings.formsOrder;

export default settingsSlice.reducer;