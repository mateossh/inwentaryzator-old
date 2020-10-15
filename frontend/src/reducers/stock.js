// TODO: consider using Object.assign here

export const stock = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_PRODUCT_STOCK':
    return {
      ...state,
      products: action.product,
    };
  case 'REQUEST_STOCK':
    return {
      ...state,
      status: 'REQUESTED',
    };
  case 'RECEIVE_STOCK':
    return {
      ...state,
      products: action.stock,
      status: 'RECEIVED',
    };
  default:
    return state;
  }
};
