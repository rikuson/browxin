import { configureStore } from '@reduxjs/toolkit';
import todoistReducer from './widgets/todoist/todoistSlice';

export default configureStore({
  reducer: {
    todoist: todoistReducer,
  },
});
