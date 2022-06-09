import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const navSlice = createSlice({
  name: 'drivingAdmin',
  initialState,
  reducers: {
    updateDrivingData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateDrivingData } = navSlice.actions;
export const selectDrivingData = (state) => state.drivingAdmin.data;
export default navSlice.reducer;
