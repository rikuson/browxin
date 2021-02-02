import { createSlice } from '@reduxjs/toolkit';

const themes = [
  'cerulean',
  'cosmo',
  'cyborg',
  'darkly',
  'flatly',
  'journal',
  'litera',
  'lumen',
  'lux',
  'materia',
  'minty',
  'pulse',
  'sandstone',
  'simplex',
  'sketchy',
  'slate',
  'solar',
  'spacelab',
  'superhero',
  'united',
  'yeti',
];

const slice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'slate',
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

const { actions, reducer } = slice;

export {
  themes,
  actions,
  reducer,
};
