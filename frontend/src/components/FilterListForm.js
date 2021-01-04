import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const FilterListForm = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  return (
    <Form>
      <h2>Filtruj liste produktów</h2>
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="Nazwa"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
              FilterList(name, code);
            }}/>
        </Col>
        <Col>
          <Form.Control
            placeholder="Kod produktu"
            name="code"
            type="number"
            min="1"
            onChange={(e) => {
              setCode(e.target.value);
              FilterList(name, code);
            }}/>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default FilterListForm;

const FilterList = (name, code) => {
  console.log('XXXX: implement me ;]', name, code);
};
