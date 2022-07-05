import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Cart } from "../../types/products";

const initialState: Cart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemCart: (state, action) => {
      const existingItem = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) existingItem.quantity += 1;
      else state.products.push({ ...action.payload, quantity: 1 });
    },
    removeItemCart: (state, action) => {
      state.products = state.products.filter(
        (ItemCart) => ItemCart.id !== action.payload
      );
      return state;
    },
    addQuantity: (state, action) => {
      const existingItem = state.products.find(
        (item) => item.id === action.payload
      );

      if (existingItem) existingItem.quantity += 1;
    },
    removeQuantity: (state, action) => {
      const existingItem = state.products.find(
        (item) => item.id === action.payload
      );

      if (existingItem && existingItem.quantity > 1) existingItem.quantity -= 1;
      else if (existingItem && existingItem.quantity === 1) {
        state.products = state.products.filter(
          (ItemCart) => ItemCart.id !== action.payload
        );
      }
      return state;
    },
  },
});

export const { addItemCart, removeItemCart, addQuantity, removeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
