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

  const [isWizardVisible, setWizardVisibility] = useState(false);
  const [wizardProductCode, setWizardProductCode] = useState(null);

  const dispatchAddProductToStock = (product) => {
    dispatch(addProductToStock(product));
    resetWizardState();
  }

  const dispatchEditProductInStock = (code) => {
    dispatch(editProductInStock(code));
    resetWizardState();
  }

  const dispatchDeleteProductInStock = (code) => {
    const confirmation = window.confirm(`Czy na pewno chcesz usunąć produkt o kodzie ${code} ze spisu z natury?`);
    if (confirmation) {
      dispatch(deleteProductInStock(code));
    }
  };

  const initEditStockForm = (code) => {
    setWizardVisibility(true);
    setWizardProductCode(code);
  }

  const resetWizardState = () => {
    setWizardVisibility(false);
    setWizardProductCode(null);
  }

  const buttons = [
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

  const product = products?.filter(product => product.code === wizardProductCode);
  const stockItem = stock?.filter(product => product.code === wizardProductCode);
  const defaultValues = product?.length > 0 && stock?.length > 0 && {
    code: wizardProductCode,
    name: product[0].name,
    price: product[0].price,
    measureUnit: product[0].measureUnit,
    amount: stockItem[0].amount,
  }

  const buttonClasses = 'm-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800';

  // FIXME: Bug: hit edit on one product and then on another one - data in form doesn't change
  return (
    <>
      <div className="container px-0">
        <div className="container my-2 px-0 flex flex-row justify-between content-center">
          <h2 className="my-1">Widok spisu z natury</h2>
          <div>
            <button
              className={buttonClasses}
              onClick={() => {
                setWizardVisibility(true);
                setWizardProductCode(null);
              }}
            >
              Dodaj produkt
            </button>
          </div>
        </div>
      </div>

      {isWizardVisible && !wizardProductCode && <ProductWizard
        buttonTitle="Dodaj"
        buttonAction={dispatchAddProductToStock}
        disabledFields={['name']}
        fields={['name', 'code', 'amount']}
        mode="stock"
        onHide={() => resetWizardState()}
      />}

      {isWizardVisible && wizardProductCode && <ProductWizard
        buttonTitle="Edytuj"
        buttonAction={dispatchEditProductInStock}
        defaultValues={defaultValues}
        disabledFields={['code', 'name']}
        fields={['name', 'code', 'amount']}
        onHide={() => resetWizardState()}
        mode="stock"
      />}

      <ProductsList
        buttons={buttons}
        data={stock}
        title="Inwentaryzacja"
        type="full"
      />
    </>
  );
}

export default StockView;
