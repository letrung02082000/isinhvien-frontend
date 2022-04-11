import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  school: '',
  feedback: '',
};

export const navSlice = createSlice({
  name: 'busSurvey',
  initialState,
  reducers: {
    updateIntime: (state, action) => {
      const datetime = action.payload;
      console.log(datetime);
      state.datetime[datetime.day].inTime = datetime.time;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
    updateOuttime: (state, action) => {
      const datetime = action.payload;
      state.datetime[datetime.day].outTime.push(datetime.time);
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
    updatefeedback: (state, action) => {
      state.feedback = action.payload;
      localStorage.setItem('bus-survey', JSON.stringify(state));
    },
  },
});

export const {
  updateIntime,
  updateOuttime,
  updateReason,
  updateSchool,
  updateAddress,
  updatefeedback,
} = navSlice.actions;
export const selectBusSurvey = (state) => state.busSurvey;
export default navSlice.reducer;
