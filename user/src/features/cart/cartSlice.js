// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartAPI, addToCartAPI, updateCartAPI, removeCartAPI } from "./cartAPI";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await getCartAPI();
  return res.data;
});

export const addToCart = createAsyncThunk("cart/add", async (data) => {
  const res = await addToCartAPI(data);
  return res.data;
});

export const updateCartItem = createAsyncThunk("cart/update", async (data) => {
  const res = await updateCartAPI(data);
  return res.data;
});

export const removeCartItem = createAsyncThunk("cart/remove", async (data) => {
  const res = await removeCartAPI(data);
  return res.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      });
  },
});

export default cartSlice.reducer;
