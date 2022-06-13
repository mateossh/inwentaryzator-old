import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface AppState {
//
// }
//
// const initialState: AppState = {
//
// }

const fetchConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
}

export interface Product {
  code: string
  name: string
  price: number
  measureUnit: string
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
  async (product: Product & BodyInit) => {
    const config = {
      body: JSON.stringify(product),
      method: 'POST',
      ...fetchConfig,
    }

    const response = await fetch('http://localhost:8080/api/v1/product', config);
    const createdProduct = await response.json();
    return createdProduct;
  }
)

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (product: Product & BodyInit) => {
    const config = {
      body: JSON.stringify(product),
      method: 'PUT',
      ...fetchConfig,
    }

    const response = await fetch(`http://localhost:8080/api/v1/product/${product.code}`, config);
    const editedProduct = await response.json();
    return editedProduct;
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (code: Number & BodyInit) => {
    const config = {
      method: 'DELETE',
      ...fetchConfig,
    }

    const response = await fetch(`http://localhost:8080/api/v1/product/${code}`, config);
    const deletedProduct = await response.json();
    return deletedProduct;
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
      state.isError = false;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.products = action.payload;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = 'idle';
      state.isError = true;
    });


    builder.addCase(addProduct.pending, (state, action) => {
      state.loading = 'pending';
      state.isError = false;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = 'idle';

      // TODO: check if user enters int instead of float in price
      // @ts-ignore
      state.products.push(action.payload);
    });

    builder.addCase(addProduct.rejected, (state) => {
      state.loading = 'idle';
      state.isError = true;
    });

    builder.addCase(editProduct.pending, (state) => {
      state.loading = 'pending';
      state.isError = false;
    });

    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.loading = 'idle';

      // @ts-ignore
      const productIndex = state.products.findIndex(product => product.code === action.payload.code);
      // @ts-ignore
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

      // @ts-ignore
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
  productCreated,
  productUpdated,
  productDeleted
} = productsSlice.actions;

export default productsSlice.reducer;
