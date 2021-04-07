import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

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

  // NOTE: isn't this blocking rendering app ???
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
    <div>
      <Form.Row>
        <Col><h2>Widok spisu z natury</h2></Col>
        <Col>
          <Button
            className="mx-1"
            onClick={() => dispatch(setAddFormVisibility(true))}
          >
            Dodaj produkt
          </Button>
          <Button
            className="mx-1"
            onClick={() => dispatch(setPdfFormVisibility(true))}
          >
            Generuj PDF
          </Button>
        </Col>
      </Form.Row>
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
    </div>
  );
}

export default StockView;
