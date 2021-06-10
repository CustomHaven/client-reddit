import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../feature/home/homeSlice.js';
import subredditsReducer from '../feature/subreddits/subredditsSlice.js'

export default configureStore({
  reducer: {
      home: homeReducer,
      subreddits: subredditsReducer
  },
});