import { createSlice } from "@reduxjs/toolkit";
import { SettingsFormStore } from "../../interfaces";

const initialState: SettingsFormStore = {
  theme: "light",
  language: "es",
  detailLevel: "simplified",
  tempChats: false,
  globalContext: null
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, { payload }) => {
      // Actualiza solo los campos que vienen en el payload
      if (payload?.theme !== undefined) state.theme = payload.theme;
      if (payload?.language !== undefined) state.language = payload.language;
      if (payload?.detailLevel !== undefined) state.detailLevel = payload.detailLevel;
      if (payload?.tempChats !== undefined) state.tempChats = payload.tempChats;
      if (payload?.globalContext !== undefined) state.globalContext = payload.globalContext;
    },
    clearSettings: (state) => {
      state.theme = "light";
      state.detailLevel = "simplified";
      state.tempChats = false;
      state.globalContext = null;
    }
  }
});

export const { setSettings, clearSettings } = settingsSlice.actions;
