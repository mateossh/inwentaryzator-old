import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

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
  const [name, setName] = useState(defaultValues?.name);
  const [code, setCode] = useState(defaultValues?.code);
  const [price, setPrice] = useState(defaultValues?.price);
  const [measureUnit, setMeasureUnit] = useState(defaultValues?.measureUnit);
  const [amount, setAmount] = useState(defaultValues?.amount);
  const products = useSelector(state => state.products.products);
  const data = { name, code, price, measureUnit, amount };
  const [isSearchByNameFormVisible, setSearchByNameFormVisibility] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [isErrorOccured, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.includes('name') && <Form.Group>
            <Col>
              <Form.Label>Nazwa</Form.Label>
              <Form.Control
                disabled={disabledFields?.includes('name')}
                placeholder="Nazwa"
                name="name"
                // defaultValue={defaultValues && defaultValues.name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}/>
            </Col>
          </Form.Group>}
          {fields.includes('code') && <Form.Group>
            <Col>
              <Form.Label>Kod Produktu</Form.Label>
              <Form.Control
                placeholder="Kod produktu"
                // defaultValue={props.defaultValues && props.defaultValues.code}
                value={code}
                disabled={disabledFields?.includes('code')}
                name="code"
                type="number"
                min="1"
                onChange={(e) => {
                  setCode(e.target.value);
                  if (props.mode === 'stock')
                    findProductNameWithCode(e.target.value);
                }}/>
            </Col>
          </Form.Group>}
          {fields.includes('price') && <Form.Group>
            <Col>
              <Form.Label>Cena jednostkowa</Form.Label>
              <Form.Control
                // defaultValue={props.defaultValues && props.defaultValues.price}
                value={price}
                disabled={disabledFields?.includes('price')}
                placeholder="Cena jednostkowa"
                name="price"
                type="number"
                min="1"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}/>
            </Col>
          </Form.Group>}
          {fields.includes('measureUnit') && <Form.Group>
            <Col>
              <Form.Label>Jednostka miary</Form.Label>
              <Form.Control
                // defaultValue={props.defaultValues && props.defaultValues.measureUnit}
                value={measureUnit}
                disabled={disabledFields?.includes('measureUnit')}
                placeholder="Jednostka miary"
                name="measureUnit"
                onChange={(e) => {
                  setMeasureUnit(e.target.value);
                }}/>
            </Col>
          </Form.Group>}
          {fields.includes('amount') && <Form.Group>
            <Col>
              <Form.Label>Ilość</Form.Label>
              <Form.Control
                // defaultValue={props.defaultValues && props.defaultValues.amount}
                value={amount}
                disabled={disabledFields?.includes('amount')}
                placeholder="Ilość"
                name="amount"
                type="number"
                min="1"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}/>
            </Col>
          </Form.Group>}
          {isErrorOccured && <Form.Group>
            <Form.Label>Error! {errorMessage}</Form.Label>
          </Form.Group>}
          {props.mode === 'stock' && <Form.Group>
            <Button
              onClick={() => {
                setSearchByNameFormVisibility(!isSearchByNameFormVisible)
              }}
            >
              Szukaj produktu po nazwie
            </Button>
          </Form.Group>}
          {isSearchByNameFormVisible && <>
            <Form.Group>
              <Col>
                <Form.Label>Nazwa produktu</Form.Label>
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
              </Form.Group>
              <Form.Group>
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
            </Form.Group>
          </>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { props.onHide(); }}>
          Zamknij
        </Button>
        <Button onClick={async (e) => {
            e.preventDefault();
            console.log(`ProductWizard: onClick data ${JSON.stringify(data)}`);

            const res = props.buttons.onClick(data);

            if (res.status === 200 || res.status === 201) {
              setErrorMessage('');
              setErrorState(false);
              props.onHide();
            }

            if (res.status === 400) {
              setErrorState(true);
              setErrorMessage(errorDetails.errors[0].message);
              console.error('ERROR OCCURED', errorDetails);
            }
          }}>{props.buttons.title}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductWizard;
