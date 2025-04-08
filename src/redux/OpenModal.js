import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  demoMeetingValue: false,
  tryRealsalesValue: false,
  sessionModesValue: false
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
    SessionModesValue: (state, action) => {
      state.sessionModesValue = action.payload || false;
    },
  },
});

export const {
  DemoMeetingValue,
  TryRealsalesValue,
  SessionModesValue
} = OpenModalSlice.actions;

export default OpenModalSlice.reducer;