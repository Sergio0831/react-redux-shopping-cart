import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle",
  error: null
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios("http://localhost:5000/products");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.items = payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = "error";
      });
  }
});

export default productsSlice.reducer;
