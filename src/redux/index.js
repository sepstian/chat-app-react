import { configureStore } from "@reduxjs/toolkit";
import activeSlice from "./slice/activeSlice";
import arrayMsgSlice from "./slice/arrayMsgSlice";

export const globalState = configureStore({
    reducer: {
      activeSlice,
      arrayMsgSlice
    },
  });