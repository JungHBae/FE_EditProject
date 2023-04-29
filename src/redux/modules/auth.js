import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorizedUser: false,
  userName: "",
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    authUser: (state, action) => {
      if (action.payload[0] === "true") {
        return {
          authorizedUser: true,
          userName: action.payload[1],
        };
      } else if (action.payload[0] === "false") {
        return {
          authorizedUser: false,
        };
      }
    },
  },
});

export const { authUser } = authSlice.actions;
export default authSlice.reducer;
