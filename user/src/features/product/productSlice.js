import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsAPI, fetchProductByIdAPI } from "./productAPI";

// Thunks
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await fetchProductsAPI(); // returns { products, total, page, pages }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch products" },
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, thunkAPI) => {
    try {
      return await fetchProductByIdAPI(id); // returns single product object
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch product" },
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    status: "idle",
    error: null,
    total: 0,
    page: 1,
    pages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products; // 👈 only array
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      // Fetch single
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload; // single product object
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default productSlice.reducer;
