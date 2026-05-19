import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserAPI, loginUserAPI } from "./authAPI";

// Register thunk
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (data, thunkAPI) => {
    try {
      const res = await registerUserAPI(data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Registration failed" },
      );
    }
  },
);

// Login thunk
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (data, thunkAPI) => {
    try {
      const res = await loginUserAPI(data);
      localStorage.setItem("token", res.token);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Login failed" },
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      // Login
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
