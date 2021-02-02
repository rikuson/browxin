import { createSlice } from '@reduxjs/toolkit';

const todoistSlice = createSlice({
  name: 'todoist',
  initialState: {
    token: '',
    projects: [],
    tasks: [],
    iv: '',
    activeProject: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIV: (state, action) => {
      state.iv = action.payload;
    },
    removeToken: (state, action) => {
      state.token = '';
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    openProject: (state, action) => {
      state.activeProject = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    completeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const {
  setToken,
  setIV,
  removeToken,
  setProjects,
  openProject,
  setTasks,
  completeTask,
} = todoistSlice.actions;

export default todoistSlice.reducer;
