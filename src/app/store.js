import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../feature/home/homeSlice.js';
import listOfAllReducer from '../feature/listOfAll/listOfAllSlice.js';
import subredditsReducer from '../feature/subreddits/subredditsSlice.js';
import popularReducer from '../feature/popular/popularSlice.js';

export default configureStore({
  reducer: {
      home: homeReducer,
      listOfAll: listOfAllReducer,
      subreddits: subredditsReducer,
      popular: popularReducer
  },
});