import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: {},
};

const SummarySlice = createSlice({
  name: "summarySlice",
  initialState,
  reducers: {
    AddSummary: (state, action) => {
      state.summary = action.payload || "";
    },
  },
});

export const { AddSummary } = SummarySlice.actions;

export default SummarySlice.reducer;
