import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdminAPI } from "./authAPI";

// Thunk for admin login
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials) => {
    const data = await loginAdminAPI(credentials);
    localStorage.setItem("token", data.token);
    return data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
