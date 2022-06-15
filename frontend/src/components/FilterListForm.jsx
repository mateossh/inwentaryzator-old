import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import { receiveProductsView } from '../actions';

import { fetchProducts } from '../features/products/productSlice';

export const FilterListForm = ({ data: products, ...props }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const FilterList = (data, name, code) => {
    const filteredProducts = data.filter(product => {
      if (name !== '') {
        return product.name.includes(name);
      }
      if (code !== '') {
        return product.code.includes(code);
      }

      return product;
    });

    // dispatch(receiveProductsView(filteredProducts));
  };

  useEffect(() => {
    FilterList(products, name, code);
  }, [name, code]);

  return (
    <Form>
      <h2>Filtruj liste produktów</h2>
      <p>Znajdź produkt po nazwie LUB kodzie produktu</p>
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="Nazwa"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
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
            }}/>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default FilterListForm;

