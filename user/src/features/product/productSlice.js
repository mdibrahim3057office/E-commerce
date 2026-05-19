import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsAPI, fetchProductByIdAPI } from "./productAPI";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",

  async (params, thunkAPI) => {
    try {
      return await fetchProductsAPI(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {
          message: "Failed to fetch products",
        },
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",

  async (id, thunkAPI) => {
    try {
      return await fetchProductByIdAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {
          message: "Failed to fetch product",
        },
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
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products || [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      });
  },
});

export default productSlice.reducer;
