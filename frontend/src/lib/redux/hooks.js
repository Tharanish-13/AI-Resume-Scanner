import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../lib/redux/store";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../../lib/redux/local-storage";
import { initialResumeState, setResume } from "../../lib/redux/rs";
import { initialSettings, setSettings } from "../../lib/redux/ss";
import { deepMerge } from "../../lib/deep-merge";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

/**
 * Hook to save store to local storage on store change
 */
export const useSaveStateToLocalStorageOnChange = () => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveStateToLocalStorage(store.getState());
    });
    return unsubscribe;
  }, []);
};

export const useSetInitialStore = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const state = loadStateFromLocalStorage();
    if (!state) return;
    if (state.resume) {
      const mergedResumeState = deepMerge(
        initialResumeState,
        state.resume
      );
      dispatch(setResume(mergedResumeState));
    }
    if (state.settings) {
      const mergedSettingsState = deepMerge(
        initialSettings,
        state.settings
      );
      dispatch(setSettings(mergedSettingsState));
    }
  }, [dispatch]);
};
