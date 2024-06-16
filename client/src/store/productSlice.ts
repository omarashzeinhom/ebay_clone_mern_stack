import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models';
import { productService } from '../services';

interface ProductState {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  searchResults: Product[]; // Ensure this is always an array of Product
  productDetail: Product | null; // Product detail can be null if not fetched
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedCategory: '',
  searchQuery: '',
  searchResults: [], // Initialized as an empty array
  productDetail: null, // Initialized as null
  status: 'idle',
  error: null,
};

// Async thunk to fetch products based on category or all products
export const fetchProducts = createAsyncThunk<Product[], string | undefined>(
  'products/fetchProducts',
  async (categoryName) => {
    if (categoryName) {
      return await productService.getProductsByCategory(categoryName);
    } else {
      return await productService.getAllProducts();
    }
  }
);

// Async thunk to fetch product by ID
export const fetchProductById = createAsyncThunk<Product | null, string>(
  'products/fetchProductById',
  async (productId) => {
    return await productService.getProductById(productId) || null;
  }
);

// Async thunk to fetch products by name
export const fetchProductsByName = createAsyncThunk<Product[], string>(
    'products/fetchProductsByName',
    async (productName) => {
      try {
        const products = await productService.getProductsByName(productName);
        return products || []; // Return products or an empty array if undefined
      } catch (error) {
        console.error('Error fetching products by name:', error);
        throw error; // Optionally handle or throw errors as needed
      }
    }
  );

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Product[]>) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Handle fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product | null>) => {
        state.status = 'succeeded';
        state.productDetail = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product detail';
      })
      // Handle fetch products by name
      .addCase(fetchProductsByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByName.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchProductsByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products by name';
      });
  },
});

export const { setCategory, setSearchQuery, setSearchResults } = productSlice.actions;

export default productSlice.reducer;