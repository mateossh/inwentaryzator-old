// TODO: consider using Object.assign here

export const products = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_PRODUCT':
    return {
      ...state,
      products: action.product,
    };
  case 'REQUEST_PRODUCTS':
    return {
      ...state,
      status: 'REQUESTED',
    };
  case 'RECEIVE_PRODUCTS':
    return {
      ...state,
      products: action.products,
      status: 'RECEIVED',
    };
  case 'RECEIVE_PRODUCTS_VIEW':
    return {
      ...state,
      productsView: action.products,
    };
  default:
    return state;
  }
};
