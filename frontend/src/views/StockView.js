import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductsList from '../components/ProductsList';
import AddProductWizard from '../components/AddProductWizard';
import EditProductWizard from '../components/EditProductWizard';
import PDFWizard from '../components/PDFWizard';
import { initEditProductInStock, deleteProductInStock } from '../helpers/dbActions';
import {
  fetchStock,
  setAddFormVisibility,
  setPdfFormVisibility,
} from '../actions';

export const StockView = () => {
  const dispatch = useDispatch();
  const stock = useSelector(state => state.stock.products);
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
      {isAddFormVisible && <AddProductWizard view="stock" />}
      {isEditFormVisible && <EditProductWizard view="stock" />}
      {isPDFFormVisible && <PDFWizard
        onHide={() => dispatch(setPdfFormVisibility(false))}
        show={isPDFFormVisible} />}
    </>
  );
}

export default StockView;
