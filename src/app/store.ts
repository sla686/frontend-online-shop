import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import usersReducer from "../features/users/usersSlice";
import currentUserReducer from "../features/users/currentUserSlice";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/categories/categoriesSlice";

import { User } from "../types/user";
import { Cart } from "../types/products";

let preUser: { currentUser: User | undefined } = {
  currentUser: undefined,
};
let preCart: Cart = {
  products: [],
  total: 0,
};
const getUser = localStorage.getItem("current_user");
const getCart = localStorage.getItem("cart");
if (!!getUser) {
  preUser = JSON.parse(getUser);
}
if (!!getCart) {
  preCart = JSON.parse(getCart);
}
const preloadedState = {
  currentUser: preUser,
  cart: preCart,
};

const saveState = (state: RootState) => {
  try {
    const currentUserReducer = JSON.stringify(state.currentUser);
    const cartReducer = JSON.stringify(state.cart);
    localStorage.setItem("current_user", currentUserReducer);
    localStorage.setItem("cart", cartReducer);
  } catch (e) {
    console.log(e);
  }
};

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    users: usersReducer,
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
  },
  preloadedState: preloadedState,
});

store.subscribe(() => saveState(store.getState()));
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
