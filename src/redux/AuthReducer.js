import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    AddAuth: (state, action) => {
      state.auth = action.payload || {};
    },
  },
});

export const { AddAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
