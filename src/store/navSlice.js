import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndex: 0,
  show: true,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    updateNavIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    updateShow: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { updateNavIndex, updateShow } = navSlice.actions;
export const selectNavIndex = (state) => state.nav.currentIndex;
export const selectShow = (state) => state.nav.show;
export default navSlice.reducer;
