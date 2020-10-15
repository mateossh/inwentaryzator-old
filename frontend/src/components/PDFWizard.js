import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  Modal,
} from 'react-bootstrap';
import { generatePDF } from '../helpers/pdf';
import { 
  setPdfMembersCount,
  setPdfPaginationAlignment,
} from '../actions';

export const PDFWizard = ({...props}) => {
  const membersCount = useSelector(state => state.app.pdfMembersCount);
  const paginationAlignment = useSelector(
    state => state.app.pdfPaginationAlignment);
  const dispatch = useDispatch();

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Opcje generatora PDF</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Col>
            <h5>Numerowanie stron</h5>
            <Form.Check
              type="radio"
              name="footer-page-number"
              id="footer-none"
              label="Brak"
              value="none"
              onChange={(e) => { 
                dispatch(setPdfPaginationAlignment(e.target.value)) }}
            />
            <Form.Check
              type="radio"
              name="footer-page-number"
              id="footer-left"
              label="Lewa"
              value="left"
              onChange={(e) => { 
                dispatch(setPdfPaginationAlignment(e.target.value)) }}
            />
            <Form.Check
              type="radio"
              name="footer-page-number"
              id="footer-center"
              label="Środek"
              value="center"
              onChange={(e) => { 
                dispatch(setPdfPaginationAlignment(e.target.value)) }}
            />
            <Form.Check
              type="radio"
              name="footer-page-number"
              id="footer-right"
              label="Prawa"
              value="right"
              onChange={(e) => { 
                dispatch(setPdfPaginationAlignment(e.target.value)) }}
            />
          </Col>
          <Col>
            <h5>Liczba osób sporządzających spis</h5>
            <Form.Control
              type="number"
              min="1"
              value={membersCount}
              onChange={(e) => { dispatch(setPdfMembersCount(e.target.value)) }}
            />
          </Col>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { props.onHide(); }}>
          Zamknij
        </Button>
        <Button onClick={(e) => {
          e.preventDefault();
          generatePDF();
        }}>
          Generuj
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PDFWizard;
