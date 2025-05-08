import { configureStore } from "@reduxjs/toolkit";
import OpenModalReducer from "./OpenModal";
import AuthReducer from "./AuthReducer";

const store = configureStore({
  reducer: {
    openModal: OpenModalReducer,
    auth: AuthReducer
  },
  
});

export default store;                                         
