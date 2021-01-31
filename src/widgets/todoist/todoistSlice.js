import { createSlice } from '@reduxjs/toolkit';

const todoistSlice = createSlice({
  name: 'todoist',
  initialState: {
    token: window.localStorage.todoist_token || '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      window.localStorage.setItem('todoist_token', state.token);
    },
    removeToken: (state, action) => {
      state.token = '';
      window.localStorage.removeItem('todoist_token');
    },
  },
});

export const { setToken, removeToken } = todoistSlice.actions;

export default todoistSlice.reducer;
