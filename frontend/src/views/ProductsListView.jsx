import React, { useEffect, useState } from 'react';

import ProductsList from '../components/ProductsList';
import ProductWizard from '../components/ProductWizard';
import FilterListForm from '../components/FilterListForm';

import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addProduct,
  editProduct,
  deleteProduct
} from '../features/products/productSlice';

export const ProductsListView = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);

  const [isAddFormVisible, setAddFormVisibility] = useState(false);
  const [isEditFormVisible, setEditFormVisibility] = useState(false);
  const [editFormProductCode, setEditFormProductCode] = useState(null);
  const [isFilterFormVisible, setFilterFormVisibility] = useState(false);

  const dispatchAddProduct = (product) => dispatch(addProduct(product));
  const dispatchEditProduct = (code) => dispatch(editProduct(code));
  const dispatchDeleteProduct = (code) => {
    const confirmation = window.confirm(`Czy na pewno chcesz usunąć produkt o kodzie ${code} z bazy produktów?`);
    if (confirmation) {
      dispatch(deleteProduct(code))
    }
  };

  const initEditProductForm = (code) => {
    setEditFormVisibility(true);
    setEditFormProductCode(code);
  }

  const productsListActions = [
    {
      title: 'Edytuj',
      onClick: initEditProductForm,
      variant: 'light',
    },
    {
      title: 'Usuń',
      onClick: dispatchDeleteProduct,
      variant: 'danger',
    },
  ];

  const product = products?.filter(product => product.code === editFormProductCode);
  const defaultValues = product?.length > 0 && {
    code: editFormProductCode,
    name: product[0].name,
    price: product[0].price,
    measureUnit: product[0].measureUnit,
  };

  const buttonClasses = 'm-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800';

  return (
    <>
      <div className="container px-0">
        <div className="container my-2 px-0 flex flex-row justify-between content-center">
          <h2 className="my-1">Widok listy produktów</h2>
          <div>
            <button
              className={buttonClasses}
              onClick={() => setAddFormVisibility(true)}
            >
              Dodaj nowy produkt
            </button>
            <button
              className={buttonClasses}
              onClick={() => setFilterFormVisibility(!isFilterFormVisible)}
            >
              Filtruj listę
            </button>
          </div>
        </div>
      </div>

      {isFilterFormVisible && <FilterListForm data={products} />}

      <ProductsList
        type="compact"
        actions={productsListActions}
        title="Lista produktów w bazie danych"
        data={products} />
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
