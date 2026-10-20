import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: { phone: "" },
  reducers: {
    setCustomerPhone(state, action) {
      state.phone = action.payload;
    },
  },
});

export const { setCustomerPhone } = customerSlice.actions;
export default customerSlice.reducer;
