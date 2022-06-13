import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ToastWrapper from './ToastWrapper';
import HomeView from '../views/HomeView';
import ProductsListView from '../views/ProductsListView';
import StockView from '../views/StockView';
import {
  setBackendHealth,
  addToast,
} from '../actions';
import { makeAPIRequest } from '../helpers/requests.js';
import '../stylesheets/App.css';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setCurrentView } from '../features/app/appSlice';
import { fetchProducts } from '../features/products/productSlice';
import { fetchStock } from '../features/stock/stockSlice';

export default function App() {
  // const backendHealth = useSelector(state => state.app.health);
  //
  // const products = useSelector(state => state.products.products);
  // const stock = useSelector(state => state.stock.products);

  const dispatch = useAppDispatch();
  const currentView = useAppSelector(state => state.app.currentView);
  const [viewComponent, setViewComponent] = useState(null);

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
    dispatch(fetchProducts());
    dispatch(fetchStock());
  }, []);

  // useEffect(() => {
  //   if (backendHealth === true && !products && !stock) {
  //     console.log('[XXXX] server is up, but redux state is empty. fetching!');
  //     dispatch(fetchStock());
  //     dispatch(fetchProducts());
  //   }
  //
  //   if (backendHealth === false) {
  //     const toast = {
  //       id: Date.now(),
  //       title: 'Bład połączenia',
  //       message: 'Połączenie z backendem nie zostało nawiązane!',
  //       isVisible: true,
  //     };
  //     dispatch(addToast(toast));
  //   }
  // }, [backendHealth]);

  useEffect(() => {
    switch(currentView) {
      case 'ProductsList':
        setViewComponent(<ProductsListView />);
        break;
      case 'Stock':
        setViewComponent(<StockView />)
        break;
      case 'Home':
        setViewComponent(<HomeView />)
        break;
      default:
        setViewComponent(<HomeView />)
        break;
    }
  }, [currentView]); // eslint-disable-line

  return (
    <>
      {/*<ToastWrapper />*/}
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
