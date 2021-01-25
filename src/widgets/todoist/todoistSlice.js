import { createSlice } from '@reduxjs/toolkit';

const todoistSlice = createSlice({
  name: 'todoist',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.token;
    },
  },
});

export const { setToken } = todoistSlice.actions;

export default todoistSlice.reducer;
