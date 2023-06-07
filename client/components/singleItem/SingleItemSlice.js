import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Thunk
export const fetchSingleItemAsync = createAsyncThunk(
  "singleItem/fetchSingleItem",
  async (id) => {
    try {
      const response = await axios.get(`/api/items/${id}`);
      return response.data;
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }
);

// Slice
const SingleItemSlice = createSlice({
  name: "singleItem",
  initialState: {
    singleItem: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleItemAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleItem = action.payload;
      })
      .addCase(fetchSingleItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default SingleItemSlice.reducer;
