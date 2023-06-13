import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Thunk
export const checkoutSubmitAsync = createAsyncThunk(
  "checkoutSubmit",
  async (userId, cart) => {
    try {
      const response = await axios.post("/api/checkout", {
        userId,
        cart,
      });
      return response.data;
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }
);


// Slice
const OrderConfirmationSlice = createSlice({
  name: "OrderConfirmation",
  initialState: {
    cart: {}, 
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutSubmitAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutSubmitAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(checkoutSubmitAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default OrderConfirmationSlice.reducer;
