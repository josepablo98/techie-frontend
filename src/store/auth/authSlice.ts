import { createSlice } from "@reduxjs/toolkit";
import { status } from "../../helpers";


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: status.CHECKING,
    email: null,
    name: null,
    message: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = status.AUTHENTICATED;
      state.email = payload.email;
      state.name = payload.name;
      state.message = null;
    },
    logout: (state, { payload }) => {
      state.status = status.NOT_AUTHENTICATED;
      state.email = null;
      state.name = null;
      state.message = payload?.message;
    },
    checkingCredentials: (state) => {
      state.status = status.CHECKING;
    }
  }
});

export const { login, logout, checkingCredentials } = authSlice.actions;