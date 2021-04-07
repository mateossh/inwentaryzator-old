// ============================== APP ====================================
export const setBackendHealth = (res) => {
  const health = res === 200 ? true : false;

  return {
    type: 'SET_BACKEND_HEALTH',
    health,
  }
};

export const setCurrentView = (view) => ({
  type: 'SET_CURRENT_VIEW',
  view,
});

export const setViewComponent = (component) => ({
  type: 'SET_VIEW_COMPONENT',
  component,
});

export const setPdfFormVisibility = (pdfFormVisibility) => ({
  type: 'SET_PDF_FORM_VISIBILITY',
  pdfFormVisibility,
});

export const setAddFormVisibility = (addFormVisibility) => ({
  type: 'SET_ADD_FORM_VISIBILITY',
  addFormVisibility,
});

export const setEditFormVisibility = (editFormVisibility, editFormProductCode = 0) => ({
  type: 'SET_EDIT_FORM_VISIBILITY',
  editFormVisibility,
  editFormProductCode,
});

export const setPdfMembersCount = (pdfMembersCount) => ({
  type: 'SET_PDF_MEMBERS_COUNT',
  pdfMembersCount,
});

export const setPdfPaginationAlignment = (pdfPaginationAlignment) => ({
  type: 'SET_PDF_PAGINATION_ALIGNMENT',
  pdfPaginationAlignment,
});

// ============================ PRODUCTS =================================


export const addProduct = (product) => ({
  type: 'ADD_PRODUCT',
  product,
});

export const requestProducts = () => ({
  type: 'REQUEST_PRODUCTS',
});

export const receiveProducts = (products) => ({
  type: 'RECEIVE_PRODUCTS',
  products,
});

export const invalidProducts = () => ({
  type: 'INVALID_PRODUCTS',
});

// TODO: error handling
export const fetchProducts = () => {
  return function(dispatch) {
    dispatch(requestProducts);
    fetch('http://localhost:8080/api/v1/product')
      .then(res => res.json())
      .then(json => dispatch(receiveProducts(json)));
  };
};

export const receiveProductsView = (products) => ({
  type: 'RECEIVE_PRODUCTS_VIEW',
  products,
});

// ============================ STOCK =================================

export const requestStock = () => ({
  type: 'REQUEST_STOCK',
});

export const receiveStock = (stock) => ({
  type: 'RECEIVE_STOCK',
  stock,
});

// TODO: error handling
export const fetchStock = () => {
  return function(dispatch) {
    dispatch(requestStock);
    fetch('http://localhost:8080/api/v1/stock')
      .then(res => res.json())
      .then(json => dispatch(receiveStock(json)));
  };
};

// ============================ TOAST =================================

export const addToast = (toast) => ({
  type: 'ADD_TOAST',
  toast,
});

export const hideToast = (toastId) => ({
  type: 'HIDE_TOAST',
  toastId,
});
