import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  demoMeetingValue: false,
  tryRealsalesValue: false,
};

const OpenModalSlice = createSlice({
  name: "openModalSlice",
  initialState,
  reducers: {
    DemoMeetingValue: (state, action) => {
      state.demoMeetingValue = action.payload || false;
    },
    TryRealsalesValue: (state, action) => {
      state.tryRealsalesValue = action.payload || false;
    },
  },
});

export const {
  DemoMeetingValue,
  TryRealsalesValue
} = OpenModalSlice.actions;

export default OpenModalSlice.reducer;