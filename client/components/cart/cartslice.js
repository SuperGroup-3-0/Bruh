import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [],
    guestCartItems: localStorage.getItem("guestCartItems")
      ? JSON.parse(localStorage.getItem("guestCartItems")).guestCartItems
      : [],
  },
  reducers: {
    addToCart(state, action) {
      const newItem = { ...action.payload, quantity: 1 };
      if (localStorage.getItem("token")) {
        // If token exists, add the item to cartItems only if it doesn't exist
        const existingCartItem = state.cartItems.find(
          (item) => item.id === newItem.id
        );
        if (!existingCartItem) {
          state.cartItems.push(newItem);
          // Update the local storage with the updated cartItems
          localStorage.setItem(
            "cart",
            JSON.stringify({ cartItems: state.cartItems })
          );
        }
      } else {
        // If no token, add the item to guestCartItems only if it doesn't exist
        const existingGuestCartItem = state.guestCartItems.find(
          (item) => item.id === newItem.id
        );
        if (!existingGuestCartItem) {
          state.guestCartItems.push(newItem);
          // Update the local storage with the updated guestCartItems
          localStorage.setItem(
            "guestCartItems",
            JSON.stringify({ guestCartItems: state.guestCartItems })
          );
        }
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      // Update the local storage with the updated cart items
      localStorage.setItem(
        "cart",
        JSON.stringify({ cartItems: state.cartItems })
      );
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      // Update the local storage with the updated cart items
      localStorage.setItem(
        "cart",
        JSON.stringify({ cartItems: state.cartItems })
      );
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
      // Update the local storage with the updated cart items
      localStorage.setItem(
        "cart",
        JSON.stringify({ cartItems: state.cartItems })
      );
    },
    setCart(state, action) {
      state.cartItems = action.payload.cartItems;
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateCartItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
