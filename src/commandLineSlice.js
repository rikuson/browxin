import { createSlice } from '@reduxjs/toolkit';

const commandLineSlice = createSlice({
  name: 'commandLine',
  initialState: {
    text: '',
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setText } = commandLineSlice.actions;

export default commandLineSlice.reducer;
