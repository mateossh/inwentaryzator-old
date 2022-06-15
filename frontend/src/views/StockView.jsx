import React, { useEffect, useState } from 'react';

import ProductsList from '../components/ProductsList';
import ProductWizard from '../components/ProductWizard';

import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addProductToStock,
  editProductInStock,
  deleteProductInStock
} from '../features/stock/stockSlice';

export const StockView = () => {
  const dispatch = useAppDispatch();
  const stock = useAppSelector(state => state.stock.products);
  const products = useAppSelector(state => state.products.products);

  const [isAddFormVisible, setAddFormVisibility] = useState(false);
  const [isEditFormVisible, setEditFormVisibility] = useState(false);
  const [editFormProductCode, setEditFormProductCode] = useState(null);

  const dispatchAddProductToStock = (product) => dispatch(addProductToStock(product));
  const dispatchEditProductInStock = (code) => dispatch(editProductInStock(code));
  const dispatchDeleteProductInStock = (code) => {
    const confirmation = window.confirm(`Czy na pewno chcesz usunąć produkt o kodzie ${code} ze spisu z natury?`);
    if (confirmation) {
      dispatch(deleteProductInStock(code));
    }
  };

  const initEditStockForm = (code) => {
    setEditFormVisibility(true);
    setEditFormProductCode(code);
  }

  const actions = [
    {
      title: 'Edytuj',
      onClick: initEditStockForm,
      variant: 'light',
    },
    {
      title: 'Usuń',
      onClick: dispatchDeleteProductInStock,
      variant: 'danger',
    },
  ];

  const product = products?.filter(product => product.code === editFormProductCode);
  const stockItem = stock?.filter(product => product.code === editFormProductCode);
  const defaultValues = product?.length > 0 && stock?.length > 0 && {
    code: editFormProductCode,
    name: product[0].name,
    price: product[0].price,
    measureUnit: product[0].measureUnit,
    amount: stockItem[0].amount,
  }

  const buttonClasses = 'm-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800';

  return (
    <>
      <div className="container px-0">
        <div className="container my-2 px-0 flex flex-row justify-between content-center">
          <h2 className="my-1">Widok spisu z natury</h2>
          <div>
            <button
              className={buttonClasses}
              onClick={() => setAddFormVisibility(true)}
            >
              Dodaj produkt
            </button>
          </div>
        </div>
      </div>

      <ProductsList
        type="full"
        actions={actions}
        title="Inwentaryzacja"
        data={stock} />
      {isAddFormVisible && <ProductWizard
        buttons={{ title: 'Dodaj', onClick: dispatchAddProductToStock}}
        disabledFields={['name']}
        fields={['name', 'code', 'amount']}
        mode='stock'
        onHide={() => setAddFormVisibility(false)}
        show={isAddFormVisible}
        title='Dodaj produkt do spisu z natury'
      />}
      {isEditFormVisible && <ProductWizard
        buttons={{ title: 'Edytuj', onClick: dispatchEditProductInStock }}
        defaultValues={defaultValues}
        disabledFields={['code', 'name']}
        fields={['name', 'code', 'amount']}
        onHide={() => setEditFormVisibility(false)}
        show={isEditFormVisible}
        title='Edytuj produkt w spisie z natury'
        mode="stock"
      />}
    </>
  );
}

export default StockView;
