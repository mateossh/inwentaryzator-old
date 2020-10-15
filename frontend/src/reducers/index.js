import { combineReducers } from 'redux';
import { app } from './app';
import { products } from './products';
import { stock } from './stock';

export default combineReducers({
  app,
  products,
  stock,
});
