import { configureStore } from "@reduxjs/toolkit";
import OpenModalReducer from "./OpenModal";
import AuthReducer from "./AuthReducer";
import SummaryReducer from "./SummaryReducer";

const store = configureStore({
  reducer: {
    openModal: OpenModalReducer,
    auth: AuthReducer,
    summary: SummaryReducer,
  },
});

export default store;
