import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductsOnPage, ProductState } from "../../types/products";

const initialState: ProductState[] = [];
// const initialState: Array<ProductState> = [
//   {
//     id: 2,
//     title: "Generic Cotton Table",
//     price: 714,
//     description:
//       "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
//     category: {
//       id: 4,
//       name: "Shoes",
//       image: "https://api.lorem.space/image/shoes?w=640&h=480&r=4094",
//     },
//     images: [
//       "https://api.lorem.space/image/shoes?w=640&h=480&r=732",
//       "https://api.lorem.space/image/shoes?w=640&h=480&r=7233",
//       "https://api.lorem.space/image/shoes?w=640&h=480&r=2254",
//     ],
//   },
// ];

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
