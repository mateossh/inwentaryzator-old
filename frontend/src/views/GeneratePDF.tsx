import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { PDFGenerator } from '../helpers/pdf';

type PaginationAlignment = "none" | "left" | "center" | "right";

export const GeneratePDFView = () => {
  const [membersCount, setMembersCount] = useState<number>(3);
  const [paginationAlignment, setPaginationAlignment] = useState<PaginationAlignment>('none');

  // NOTE: is this type correct?
  const generatePDF = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const config = {
      membersCount,
      paginationAlignment,
    };

    PDFGenerator(config);
  }

  return (
    <>
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
            onChange={(e) => { setMembersCount(parseInt(e.target.value)) }}
          />
        </Col>
      </Form>
      <Button onClick={generatePDF}>
        Generuj
      </Button>
    </>
  );
}

export default GeneratePDFView;
