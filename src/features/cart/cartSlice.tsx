import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Product, ProductInCart } from "../../types/products";

const initialState: ProductInCart[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(fetchProducts.fulfilled, (state, action) => {
    //   // Is it OK? Or do I have to use something else to put my users? It works, although...
    //   return action.payload;
    // });
  },
});

export default cartSlice.reducer;
