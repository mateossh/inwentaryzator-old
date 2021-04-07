import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import ToastWrapper from './ToastWrapper';
import HomeView from '../views/HomeView';
import ProductsListView from '../views/ProductsListView';
import StockView from '../views/StockView';
import {
  fetchProducts,
  fetchStock,
  setViewComponent,
  setCurrentView,
} from '../actions';
import '../stylesheets/App.css';

export default function App() {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.app.view);
  const viewComponent = useSelector(state => state.app.component);

  dispatch(fetchProducts());
  dispatch(fetchStock());

  useEffect(() => {
    switch(currentView) {
      case 'ProductsList':
        dispatch(setViewComponent(<ProductsListView />));
        break;
      case 'Stock':
        dispatch(setViewComponent(<StockView />));
        break;
      case 'Home':
        dispatch(setViewComponent(<HomeView />));
        break;
      default:
        dispatch(setViewComponent(<HomeView />));
        break;
    }
  }, [currentView]); // eslint-disable-line

  return (
    <>
      <ToastWrapper />
      <Container>
        <Navbar bg="light">
          <Navbar.Brand
            onClick={() => dispatch(setCurrentView('Home'))}
          >
            Inwentaryzator
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Item className="mx-1">
              <Button
                variant="primary"
                onClick={() => dispatch(setCurrentView('ProductsList'))}
              >
                Lista produktów w bazie
              </Button>
            </Nav.Item>
            <Nav.Item className="mx-1">
              <Button
                variant="primary"
                onClick={() => dispatch(setCurrentView('Stock'))}
              >
                Przeglądaj obecną inwentaryzację
              </Button>
          </Nav.Item>
        </Nav>
        </Navbar>
        <Container>
          {viewComponent}
        </Container>
        <footer>
          Made by Mateusz Żochowski
        </footer>
      </Container>
    </>
  );
}
