import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { settingsSlice } from "./settings";


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    settings: settingsSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;