import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  Modal,
} from 'react-bootstrap';

// mode => 'products' or 'stock'
export const ProductWizard = ({
  defaultValues,
  disabledFields,
  fields,
  title,
  ...props}) => {
  // NOTE: why price and amount states are '' by default:
  // When default value was 0, number input had no placeholder, but if I set
  // that to '', it has placeholder like every other input in forms
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [measureUnit, setMeasureUnit] = useState('');
  const [amount, setAmount] = useState('');
  const products = useSelector(state => state.products.products);
  const data = { name, code, price, measureUnit, amount };
  const [isSearchByNameFormVisible, setSearchByNameFormVisibility] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const findProductNameWithCode = (code) => {
    const results = products.filter(product => product.Code === code);
    results.length > 0
      ? setName(results[0].Name)
      : setName('')
  }


  const findProductWithName = (searchedPhrase) => {
    const results = products.filter(product => product.Name.includes(searchedPhrase));
    console.log('findProduct with name', results);
    results.length > 0
      ? setSearchResults(results)
      : setSearchResults([])
  }

  useEffect(() => {
    if (defaultValues && defaultValues.code) setCode(defaultValues.code);
    if (defaultValues && defaultValues.name) setName(defaultValues.name);
    if (defaultValues && defaultValues.price) setPrice(defaultValues.price);
    if (defaultValues && defaultValues.measureUnit) setMeasureUnit(defaultValues.measureUnit);
    if (defaultValues && defaultValues.amount) setAmount(defaultValues.amount);
  }, []); // eslint-disable-line

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.includes('name') && <Form.Row>
            <Col>
              <Form.Control
                disabled={disabledFields && disabledFields.includes('name')
                  ? true : false}
                placeholder="Nazwa"
                name="name"
                // defaultValue={defaultValues && defaultValues.name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}/>
            </Col>
          </Form.Row>}
          {fields.includes('code') && <Form.Row>
            <Col>
              <Form.Control
                placeholder="Kod produktu"
                // defaultValue={props.defaultValues && props.defaultValues.code}
                value={code}
                disabled={disabledFields && disabledFields.includes('code')
                  ? true : false}
                name="code"
                type="number"
                min="1"
                onChange={(e) => {
                  setCode(e.target.value);
                  if (props.mode === 'stock')
                    findProductNameWithCode(e.target.value);
                }}/>
            </Col>
          </Form.Row>}
          {fields.includes('price') && <Form.Row>
            <Col>
              <Form.Control
                // defaultValue={props.defaultValues && props.defaultValues.price}
                value={price}
                disabled={disabledFields && disabledFields.includes('price')
                  ? true : false}
                placeholder="Cena jednostkowa"
                name="price"
                type="number"
                min="1"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}/>
            </Col>
          </Form.Row>}
          {fields.includes('measureUnit') && <Form.Row>
            <Col>
              <Form.Control
                // defaultValue={props.defaultValues && props.defaultValues.measureUnit}
                value={measureUnit}
                disabled={disabledFields && disabledFields.includes('measureUnit')
                  ? true : false}
                placeholder="Jednostka miary"
                name="measureUnit"
                onChange={(e) => {
                  setMeasureUnit(e.target.value);
                }}/>
            </Col>
          </Form.Row>}
          {fields.includes('amount') && <Form.Row>
            <Col>
              <Form.Control
                // defaultValue={props.defaultValues && props.defaultValues.amount}
                value={amount}
                disabled={disabledFields && disabledFields.includes('amount')
                  ? true : false}
                placeholder="Ilość"
                name="amount"
                type="number"
                min="1"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}/>
            </Col>
          </Form.Row>}
          {props.mode === 'stock' && <Form.Row>
            <Button onClick={() => { setSearchByNameFormVisibility(!isSearchByNameFormVisible) }}>Szukaj produktu po nazwie</Button>
          </Form.Row>}
          {isSearchByNameFormVisible && <>
            <Form.Row>
              <Col>
                <Form.Control
                  placeholder="Nazwa produktu"
                  name="searchName"
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                    if (props.mode === 'stock')
                      findProductWithName(e.target.value);
                  }}/>
              </Col>
              </Form.Row>
              <Form.Row>
              <ul>
                {searchResults.map((result, key) => (
                  <li key={key}>
                    {result.Name} - {result.Code}
                    <Button
                      onClick={() => {
                        // apply results
                        setName(result.Name);
                        setCode(result.Code);
                        // clear search results
                        setSearchName('');
                        setSearchResults([]);
                        // hide search form
                        setSearchByNameFormVisibility(false);
                      }}
                    >
                      Wybierz
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Row>
          </>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { props.onHide(); }}>
          Zamknij
        </Button>
        <Button onClick={(e) => {
            e.preventDefault();
            props.buttons.onClick(data);
            props.onHide();
          }}>{props.buttons.title}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductWizard;
