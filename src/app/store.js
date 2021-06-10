import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../feature/home/homeSlice.js';

export default configureStore({
  reducer: {
      home: homeReducer
  },
});