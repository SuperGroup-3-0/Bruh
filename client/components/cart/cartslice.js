import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { getState }) => {
    const state = getState();
    const updatedCartItems = [...state.cart.cartItems, item];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    return updatedCartItems;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { getState }) => {
    const state = getState();
    const updatedCartItems = state.cart.cartItems.filter(
      (item) => item.id !== itemId
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    return updatedCartItems;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ itemId, quantity }, { getState }) => {
    const state = getState();
    const updatedCartItems = state.cart.cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    return updatedCartItems;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
  },
});

export default cartSlice.reducer;
