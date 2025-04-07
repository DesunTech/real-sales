import { configureStore } from "@reduxjs/toolkit";
import OpenModalReducer from "./OpenModal";

const store = configureStore({
  reducer: {
    openModal: OpenModalReducer,  
  },
  
});

export default store;                                         
