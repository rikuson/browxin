import { createSlice } from '@reduxjs/toolkit';

const todoistSlice = createSlice({
  name: 'todoist',
  initialState: {
    token: '',
    projects: [],
    tasks: [],
    iv: '',
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
      state.projects = action.payload.map((project, i) => ({ ...project, active: i === 0 }));
    },
    openProject: (state, action) => {
      state.projects = state.projects.map(project =>  ({ ...project, active: project.id === action.payload }));
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
