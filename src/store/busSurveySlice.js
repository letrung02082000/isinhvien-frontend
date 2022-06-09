import { createSlice } from '@reduxjs/toolkit';

const state = JSON.parse(localStorage.getItem('bus-survey'));

const initialState = state || {
  reason: 0,
  datetime: [
    { inTime: [], outTime: [] },
    { inTime: [], outTime: [] },
    { inTime: [], outTime: [] },
    { inTime: [], outTime: [] },
    { inTime: [], outTime: [] },
    { inTime: [], outTime: [] },
    { inTime: [], outTime: [] },
  ],
  address: '',
  town: '',
  district: '',
  province: '',
  school: '',
  feedback: '',
  isUsed: false,
};

export const navSlice = createSlice({
  name: 'busSurvey',
  initialState,
  reducers: {
    updateIntime: (state, action) => {
      const datetime = action.payload;
      state.datetime[datetime.day].inTime = datetime.time;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
    updateOuttime: (state, action) => {
      const datetime = action.payload;
      state.datetime[datetime.day].outTime = datetime.time;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
    updateReason: (state, action) => {
      state.reason = action.payload;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
    updateSchool: (state, action) => {
      state.school = action.payload;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
    updateFeedback: (state, action) => {
      state.feedback = action.payload;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
    updateIsUsed: (state, action) => {
      state.isUsed = action.payload;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
    updateTown: (state, action) => {
      state.town = action.payload;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },

    updateDistrict: (state, action) => {
      state.district = action.payload;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },

    updateProvince: (state, action) => {
      state.province = action.payload;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
  },
});

export const {
  updateIntime,
  updateOuttime,
  updateReason,
  updateSchool,
  updatefeedback,
  updateIsUsed,
  updateAddress,
  updateTown,
  updateDistrict,
  updateProvince,
} = navSlice.actions;
export const selectBusSurvey = (state) => state.busSurvey;
export default navSlice.reducer;
