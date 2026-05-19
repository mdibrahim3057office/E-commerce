import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsAPI,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productAPI";

// Thunks
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    return await fetchProductsAPI();
  },
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    return await addProductAPI(product);
  },
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, product }) => {
    return await updateProductAPI(id, product);
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await deleteProductAPI(id);
    return id;
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
