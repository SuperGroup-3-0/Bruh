import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkoutItems: []
  },
  reducers: {
    addItemToCheckout: (state, action) => {
      state.checkoutItems.push(action.payload);
    }
  }
});

export const { addItemToCheckout } = checkoutSlice.actions;

export const selectCheckoutItems = state => state.checkout.checkoutItems;

export default checkoutSlice.reducer;

// add checkout clice reducer to store, 
//