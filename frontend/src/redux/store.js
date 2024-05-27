import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
    auth: authReducer,
  },
});

export default store;
