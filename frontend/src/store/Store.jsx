/** @format */

import { configureStore, createSlice } from "@reduxjs/toolkit";
const objectSlice = createSlice({
  name: "object",
  initialState: [],
  reducers: {
    initial: (state, action) => {
      return action.payload;
    },
    delete: (state, action) => {
      return [];
    },
  },
});
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    initial: (state, action) => {
      return action.payload;
    },
    delete: (state, action) => {
      return null;
    },
  },
});
export const store = configureStore({
  reducer: {
    object: objectSlice.reducer,
    user: userSlice.reducer,
  },
});
export const objectActions = objectSlice.actions;
export const userActions = userSlice.actions;
