import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

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
          <Col className="my-2">
            <h5>Numerowanie stron</h5>
            <ToggleButtonGroup
              name="footer-page-number"
              onChange={setPaginationAlignment}
              type="radio"
              value={paginationAlignment}
            >
              <ToggleButton value="none">Brak</ToggleButton>
              <ToggleButton value="left">Lewa</ToggleButton>
              <ToggleButton value="center">Środek</ToggleButton>
              <ToggleButton value="right">Prawa</ToggleButton>
            </ToggleButtonGroup>
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
