import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createToast } from '../toasts/toastSlice';

interface StockState {
  loading: 'idle' | 'pending'
  isError: boolean
  products: Stock[]
}

export interface Stock {
  code: string
  amount: number
}

const initialState: StockState = {
  loading: 'idle',
  products: [],
  isError: false,
}

const fetchConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
}

export interface StockProduct {
  code: string
  amount: number
  totalValue?: number
}

export const fetchStock = createAsyncThunk(
  'stock/fetchAll',
  async () => {
    const response = await fetch('http://localhost:8080/api/v1/stock');
    const stock = await response.json();
    return stock;
  }
)

export const addProductToStock = createAsyncThunk(
  'stock/addProduct',
  async (product: StockProduct, thunkAPI) => {
    const config = {
      body: JSON.stringify(product),
      method: 'POST',
      ...fetchConfig,
    }

    const response = await fetch('http://localhost:8080/api/v1/stock', config);
    if (response.status !== 201) {
      const error = await response.json();
      const toast = {
        title: 'Błąd',
        message: `Wystąpił błąd: ${error?.errors[0].message}`,
      };

      thunkAPI.dispatch(createToast(toast));
      return thunkAPI.rejectWithValue(error);
    }

    return await response.json();
  }
)

export const editProductInStock = createAsyncThunk(
  'stock/editProduct',
  async (product: StockProduct, thunkAPI) => {
    const config = {
      body: JSON.stringify(product),
      method: 'PUT',
      ...fetchConfig,
    }

    const response = await fetch(`http://localhost:8080/api/v1/stock/${product.code}`, config);
    if (response.status !== 200) {
      const error = await response.json();
      const toast = {
        title: 'Błąd',
        message: `Wystąpił błąd: ${error.errors[0].message}`,
      };

      thunkAPI.dispatch(createToast(toast));
      return thunkAPI.rejectWithValue(error);
    }
    return await response.json();
  }
)

export const deleteProductInStock = createAsyncThunk(
  'stock/deleteProduct',
  async (code: Number, thunkAPI) => {
    const config = {
      method: 'DELETE',
      ...fetchConfig,
    }

    const response = await fetch(`http://localhost:8080/api/v1/stock/${code}`, config);
    if (response.status !== 200) {
      const error = await response.json();
      const toast = {
        title: 'Błąd',
        message: `Wystąpił błąd: ${error.errors[0].message}`,
      };

      thunkAPI.dispatch(createToast(toast));
      return thunkAPI.rejectWithValue(error);
    }

    return await response.json();
  }
)

const stockSlice = createSlice({
  name: 'products',
  initialState,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStock.pending, (state) => {
      state.loading = 'pending';
    });

    builder.addCase(fetchStock.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.products = action.payload;
    });

    builder.addCase(fetchStock.rejected, (state) => {
      state.loading = 'idle';
      state.isError = true;
    });

    builder.addCase(addProductToStock.pending, (state) => {
      state.loading = 'pending';
      state.isError = false;
    });

    builder.addCase(addProductToStock.fulfilled, (state, action: PayloadAction<Stock>) => {
      state.loading = 'idle';
      state.products.push(action.payload);
    });

    builder.addCase(addProductToStock.rejected, (state) => {
      state.loading = 'idle';
      state.isError = true;
    });

    builder.addCase(editProductInStock.pending, (state) => {
      state.loading = 'pending';
      state.isError = false;
    });

    builder.addCase(editProductInStock.fulfilled, (state, action) => {
      state.loading = 'idle';

      console.log(action.payload);

      // @ts-ignore
      const productIndex = state.products.findIndex(product => product.code === action.payload.code);
      // @ts-ignore
      // state.products[productIndex] = action.payload;

      let newObject = {};
      Object.assign(newObject, state.products[productIndex]);
      Object.assign(newObject, action.payload);

      // TODO: it doesn't count new totalValue
      console.log('REDUX REDUCER ', newObject);
      // @ts-ignore
      state.products[productIndex] = newObject;
    });

    builder.addCase(editProductInStock.rejected, (state) => {
      state.loading = 'idle';
      state.isError = true;
    });

    builder.addCase(deleteProductInStock.pending, (state) => {
      state.loading = 'pending';
      state.isError = false;
    });

    builder.addCase(deleteProductInStock.fulfilled, (state, action) => {
      state.loading = 'idle';

      // @ts-ignore
      const productIndex = state.products.findIndex(product => product.code === action.payload.code);

      if (action.payload.destroyedRows == 1) {
        state.products.splice(productIndex, 1);
      }
    });

    builder.addCase(deleteProductInStock.rejected, (state) => {
      state.loading = 'idle';
      state.isError = true;
    });
  }
});

export const {
  stockLoading,
  stockReceived,
} = stockSlice.actions;

export default stockSlice.reducer;
