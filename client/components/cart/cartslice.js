// cartslice.js

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      state.cartItems.push({ ...action.payload, quantity: 1 }); // Set initial quantity to 1
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    updateCartItemQuantity(state, action) {
      const { itemId, newQuantity } = action.payload;
      const parsedQuantity = isNaN(newQuantity) ? 0 : parseInt(newQuantity, 10);
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: parsedQuantity };
        }
        return item;
      });
      state.cartItems = updatedCartItems;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
