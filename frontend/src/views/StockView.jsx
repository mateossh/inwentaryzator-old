import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductsList from '../components/ProductsList';

import ProductWizard from '../components/ProductWizard';
import PDFWizard from '../components/PDFWizard';
import {
  addProductToStock,
  editProductInStock,
  initEditProductInStock,
  deleteProductInStock,
} from '../helpers/dbActions';
import {
  fetchStock,
  setAddFormVisibility,
  setEditFormVisibility,
  setPdfFormVisibility,
} from '../actions';

export const StockView = () => {
  const dispatch = useDispatch();
  const stock = useSelector(state => state.stock.products);
  const code = useSelector(state => state.app.editFormProductCode);
  const products = useSelector(state => state.products.products);
  const isPDFFormVisible = useSelector(state => state.app.pdfFormVisibility);
  const isAddFormVisible = useSelector(state => state.app.addFormVisibility);
  const isEditFormVisible = useSelector(state => state.app.editFormVisibility);

  useEffect(() => {
    dispatch(fetchStock());
  }, []); // eslint-disable-line

  const actions = [
    {
      title: 'Edytuj',
      onClick: initEditProductInStock,
      variant: 'light',
    },
    {
      title: 'Usuń',
      onClick: deleteProductInStock,
      variant: 'danger',
    },
  ];

    // NOTE: x))))))
    const asdf = products && products.filter(product => product.code === code);
    const zxcv = stock && stock.filter(product => product.code === code);
    let defaultValues = asdf && asdf.length > 0 && {
      code,
      name: asdf[0].name,
      price: asdf[0].price,
      measureUnit: asdf[0].measureUnit,
      amount: zxcv[0].amount,
    };

  return (
    <>
      <div className="container px-0">
        <div className="container my-2 px-0 flex flex-row justify-between content-center">
          <h2 className="my-1">Widok spisu z natury</h2>
          <div>
            <button
              className="m-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800"
              onClick={() => dispatch(setAddFormVisibility(true))}
            >
              Dodaj produkt
            </button>
            <button
              className="m-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800 "
              onClick={() => dispatch(setPdfFormVisibility(true))}
              >
                Generuj PDF
            </button>
          </div>
        </div>
      </div>

      <ProductsList
        full
        actions={actions}
        title="Inwentaryzacja"
        data={stock} />
      {isAddFormVisible && <ProductWizard
        buttons={{ title: 'Dodaj', onClick: addProductToStock}}
        disabledFields={['name']}
        fields={['name', 'code', 'amount']}
        mode='stock'
        onHide={() => dispatch(setAddFormVisibility(false))}
        show={isAddFormVisible}
        title='Dodaj produkt do spisu z natury'
      />}
      {isEditFormVisible && <ProductWizard
        buttons={{ title: 'Edytuj', onClick: editProductInStock }}
        defaultValues={defaultValues}
        disabledFields={['code', 'name']}
        fields={['name', 'code', 'amount']}
        onHide={() => dispatch(setEditFormVisibility(false))}
        show={isEditFormVisible}
        title='Edytuj produkt w spisie z natury'
        mode="stock"
      />}
      {isPDFFormVisible && <PDFWizard
        onHide={() => dispatch(setPdfFormVisibility(false))}
        show={isPDFFormVisible} />}
    </>
  );
}

export default StockView;
