import { configureStore } from '@reduxjs/toolkit';
import { save, load } from "redux-localstorage-simple";
import { todoistReducer } from './plugins/todoist';
import { reducer as theme } from './lib/theme';
import commandLineReducer from './commandLineSlice';

export default configureStore({
  reducer: {
    todoist: todoistReducer,
    commandLine: commandLineReducer,
    theme,
  },
  preloadedState: load(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(save()),
});
