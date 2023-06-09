import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../components/auth/authSlice";
import AllItemsSlice from "../components/home/AllItemsSlice";
import SingleItemSlice from "../components/singleItem/SingleItemSlice";
import CartSlice from "../components/cart/cartslice";
import OrderConfirmationSlice from "../components/cart/orderConfirmationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allItems: AllItemsSlice,
    singleItemState: SingleItemSlice,
    cart: CartSlice,
    orderConfirmationState: OrderConfirmationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../components/auth/authSlice";
export * from "../components/home/AllItemsSlice";
export * from "../components/singleItem/SingleItemSlice";
export * from "../components/cart/cartslice";
export * from "../components/cart/orderConfirmationSlice";
