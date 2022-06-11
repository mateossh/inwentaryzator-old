import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface AppState {
//
// }
//
// const initialState: AppState = {
//
// }

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await fetch('http://localhost:8080/api/v1/product');
    const products = await response.json();
    return products;
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    loading: 'idle',
    products: [],
    isError: false,
  },
  reducers: {
    productsLoading(state) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    productsReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.products = action.payload
      }
    },
    productCreated(state, action) {

    },
    productUpdated(state, action) {},
    productDeleted(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = 'pending';
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.products = action.payload;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = 'idle';
      state.isError = true;
    });
  }
});

export const {
  productsLoading,
  productsReceived,
  productCreated,
  productUpdated,
  productDeleted
} = productsSlice.actions;

export default productsSlice.reducer;
