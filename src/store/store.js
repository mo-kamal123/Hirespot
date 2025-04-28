import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./FavSlice/fav-slice";
import jobsSlice from "./JobsSlice/jobs-slice";
import themeSlice from "./themeSlice/theme-slice";

export const store = configureStore({
  reducer: {
    favourites: favSlice,
    jobs: jobsSlice,
    mode: themeSlice,
  },
});
