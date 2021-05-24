import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductsList from '../components/ProductsList';
import AddProductWizard from '../components/AddProductWizard';
import EditProductWizard from '../components/EditProductWizard';
import FilterListForm from '../components/FilterListForm';
import { initEditProduct, deleteProduct } from '../helpers/dbActions';
import { fetchProducts, setAddFormVisibility } from '../actions';

export const ProductsListView = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const productsView = useSelector(state => state.products.productsView);
  const isAddFormVisible = useSelector(state => state.app.addFormVisibility);
  const isEditFormVisible = useSelector(state => state.app.editFormVisibility);

  const [isFilterFormVisible, setFilterFormVisibility] = useState(false);

  const productsListData =
    productsView !== undefined && productsView.length >= 0
      ? productsView
      : products;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []); // eslint-disable-line

  const productsListActions = [
    {
      title: 'Edytuj',
      onClick: initEditProduct,
      variant: 'light', // NOTE: unused
    },
    {
      title: 'Usuń',
      onClick: deleteProduct,
      variant: 'danger', // NOTE: unused
    },
  ];

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
      {isAddFormVisible && <AddProductWizard view="products" />}
      {isEditFormVisible && <EditProductWizard view="products" />}
    </>
  );
}

export default ProductsListView;
