import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductWizard from './ProductWizard';
import { editProduct, editProductInStock } from '../helpers/dbActions';
import { setEditFormVisibility } from '../actions';

/*
 * props.view => either "products" or "stock"
 */
export const EditProductWizard = ({...props}) => {
  const dispatch = useDispatch();
  const isVisible = useSelector(state => state.app.editFormVisibility);
  const code = useSelector(state => state.app.editFormProductCode);
  const products = useSelector(state => state.products.products);
  const stock = useSelector(state => state.stock.products);

  const wizardButtonAction = props.view === 'products'
    ? editProduct
    : editProductInStock;
  const wizardButtons = {
    title: 'Edytuj',
    onClick: wizardButtonAction,
  };

  // NOTE: x))))))
  const asdf = products && products.filter(product => product.Code === code);
  const zxcv = stock && stock.filter(product => product.Code === code);
  let defaultValues = asdf && asdf.length > 0 && {
    code,
    name: asdf[0].Name,
    price: asdf[0].Price,
    measureUnit: asdf[0].MeasureUnit,
    // amount: zxcv[0].Amount,
  };
  if (props.view === 'stock') defaultValues['amount'] = zxcv[0].Amount;

  return (
    <ProductWizard
      buttons={wizardButtons}
      defaultValues={defaultValues}
      disabledFields={props.view === 'products'
        ? ['code']
        : ['code', 'name']}
      fields={props.view === 'products'
        ? ['name', 'code', 'measureUnit', 'price']
        : ['name', 'code', 'amount']}
      onHide={() => dispatch(setEditFormVisibility(false))}
      show={isVisible}
      title={props.view === 'products'
        ? 'Edytuj produkt z bazy danych'
        : 'Edytuj product w spisie z natury'}
    />
  );
}

export default EditProductWizard;
