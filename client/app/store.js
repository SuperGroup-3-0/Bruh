import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../components/auth/authSlice";
import AllItemsSlice from "../components/home/AllItemsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allItems: AllItemsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../components/auth/authSlice";
export * from "../components/home/AllItemsSlice";
