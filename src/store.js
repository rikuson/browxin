import { configureStore } from '@reduxjs/toolkit';
import todoistReducer from './widgets/todoist/todoistSlice';
import commandLineReducer from './commandLineSlice';

export default configureStore({
  reducer: {
    todoist: todoistReducer,
    commandLine: commandLineReducer,
  },
});
