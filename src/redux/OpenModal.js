import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  demoMeetingValue: false,
  tryRealsalesValue: false,
  personaTypeValue: false,
  interactionValue: { open: false, fromData: "" },
  idealPersonaValue: {open: false, type: ""},
  shortlistedPersonaValue: false,
  sessionModesValue: false,
  waitAMinuteValue: { open: false, type: "" },
  endChatValue: false,
  uploadYourDocValue: false,
  paymentConfirm: false
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
    PersonaTypeValue: (state, action) => {
      state.personaTypeValue = action.payload || false;
    },
    InteractionValue: (state, action) => {
      state.interactionValue = action.payload || false;
    },
    IdealPersonaValue: (state, action) => {
      state.idealPersonaValue = action.payload || false;
    },
    ShortlistedPersonaValue: (state, action) => {
      state.shortlistedPersonaValue = action.payload || false;
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
    PaymentConfirm: (state, action) => {
      state.paymentConfirm = action.payload || false;
    },
    
  },
});

export const {
  DemoMeetingValue,
  TryRealsalesValue,
  PersonaTypeValue,
  InteractionValue,
  IdealPersonaValue,
  ShortlistedPersonaValue,
  SessionModesValue,
  WaitAMinuteValue,
  EndChatValue,
  UploadYourDocValue,
  PaymentConfirm
} = OpenModalSlice.actions;

export default OpenModalSlice.reducer;
