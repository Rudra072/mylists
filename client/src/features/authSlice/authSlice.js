import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, filters: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setFilters: (state, action) => {
      const { filters } = action.payload;
      state.filters = filters;
    },
  },
});

export const { setCredentials, logOut, setFilters } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentFilters = (state) => state.auth.filters;
