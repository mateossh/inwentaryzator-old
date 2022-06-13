import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductsList from '../components/ProductsList';
import ProductWizard from '../components/ProductWizard';

import FilterListForm from '../components/FilterListForm';
import {
  // addProduct,
  // initEditProduct,
  // editProduct,
  // deleteProduct,
} from '../helpers/dbActions';

// import { setAddFormVisibility, setEditFormVisibility } from '../actions';


import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../features/products/productSlice';

export const ProductsListView = () => {
  // const dispatch = useDispatch();
  //
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);

  const productsView = useSelector(state => state.products.productsView);

  const [isAddFormVisible, setAddFormVisibility] = useState(false);
  const [isEditFormVisible, setEditFormVisibility] = useState(false);
  const [editFormProductCode, setEditFormProductCode] = useState(null);

  const [isFilterFormVisible, setFilterFormVisibility] = useState(false);

  const productsListData = productsView && productsView.length >= 0
    ? productsView
    : products;

  useEffect(() => {
    // TODO: REMOVE THIS!!! BAD CODE ARCHITECTURE !!!!!
    dispatch(fetchProducts());
  }, []); // eslint-disable-line

  // TODO: CHANGE THIS NAME!!!!
  const anotherNameForEditForm = (code) => {
    setEditFormVisibility(true);
    setEditFormProductCode(code);
  }

  const dispatchAddProduct = (product) => dispatch(addProduct(product));
  const dispatchEditProduct = (code) => dispatch(editProduct(code));
  const dispatchDeleteProduct = (code) => {
    const confirmation = window.confirm(`Czy na pewno chcesz usunąć produkt o kodzie ${code} z bazy produktów?`);
    if (confirmation) {
      dispatch(deleteProduct(code))
    }
  };

  const productsListActions = [
    {
      title: 'Edytuj',
      onClick: anotherNameForEditForm,
      variant: 'light',
    },
    {
      title: 'Usuń',
      onClick: dispatchDeleteProduct,
      variant: 'danger',
    },
  ];

  const asdf = products && products.filter(product => product.code === editFormProductCode);
  let defaultValues = asdf && asdf.length > 0 && {
    code: editFormProductCode,
    name: asdf[0].name,
    price: asdf[0].price,
    measureUnit: asdf[0].measureUnit,
  };

  return (
    <>
      <div className="container px-0">
        <div className="container my-2 px-0 flex flex-row justify-between content-center">
          <h2 className="my-1">Widok listy produktów</h2>
          <div>
            <button
              className="m-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800"
              onClick={() => setAddFormVisibility(true)}
            >
              Dodaj nowy produkt
            </button>
            <button
              className="m-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800 "
              onClick={() => setFilterFormVisibility(!isFilterFormVisible)}
            >
              Filtruj listę
            </button>
          </div>
        </div>
      </div>

      {isFilterFormVisible && <FilterListForm data={products} />}

      <ProductsList
        compact
        actions={productsListActions}
        title="Lista produktów w bazie danych"
        data={productsListData} />
      {isAddFormVisible && <ProductWizard
        buttons={{ title: 'Dodaj', onClick: dispatchAddProduct }}
        fields={['name', 'code', 'measureUnit', 'price']}
        mode='products'
        onHide={() => setAddFormVisibility(false)}
        show={!!isAddFormVisible}
        title='Dodaj produkt do bazy danych'
      />}
      {isEditFormVisible && <ProductWizard
        buttons={{ title: 'Edytuj', onClick: dispatchEditProduct }}
        defaultValues={defaultValues}
        disabledFields={['code']}
        fields={['name', 'code', 'measureUnit', 'price']}
        onHide={() => setEditFormVisibility(false)}
        show={!!isEditFormVisible}
        title='Edytuj produkt z bazy danych'
        mode='products'
      />}
    </>
  );
}

export default ProductsListView;
