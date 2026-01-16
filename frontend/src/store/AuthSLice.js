/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }) => {
    const response = await axios.post("http://localhost:3000/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axios.get("http://localhost:3000/auth/logout");
  return response.data;
});

// Restore persisted auth
const token = localStorage.getItem("authToken");
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    role: user?.role || null,
    isAuth: !!token,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        state.isAuth = true;

        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      // SIGNUP
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        state.isAuth = true;

        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.role = null;
        state.isAuth = false;

        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      });
  },
});

export default authSlice.reducer;
