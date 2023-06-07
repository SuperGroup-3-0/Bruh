import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk
export const fetchAllItemsAsync = createAsyncThunk(
  "allItems/fetchAllItems",
  async () => {
    try {
      const response = await axios.get("/items");
      return response.data;
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }
);

// Slice
const AllItemsSlice = createSlice({
  name: "allItems",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllItemsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllItemsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AllItemsSlice.reducer;
