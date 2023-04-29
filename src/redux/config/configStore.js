import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth';
import boardReudcer from '../modules/board';

const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReudcer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
