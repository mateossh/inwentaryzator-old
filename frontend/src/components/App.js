import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ToastWrapper from './ToastWrapper';
import HomeView from '../views/HomeView';
import ProductsListView from '../views/ProductsListView';
import StockView from '../views/StockView';
import {
  fetchProducts,
  fetchStock,
  setViewComponent,
  setCurrentView,
  setBackendHealth,
  addToast,
} from '../actions';
import { makeAPIRequest } from '../helpers/requests.js';
import '../stylesheets/App.css';

export default function App() {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.app.view);
  const viewComponent = useSelector(state => state.app.component);
  const backendHealth = useSelector(state => state.app.health);

  const products = useSelector(state => state.products.products);
  const stock = useSelector(state => state.stock.products);

  const checkHealth = () => {
    makeAPIRequest('http://localhost:8080/healthcheck', 'GET')
      .then(res => dispatch(setBackendHealth(res.status)));
  };

  useEffect(() => {
    checkHealth();

    const healthInterval = setInterval(checkHealth, 15000);
    return () => {
      clearInterval(healthInterval);
    }
  }, []);

  useEffect(() => {
    if (backendHealth === true && !products && !stock) {
      console.log('[XXXX] server is up, but redux state is empty. fetching!');
      dispatch(fetchStock());
      dispatch(fetchProducts());
    }

    if (backendHealth === false) {
      const toast = {
        id: Date.now(),
        title: 'Bład połączenia',
        message: 'Połączenie z backendem nie zostało nawiązane!',
        isVisible: true,
      };
      dispatch(addToast(toast));
    }
  }, [backendHealth]);

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
      <div className="container mx-auto mb-2 py-2 bg-gray-50 flex flex-row justify-between content-center">
        <h1
          className="m-0 text-2xl hover:underline"
          onClick={() => dispatch(setCurrentView('Home'))}
        >
          Inwentaryzator
        </h1>

        <nav>
          <button
            className="mx-4 p-2 hover:underline"
            onClick={() => dispatch(setCurrentView('ProductsList'))}
          >
            Lista produktów w bazie
          </button>
          <button
            className="p-2 hover:underline"
            onClick={() => dispatch(setCurrentView('Stock'))}
          >
            Przeglądaj obecną inwentaryzację
          </button>
        </nav>
      </div>
      <div className="container">{viewComponent}</div>
    </>
  );
}
