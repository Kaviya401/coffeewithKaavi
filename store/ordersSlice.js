import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: { items: [], lastOrderId: null },
  reducers: {
    placeOrder(state, action) {
      state.items.unshift(action.payload);
      state.lastOrderId = action.payload.id;
    },
    updateOrderStatus(state, action) {
      const order = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (order) order.status = action.payload.status;
    },
  },
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
