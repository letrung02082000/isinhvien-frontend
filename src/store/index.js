import { configureStore } from '@reduxjs/toolkit';
import navReducer from './navSlice';
import userReducer from './userSlice';
import busSurveyReducer from './busSurveySlice';
import drivingAdminReducer from './drivingAdminSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    user: userReducer,
    busSurvey: busSurveyReducer,
    drivingAdmin: drivingAdminReducer,
  },
});
