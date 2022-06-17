import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
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
    <div>
      <h2>Filtruj liste produktów</h2>
      <p>Znajdź produkt po nazwie LUB kodzie produktu</p>

      <div>
        <input
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Nazwa"
        />
        <input
          min="1"
          name="code"
          onChange={(e) => {
            setCode(e.target.value);
          }}
          placeholder="Kod produktu"
          type="number"
        />
      </div>
    </div>
  );
}

export default FilterListForm;
