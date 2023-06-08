import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateCartItemQuantity(state, action) {
      const { itemId, newQuantity } = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
