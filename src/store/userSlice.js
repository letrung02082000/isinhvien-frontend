import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('user-jwt-tk');
const user = JSON.parse(localStorage.getItem('user-info'));

const initialState = {
  isLoggedIn: token ? true : false,
  data: user || { name: '', tel: '', zalo: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.data = action.payload.data;
    },

    logoutUser: (state, action) => {
      state.isLoggedIn = false;
      localStorage.removeItem('user-info');
      localStorage.removeItem('user-jwt-tk');
      localStorage.removeItem('user-jwt-rftk');
      state.data = {};
    },

    updateName: (state, action) => {
      state.data.name = action.payload;
      localStorage.setItem('user-info', JSON.stringify(state.data));
    },

    updateTel: (state, action) => {
      state.data.tel = action.payload;
      localStorage.setItem('user-info', JSON.stringify(state.data));
    },

    updateZalo: (state, action) => {
      state.data.zalo = action.payload;
      localStorage.setItem('user-info', JSON.stringify(state.data));
    },

    updateAddress: (state, action) => {
      state.data.address = action.payload;
      localStorage.setItem('user-info', JSON.stringify(state.data));
    },

    updateCard: (state, action) => {
      state.data.card = action.payload;
      localStorage.setItem('user-info', JSON.stringify(state.data));
    },
  },
});

export const {
  updateUser,
  logoutUser,
  updateName,
  updateTel,
  updateZalo,
  updateAddress,
  updateCard,
} = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
