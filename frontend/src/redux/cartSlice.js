import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
      state.itemCount += action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity -= action.payload.quantity;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
      }
      state.itemCount -= action.payload.quantity;
      if (state.itemCount < 0) state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
