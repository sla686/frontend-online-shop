import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import usersReducer from "../features/users/usersSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
