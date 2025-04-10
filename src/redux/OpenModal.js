import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  demoMeetingValue: false,
  tryRealsalesValue: false,
  sessionModesValue: false,
  waitAMinuteValue: { open: false, type: "" },
  endChatValue: false,
  uploadYourDocValue: false,
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
    WaitAMinuteValue: (state, action) => {
      state.waitAMinuteValue = action.payload || false;
    },
    EndChatValue: (state, action) => {
      state.endChatValue = action.payload || false;
    },
    UploadYourDocValue: (state, action) => {
      state.uploadYourDocValue = action.payload || false;
    },
  },
});

export const {
  DemoMeetingValue,
  TryRealsalesValue,
  SessionModesValue,
  WaitAMinuteValue,
  EndChatValue,
  UploadYourDocValue
} = OpenModalSlice.actions;

export default OpenModalSlice.reducer;
