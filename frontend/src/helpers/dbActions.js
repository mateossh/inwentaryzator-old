import { makeAPIRequest } from './requests';
import {
  fetchProducts,
  fetchStock,
  setEditFormVisibility,
} from '../actions';
import { store } from '../store';



export const editProduct = async (data) => {
  console.log('XXXX: ACTUAL EDIT PROIDUCT AKLJSHDKLAJSDKLJQWAKLDJ HAHAHAHAH LMAO');
  console.log('XXXXX: request data', data);
  const reqData = {
    // Code: data.code,
    Name: data.name,
    Price: data.price,
    MeasureUnit: data.measureUnit,
  };

  return await makeAPIRequest(`http://localhost:8080/api/v1/product/${data.code}`, 'PUT', reqData)
    .then(res => {
      store.dispatch(fetchProducts());
      return res;
    });
};

// NOTE: What if someone wants to remove product from database, but still has this product used in stock???
export const deleteProduct = async (id) => {
  const confirmation = window.confirm(`Czy na pewno chcesz usunąć produkt o kodzie ${id} z bazy produktów?`);
  if (confirmation) {
    return await makeAPIRequest(`http://localhost:8080/api/v1/product/${id}`, 'DELETE')
      .then(res => {
        store.dispatch(fetchProducts())
        return res;
      });
  }

  return null;
};

export const addProductToStock = async (data) => {
  const reqData = {
    Code: data.code,
    Amount: data.amount,
  };

  return await makeAPIRequest('http://localhost:8080/api/v1/stock', 'POST', reqData)
    .then(res => {
      console.log('hehe', res);
      store.dispatch(fetchStock())
      return res;
    });
};

export const initEditProductInStock = (id) => {
  console.log('XXXX: edit in stock', id);
  store.dispatch(setEditFormVisibility(true, id));
};

export const editProductInStock = async (data) => {
  console.log('XXXX: ACTUAL EDIT PRODUCT IN STOCK AKLJSHDKLAJSDKLJQWAKLDJ HAHAHAHAH LMAO');
  console.log('XXXXX: request data', data, typeof data.amount);
  const reqData = {
    Amount: data.amount,
  };

  return await makeAPIRequest(`http://localhost:8080/api/v1/stock/${data.code}`, 'PUT', reqData)
    .then(res => {
      store.dispatch(fetchStock())
      return res;
    });
};

export const deleteProductInStock = async (id) => {
  const confirmation = window.confirm(`Czy na pewno chcesz usunąć produkt o kodzie ${id} ze spisu z natury?`);
  if (confirmation) {
    return await makeAPIRequest(`http://localhost:8080/api/v1/stock/${id}`, 'DELETE')
      .then(res => {
        store.dispatch(fetchStock())
        return res;
      });
  }

  return null;
};
