import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../feature/home/homeSlice.js'
// import topicsReducer from '../features/topics/topicsSlice';
// import quizzesReducer from '../features/quizzes/quizzesSlice';
// import cardsReducer from '../features/cards/cardsSlice';

export default configureStore({
  reducer: {
      home: homeReducer
  },
});