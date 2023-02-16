import { createSlice } from '@reduxjs/toolkit';

let initFilter = '';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initFilter,
  reducers: {
    inputFilterReducer(_, { payload }) {
      return payload;
    },
    clearFilterReducer() {
      return '';
    },
  },
});

export const { inputFilterReducer, clearFilterReducer } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
