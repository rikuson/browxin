import { configureStore } from '@reduxjs/toolkit';
import { todoistReducer } from './plugins/todoist';
import commandLineReducer from './commandLineSlice';

export default configureStore({
  reducer: {
    todoist: todoistReducer,
    commandLine: commandLineReducer,
  },
});
