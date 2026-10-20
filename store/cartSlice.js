import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      const item = state.items.find((entry) => entry.id === product.id);
      if (item) item.quantity += quantity;
      else state.items.push({ ...product, quantity });
    },
    incrementItem(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementItem(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (!item) return;
      if (item.quantity <= 1) {
        state.items = state.items.filter((entry) => entry.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((entry) => entry.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementItem,
  decrementItem,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
