import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialProducts, productCategories } from "../data/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return initialProducts;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: initialProducts,
    categories: productCategories,
    status: "idle",
    error: null,
  },
  reducers: {
    addProduct(state, action) {
      state.items.unshift(action.payload);
    },
    updateProduct(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteProduct(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleProductAvailability(state, action) {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) product.available = !product.available;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (state.status === "loading") state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Could not load the menu.";
      });
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProductAvailability,
} = productsSlice.actions;
export default productsSlice.reducer;
