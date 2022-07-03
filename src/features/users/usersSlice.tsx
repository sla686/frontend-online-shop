import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { UserReducerState, User, LoginType } from "../../types/user";

// interface UserState {
//   id: number;
//   username: string;
//   password: string;
//   isAdmin: boolean;
// }

// const initialState: Array<UserState> = [
//   { id: 0, username: "tije", password: "123", isAdmin: true },
//   { id: 1, username: "kegra", password: "123", isAdmin: false },
//   { id: 2, username: "mapri", password: "123", isAdmin: false },
// ];

const initialState: UserReducerState = {
  userList: [],
  currentUser: undefined,
};

export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async (user: User) => {
    try {
      if (user.role === "admin") {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/users"
        );
        return response.data;
      } else {
        return [];
      }
    } catch (err: any) {
      console.log(err);
    }
  }
);

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

export const createUser = createAsyncThunk(
  "createUser",
  async ({ id, name, role, email, password, avatar }: User) => {
    try {
      const createUser = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        {
          id: id,
          name: name,
          role: role,
          email: email,
          password: password,
          avatar: avatar,
        }
      );
      return createUser.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state, action) {
      state.currentUser = undefined;
      state.userList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(loginByToken.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userList.push(action.payload);
      });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
