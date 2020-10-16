import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Button,
  Navbar,
} from 'react-bootstrap';
import HomeView from '../views/HomeView';
import ProductsListView from '../views/ProductsListView';
import StockView from '../views/StockView';
import { fetchProducts, fetchStock } from '../actions';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.app.view);
  const viewComponent = useSelector(state => state.app.component);

  dispatch(fetchProducts());
  dispatch(fetchStock());

  useEffect(() => {
    switch(currentView) {
      case 'ProductsList':
        dispatch({
          type: 'SET_VIEW_COMPONENT',
          component: <ProductsListView />
        });
        break;
      case 'Stock':
        dispatch({
          type: 'SET_VIEW_COMPONENT',
          component: <StockView />
        });
        break;
      case 'Home':
        dispatch({
          type: 'SET_VIEW_COMPONENT',
          component: <HomeView />
        });
        break;
      default:
        dispatch({
          type: 'SET_VIEW_COMPONENT',
          component: <HomeView />
        });
        break;
    }
  }, [currentView]);

  return (
    <Container>
      <Navbar bg="light">
        <Navbar.Brand
          onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', view: 'Home' })}
        >
          Inwentaryzator
        </Navbar.Brand>
        <Button
          variant="primary"
          onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', view: 'ProductsList' })}
        >
          Lista produktów w bazie
        </Button>
        <Button
          variant="primary"
          onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', view: 'Stock' })}
        >
          Przeglądaj obecną inwentaryzację
        </Button>
      </Navbar>
      <Container>
        {viewComponent}
      </Container>
      <footer>
        Made by Mateusz Żochowski
      </footer>
    </Container>
  );
}
