// // src/features/cart/cartSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getCartAPI, addToCartAPI, updateCartAPI, removeCartAPI } from "./cartAPI";

// export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
//   const res = await getCartAPI();
//   return res.data;
// });

// export const addToCart = createAsyncThunk("cart/add", async (data) => {
//   const res = await addToCartAPI(data);
//   return res.data;
// });

// export const updateCartItem = createAsyncThunk("cart/update", async (data) => {
//   const res = await updateCartAPI(data);
//   return res.data;
// });

// export const removeCartItem = createAsyncThunk("cart/remove", async (data) => {
//   const res = await removeCartAPI(data);
//   return res.data;
// });

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: { items: [], status: "idle" },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.items = action.payload.items || [];
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//       })
//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//       })
//       .addCase(removeCartItem.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//       });
//   },
// });

// export default cartSlice.reducer;

// src/features/cart/cartSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCartAPI,
  addToCartAPI,
  updateCartAPI,
  removeCartAPI,
} from "./cartAPI";

/* =========================
   FETCH CART
========================= */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await getCartAPI();

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {
          message: "Failed to fetch cart",
        },
      );
    }
  },
);

/* =========================
   ADD TO CART
========================= */
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {
    try {
      const res = await addToCartAPI(data);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {
          message: "Failed to add item",
        },
      );
    }
  },
);

/* =========================
   UPDATE CART ITEM
========================= */
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (data, thunkAPI) => {
    try {
      const res = await updateCartAPI(data);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {
          message: "Failed to update cart",
        },
      );
    }
  },
);

/* =========================
   REMOVE CART ITEM
========================= */
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (data, thunkAPI) => {
    try {
      const res = await removeCartAPI(data);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {
          message: "Failed to remove item",
        },
      );
    }
  },
);

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

/* =========================
   SLICE
========================= */
const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* =========================
         FETCH CART
      ========================= */
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.items = action.payload?.items || [];
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload?.message || "Failed to fetch cart";

        state.items = [];
      })

      /* =========================
         ADD TO CART
      ========================= */
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.items = action.payload?.items || [];
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload?.message || "Failed to add item";
      })

      /* =========================
         UPDATE CART
      ========================= */
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.items = action.payload?.items || [];
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload?.message || "Failed to update cart";
      })

      /* =========================
         REMOVE ITEM
      ========================= */
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.items = action.payload?.items || [];
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload?.message || "Failed to remove item";
      });
  },
});

export default cartSlice.reducer;
