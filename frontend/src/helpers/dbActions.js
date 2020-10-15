import { makeAPIRequest } from './requests';
import {
  fetchProducts,
  fetchStock,
  setEditFormVisibility,
} from '../actions';
import { store } from '../store';

export const addProduct = async (data) => {
  const reqData = {
    Code: data.code,
    Name: data.name,
    Price: data.price,
    MeasureUnit: data.measureUnit,
  };

  await makeAPIRequest('http://localhost:8080/api/v1/product', 'POST', reqData)
    .then(() => store.dispatch(fetchProducts()));
};

export const initEditProduct = (id) => {
  console.log('XXXX: edit', id);
  store.dispatch(setEditFormVisibility(true, id));
};

export const editProduct = async (data) => {
  console.log('XXXX: ACTUAL EDIT PROIDUCT AKLJSHDKLAJSDKLJQWAKLDJ HAHAHAHAH LMAO');
  console.log('XXXXX: request data', data);
  const reqData = {
    // Code: data.code,
    Name: data.name,
    Price: data.unitPrice,
    MeasureUnit: data.measureUnit,
  };

  await makeAPIRequest(`http://localhost:8080/api/v1/product/${data.code}`, 'PUT', reqData)
    .then(() => store.dispatch(fetchProducts()));
};

// NOTE: What if someone wants to remove product from database, but still has this product used in stock???
export const deleteProduct = (id) => {
  const confirmation = window.confirm(`Czy na pewno chcesz usunąć produkt o kodzie ${id} z bazy produktów?`);
  if (confirmation) {
    makeAPIRequest(`http://localhost:8080/api/v1/product/${id}`, 'DELETE')
      .then(() => store.dispatch(fetchProducts()));
  }
};

export const addProductToStock = async (data) => {
  const reqData = {
    Code: data.code,
    Amount: data.amount,
  };

  await makeAPIRequest('http://localhost:8080/api/v1/stock', 'POST', reqData)
    .then(() => store.dispatch(fetchStock()));
};

export const initEditProductInStock = (id) => {
  console.log('XXXX: edit in stock', id);
  store.dispatch(setEditFormVisibility(true, id));
};

export const editProductInStock = async (data) => {
  console.log('XXXX: ACTUAL EDIT PRODUCT IN STOCK AKLJSHDKLAJSDKLJQWAKLDJ HAHAHAHAH LMAO');
  console.log('XXXXX: request data', data);
  const reqData = {
    Amount: data.amount,
  };

  await makeAPIRequest(`http://localhost:8080/api/v1/stock/${data.code}`, 'PUT', reqData)
    .then(() => store.dispatch(fetchStock()));
};

export const deleteProductInStock = (id) => {
  const confirmation = window.confirm(`Czy na pewno chcesz usunąć produkt o kodzie ${id} ze spisu z natury?`);
  if (confirmation) {
    makeAPIRequest(`http://localhost:8080/api/v1/stock/${id}`, 'DELETE')
      .then(() => store.dispatch(fetchStock()));
  }
};
