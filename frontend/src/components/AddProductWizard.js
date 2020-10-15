import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductWizard from './ProductWizard';
import { addProduct, addProductToStock } from '../helpers/dbActions';
import { setAddFormVisibility } from '../actions';

/*
  * props.view => either "products" or "stock"
  */
export const AddProductWizard = ({...props}) => {
  const dispatch = useDispatch();
  const isVisible = useSelector(state => state.app.addFormVisibility);
  // const code = useSelector(state => state.app.editFormProductCode);
  // const products = useSelector(state => state.products.products);

  const wizardButtonAction = props.view === 'products'
    ? addProduct
    : addProductToStock;
  const wizardButtons = {
    title: 'Dodaj',
    onClick: wizardButtonAction,
  };

  return (
    <ProductWizard
      buttons={wizardButtons}
      disabledFields={props.view === 'products'
        ? []
        : ['name']}
      fields={props.view === 'products'
        ? ['name', 'code', 'measureUnit', 'price']
        : ['name', 'code', 'amount']}
      mode={props.view}
      onHide={() => dispatch(setAddFormVisibility(false))}
      show={isVisible}
      title={props.view === 'products'
        ? 'Dodaj produkt do bazy danych'
        : 'Dodaj produkt do spisu z natury'}
    />
  );
}

export default AddProductWizard;
