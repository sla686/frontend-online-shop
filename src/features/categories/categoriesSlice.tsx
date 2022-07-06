import { createSlice } from "@reduxjs/toolkit";

import { Category } from "../../types/products";

const initialState: Category[] = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

// export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
