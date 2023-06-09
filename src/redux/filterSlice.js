import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filtres',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
