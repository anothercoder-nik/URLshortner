import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isGuest: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isGuest = action.payload.isGuest || false;
    },
    guestLogin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isGuest = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isGuest = false;
    },
  },
});

export const { login, logout, guestLogin } = authSlice.actions;
export default authSlice.reducer;