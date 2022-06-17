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

  const [wizardProductCode, setWizardProductCode] = useState(null);
  const [isWizardVisible, setWizardVisibility] = useState(false);
  const [isFilterFormVisible, setFilterFormVisibility] = useState(false);

  const dispatchAddProduct = (product) => {
    dispatch(addProduct(product));
    resetWizardState();
  }

  const dispatchEditProduct = (code) => {
    dispatch(editProduct(code));
    resetWizardState();
  }

  const dispatchDeleteProduct = (code) => {
    const confirmation = window.confirm(`Czy na pewno chcesz usunąć produkt o kodzie ${code} z bazy produktów?`);
    if (confirmation) {
      dispatch(deleteProduct(code))
    }
  };

  const initEditProductForm = (code) => {
    setWizardProductCode(code);
    setWizardVisibility(true);
  }

  const resetWizardState = () => {
    setWizardVisibility(false);
    setWizardProductCode(null);
  }

  const productsListButtons = [
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

  const product = products?.filter(product => product.code === wizardProductCode);
  const defaultValues = product?.length > 0 && {
    code: wizardProductCode,
    name: product[0].name,
    price: product[0].price,
    measureUnit: product[0].measureUnit,
  };

  const buttonClasses = 'm-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800';

  // FIXME: Bug: hit edit on one product and then on another one - data in form doesn't change
  return (
    <>
      <div className="container px-0">
        <div className="container my-2 px-0 flex flex-row justify-between content-center">
          <h2 className="my-1">Baza produktów</h2>
          <div>
            <button
              className={buttonClasses}
              onClick={() => {
                setWizardVisibility(true);
                setWizardProductCode(null);
              }}
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

      {isWizardVisible && !wizardProductCode && <ProductWizard
        buttonTitle="Dodaj"
        buttonAction={dispatchAddProduct}
        fields={['name', 'code', 'measureUnit', 'price']}
        mode="products"
      />}

      {isWizardVisible && wizardProductCode && <ProductWizard
        buttonTitle="Edytuj"
        buttonAction={dispatchEditProduct}
        defaultValues={defaultValues}
        disabledFields={['code']}
        fields={['name', 'code', 'measureUnit', 'price']}
        mode="products"
      />}

      <ProductsList
        buttons={productsListButtons}
        data={products}
        type="compact"
      />
    </>
  );
}

export default ProductsListView;
