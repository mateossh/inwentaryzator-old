import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createToast } from '../toasts/toastSlice';

interface ProductsState {
  products: Product[]
  isError: boolean
  loading: 'idle' | 'pending'
}

export interface Product {
  code: string
  name: string
  price: number
  measureUnit: string
}

const initialState: ProductsState = {
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

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await fetch('http://localhost:8080/api/v1/product');
    const products = await response.json();
    return products;
  }
)

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: Product, thunkAPI) => {
    const config = {
      body: JSON.stringify(product),
      method: 'POST',
      ...fetchConfig,
    }

    const response = await fetch('http://localhost:8080/api/v1/product', config);
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

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (product: Product, thunkAPI) => {
    const config = {
      body: JSON.stringify(product),
      method: 'PUT',
      ...fetchConfig,
    }

    const response = await fetch(`http://localhost:8080/api/v1/product/${product.code}`, config);
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

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (code: Number, thunkAPI) => {
    const config = {
      method: 'DELETE',
      ...fetchConfig,
    }

    const response = await fetch(`http://localhost:8080/api/v1/product/${code}`, config);
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


const productsSlice = createSlice({
  name: 'products',
  initialState,
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = 'pending';
      state.isError = false;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.products = action.payload;
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = 'idle';
      state.isError = true;
    });


    builder.addCase(addProduct.pending, (state) => {
      state.loading = 'pending';
      state.isError = false;
    });

    builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = 'idle';

      // TODO: check if user enters int instead of float in price
      state.products.push(action.payload);
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      console.log('woogabooga error but whyyy');
      console.error(action.error);

      state.loading = 'idle';
      state.isError = true;
    });

    builder.addCase(editProduct.pending, (state) => {
      state.loading = 'pending';
      state.isError = false;
    });

    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.loading = 'idle';

      const productIndex = state.products.findIndex(product => product.code === action.payload.code);
      state.products[productIndex] = action.payload;

    });

    builder.addCase(editProduct.rejected, (state) => {
      state.loading = 'idle';
      state.isError = true;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = 'pending';
      state.isError = false;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = 'idle';

      const productIndex = state.products.findIndex(product => product.code === action.payload.code);

      if (action.payload.destroyedRows == 1) {
        state.products.splice(productIndex, 1);
      }
    });

    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = 'idle';
      state.isError = true;
    });
  }
});

export const {
  productsLoading,
  productsReceived,
} = productsSlice.actions;

export default productsSlice.reducer;
