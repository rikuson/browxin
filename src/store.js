import { configureStore } from '@reduxjs/toolkit';
import { save, load } from "redux-localstorage-simple";
import { todoistReducer } from './plugins/todoist';
import commandLineReducer from './commandLineSlice';

export default configureStore({
  reducer: {
    todoist: todoistReducer,
    commandLine: commandLineReducer,
  },
  preloadedState: load(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(save()),
});
