import { configureStore } from "@reduxjs/toolkit";
import trainReducer from "./trainSlice";

export const store = configureStore({
  reducer: {
    trains: trainReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;