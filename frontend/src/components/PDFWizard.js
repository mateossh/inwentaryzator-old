import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  Modal,
} from 'react-bootstrap';
import { PDFGenerator } from '../helpers/pdf';

export const PDFWizard = ({...props}) => {
  const [membersCount, setMembersCount] = useState(3);
  const [paginationAlignment, setPaginationAlignment] = useState('none');

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
              checked={paginationAlignment === 'none'}
              onChange={(e) => { setPaginationAlignment(e.target.value) }}
            />
            <Form.Check
              type="radio"
              name="footer-page-number"
              id="footer-left"
              label="Lewa"
              value="left"
              checked={paginationAlignment === 'left'}
              onChange={(e) => { setPaginationAlignment(e.target.value) }}
            />
            <Form.Check
              type="radio"
              name="footer-page-number"
              id="footer-center"
              label="Środek"
              value="center"
              checked={paginationAlignment === 'center'}
              onChange={(e) => { setPaginationAlignment(e.target.value) }}
            />
            <Form.Check
              type="radio"
              name="footer-page-number"
              id="footer-right"
              label="Prawa"
              value="right"
              checked={paginationAlignment === 'right'}
              onChange={(e) => { setPaginationAlignment(e.target.value) }}
            />
          </Col>
          <Col>
            <h5>Liczba osób sporządzających spis</h5>
            <Form.Control
              type="number"
              min="1"
              value={membersCount}
              onChange={(e) => { setMembersCount(e.target.value) }}
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

          const initConfig = {
            membersCount,
            paginationAlignment,
          };

          PDFGenerator(initConfig);
        }}>
          Generuj
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PDFWizard;
