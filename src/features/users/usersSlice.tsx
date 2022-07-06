import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "../../types/user";

// const initialState: Array<UserState> = [
//   { id: 0, username: "tije", password: "123", isAdmin: true },
//   { id: 1, username: "kegra", password: "123", isAdmin: false },
//   { id: 2, username: "mapri", password: "123", isAdmin: false },
// ];

const initialState: { userList: User[] } = {
  userList: [],
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

export const updateUserAPI = createAsyncThunk(
  "updateUserAPI",
  async ({ id, name, role, email, password, avatar }: User) => {
    try {
      const update = await axios.put(
        `https://api.escuelajs.co/api/v1/users/${id}`,
        {
          name: name,
          role: role,
          email: email,
          password: password,
          avatar: avatar,
        }
      );
      return update.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUsers(state, action) {
      state.userList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userList.push(action.payload);
      })
      .addCase(updateUserAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userList.push({ ...state.userList, ...action.payload });
      });
  },
});

export const { logoutUsers } = usersSlice.actions;

export default usersSlice.reducer;
