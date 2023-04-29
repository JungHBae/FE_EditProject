import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth";

const store = configureStore({
  reducer: {
    authReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export default store;
