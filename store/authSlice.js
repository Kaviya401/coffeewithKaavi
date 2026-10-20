import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, email: "" },
  reducers: {
    adminLogin(state, action) {
      state.isAuthenticated = true;
      state.email = action.payload;
    },
    adminLogout(state) {
      state.isAuthenticated = false;
      state.email = "";
    },
  },
});

export const { adminLogin, adminLogout } = authSlice.actions;
export default authSlice.reducer;
