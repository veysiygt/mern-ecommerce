import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
      state.itemCount += action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        state.itemCount -= existingItem.quantity;
        state.items = state.items.filter(item => item._id !== action.payload._id);
      }
      if (state.itemCount < 0) state.itemCount = 0;
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.itemCount += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.itemCount -= 1;
        } else {
          state.itemCount -= existingItem.quantity;
          state.items = state.items.filter(item => item._id !== action.payload._id);
        }
      }
      if (state.itemCount < 0) state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;