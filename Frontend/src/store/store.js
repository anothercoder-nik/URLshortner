import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authslice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;