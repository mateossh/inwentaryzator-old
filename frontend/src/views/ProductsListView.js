import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductsList from '../components/ProductsList';
import ProductWizard from '../components/ProductWizard';

import FilterListForm from '../components/FilterListForm';
import {
  addProduct,
  initEditProduct,
  editProduct,
  deleteProduct,
} from '../helpers/dbActions';
import {
  fetchProducts,
  setAddFormVisibility,
  setEditFormVisibility,
} from '../actions';

export const ProductsListView = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const productsView = useSelector(state => state.products.productsView);
  const isAddFormVisible = useSelector(state => state.app.addFormVisibility);
  const isEditFormVisible = useSelector(state => state.app.editFormVisibility);
  const code = useSelector(state => state.app.editFormProductCode);

  const [isFilterFormVisible, setFilterFormVisibility] = useState(false);

  const productsListData = productsView && productsView.length >= 0
    ? productsView
    : products;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []); // eslint-disable-line

  const productsListActions = [
    {
      title: 'Edytuj',
      onClick: initEditProduct,
      variant: 'light',
    },
    {
      title: 'Usuń',
      onClick: deleteProduct,
      variant: 'danger',
    },
  ];

  const asdf = products && products.filter(product => product.Code === code);
  let defaultValues = asdf && asdf.length > 0 && {
    code,
    name: asdf[0].Name,
    price: asdf[0].Price,
    measureUnit: asdf[0].MeasureUnit,
  };

  return (
    <>
      <div className="container px-0">
        <div className="container my-2 px-0 flex flex-row justify-between content-center">
          <h2 className="my-1">Widok listy produktów</h2>
          <div>
            <button
              className="m-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800"
              onClick={() => dispatch(setAddFormVisibility(true))}
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
        buttons={{ title: 'Dodaj', onClick: addProduct }}
        fields={['name', 'code', 'measureUnit', 'price']}
        mode='products'
        onHide={() => dispatch(setAddFormVisibility(false))}
        show={isAddFormVisible}
        title='Dodaj produkt do bazy danych'
      />}
      {isEditFormVisible && <ProductWizard
        buttons={{ title: 'Edytuj', onClick: editProduct }}
        defaultValues={defaultValues}
        disabledFields={['code']}
        fields={['name', 'code', 'measureUnit', 'price']}
        onHide={() => dispatch(setEditFormVisibility(false))}
        show={isEditFormVisible}
        title='Edytuj produkt z bazy danych'
        mode='products'
      />}
    </>
  );
}

export default ProductsListView;
