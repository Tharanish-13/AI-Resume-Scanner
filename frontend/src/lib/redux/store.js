import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./rs"; // Ensure correct path
import settingsReducer from "./ss"; // Ensure correct path

export const store = configureStore({
  reducer: {
    resume: resumeReducer, // Include the resume reducer
    settings: settingsReducer, // Include the settings reducer
  },
});