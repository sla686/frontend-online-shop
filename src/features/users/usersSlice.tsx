import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  username: string;
  password: string;
}

const initialState: Array<UserState> = [
  { id: 0, username: "tije", password: "123" },
  { id: 1, username: "kegra", password: "123" },
  { id: 2, username: "mapri", password: "123" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
