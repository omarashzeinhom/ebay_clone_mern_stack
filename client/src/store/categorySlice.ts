import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../models/category";
import { categoriesService } from "../services/categoryService";

interface CategoriesState {
  data: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await categoriesService.getAllCategories();
  return response;
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export default categoriesSlice.reducer;