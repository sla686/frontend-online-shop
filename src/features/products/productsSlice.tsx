import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductsOnPage, Product } from "../../types/products";

const initialState: Product[] = [];

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async ({ offset, limit }: ProductsOnPage) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();
      return data;
    } catch (err: any) {
      console.log(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // Is it OK? Or do I have to use something else to put my users? It works, although...
      return action.payload;
    });
  },
});

export default productsSlice.reducer;
