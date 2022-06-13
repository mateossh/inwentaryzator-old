import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface AppState {
//
// }
//
// const initialState: AppState = {
//
// }

export const fetchStock = createAsyncThunk(
  'stock/fetchAll',
  async () => {
    const response = await fetch('http://localhost:8080/api/v1/stock');
    const stock = await response.json();
    return stock;
  }
)

const stockSlice = createSlice({
  name: 'products',
  initialState: {
    loading: 'idle',
    products: [],
    isError: false,
  },
  reducers: {
    stockLoading(state) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    stockReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.products = action.payload
      }
    },
    productAdded(state, action) {

    },
    productUpdated(state, action) {},
    productDeleted(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStock.pending, (state, action) => {
      state.loading = 'pending';
    });

    builder.addCase(fetchStock.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.products = action.payload;
    });

    builder.addCase(fetchStock.rejected, (state, action) => {
      state.loading = 'idle';
      state.isError = true;
    });
  }
});

export const {
  stockLoading,
  stockReceived,
  productAdded,
  productUpdated,
  productDeleted
} = stockSlice.actions;

export default stockSlice.reducer;
