import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const preferDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const initialTheme = preferDarkMode ? "dark" : "light";
  console.log("Initial Theme:", initialTheme);
  return initialTheme;
};

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      console.log("Toggling Theme");
      console.log("initial theme", getInitialTheme);
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
