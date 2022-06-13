import { configureStore } from '@reduxjs/toolkit'

import appReducer from './features/app/appSlice'
import productsReducer from './features/products/productSlice'
import stockReducer from './features/stock/stockSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productsReducer,
    stock: stockReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
