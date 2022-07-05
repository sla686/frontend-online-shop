import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const deleteProductAPI = createAsyncThunk(
  "deleteProductAPI",
  async (id: number) => {
    try {
      const deletion = await axios.delete(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return deletion.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateProduct: (state, action) => {
      state.filter((product) => {
        if (product.id === action.payload.id) {
          product = {
            ...product,
            ...action.payload.update,
          };
        }
        return product;
      });
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // Is it OK? Or do I have to use something else to put my users? It works, although...
      return action.payload;
    });
    // .addCase(deleteProductAPI.fulfilled, (state, action) => {});
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
