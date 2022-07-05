import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { User, LoginType } from "../../types/user";

const initialState: { currentUser: User | undefined } = {
  currentUser: undefined,
};

export const login = createAsyncThunk(
  "login",
  async ({ email, password }: LoginType) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.access_token) {
        // we need to save our access token in local storage!!
        localStorage.setItem("access_token", response.data.access_token);
        const getUser = await axios.get(
          "https://api.escuelajs.co/api/v1/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          }
        );
        return getUser.data;
      }
      return undefined;
    } catch (err) {
      localStorage.removeItem("access_token");
      console.log(err);
    }
  }
);

export const loginByToken = createAsyncThunk(
  "loginByToken",
  async (token: string) => {
    try {
      // localStorage.setItem("access_token", token);
      const getUser = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return getUser.data;
    } catch (err) {
      localStorage.removeItem("access_token");
      console.log(err);
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    logoutCurUser(state, action) {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(loginByToken.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const { logoutCurUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
