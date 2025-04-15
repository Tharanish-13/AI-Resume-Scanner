const LOCAL_STORAGE_KEY = "state";

export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (e) {
    console.warn("Failed to save state to localStorage:", e);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load state from localStorage:", e);
    return undefined;
  }
};
    
export const getHasUsedAppBefore = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(LOCAL_STORAGE_KEY);
};