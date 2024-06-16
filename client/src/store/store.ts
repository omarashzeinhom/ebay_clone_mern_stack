import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categorySlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
