import React, { useEffect, useState } from 'react';

import ToastWrapper from './ToastWrapper';
import HomeView from '../views/HomeView';
import ProductsListView from '../views/ProductsListView';
import StockView from '../views/StockView';
import GeneratePDFView from '../views/GeneratePDF';
import '../stylesheets/App.css';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setCurrentView } from '../features/app/appSlice';
import { fetchProducts } from '../features/products/productSlice';
import { fetchStock } from '../features/stock/stockSlice';
import { createToast } from '../features/toasts/toastSlice';

export default function App() {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector(state => state.app.currentView);
  const [viewComponent, setViewComponent] = useState(null);

  let backendHealth = {};

  const checkHealth = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/healthcheck');
      const json = await response.json();

      backendHealth = json;
    } catch (e) {
      const toast = {
        id: Date.now(),
        title: 'Bład połączenia',
        message: 'Połączenie z backendem nie zostało nawiązane!',
        isVisible: true,
      };

      dispatch(createToast(toast));
    }
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

  useEffect(() => {
    if (backendHealth?.message === 'OK' && !products && !stock) {
      console.log('[XXXX] server is up, but redux state is empty. fetching!');
      dispatch(fetchStock());
      dispatch(fetchProducts());
    }

    if (!backendHealth) {
      const toast = {
        id: Date.now(),
        title: 'Bład połączenia',
        message: 'Połączenie z backendem nie zostało nawiązane!',
        isVisible: true,
      };

      dispatch(createToast(toast));
    }
  }, [backendHealth]);

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
      case 'GeneratePDF':
        setViewComponent(<GeneratePDFView />)
        break;
      default:
        setViewComponent(<HomeView />)
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
            Baza produktów
          </button>
          <button
            className="p-2 hover:underline"
            onClick={() => dispatch(setCurrentView('Stock'))}
          >
            Przeglądaj obecną inwentaryzację
          </button>
          <button
            className="mx-4 p-2 hover:underline"
            onClick={() => dispatch(setCurrentView('GeneratePDF'))}
          >
            Generuj PDF
          </button>
        </nav>
      </div>
      <div className="container">{viewComponent}</div>
    </>
  );
}
