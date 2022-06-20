import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';

import { Product } from '../features/products/productSlice';

type Mode = "stock" | "products";

type FormField = 'name' | 'code' | 'price' | 'measureUnit' | 'amount';

interface DefaultValues {
  name?: string
  code?: string
  price?: number
  measureUnit?: string
  amount?: number
};

interface Props {
  children?: React.ReactNode
  defaultValues?: DefaultValues
  disabledFields?: FormField[]
  fields: FormField[]
  mode: Mode
  buttonTitle: string
  buttonAction: Function
};

export const ProductWizard = ({
  defaultValues,
  disabledFields,
  fields,
  mode,
  buttonTitle,
  buttonAction,
  }: Props) => {
  // NOTE: why price and amount states are '' by default:
  // When default value was 0, number input had no placeholder, but if I set
  // that to '', it has placeholder like every other input in forms
  const [name, setName] = useState(defaultValues?.name);
  const [code, setCode] = useState(defaultValues?.code);
  const [price, setPrice] = useState(defaultValues?.price);
  const [measureUnit, setMeasureUnit] = useState(defaultValues?.measureUnit);
  const [amount, setAmount] = useState(defaultValues?.amount);
  const products = useAppSelector(state => state.products.products);
  const data = { name, code, price, measureUnit, amount };
  const [isSearchByNameFormVisible, setSearchByNameFormVisibility] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const findProductNameWithCode = (code: string) => {
    const results: Product[] = products.filter((product: Product) => product.code === code);
    results.length > 0
      ? setName(results[0].name)
      : setName('')
  }

  useEffect(() => {
    setName(defaultValues?.name);
    setCode(defaultValues?.code);
    setPrice(defaultValues?.price);
    setMeasureUnit(defaultValues?.measureUnit);
    setAmount(defaultValues?.amount);
  }, [defaultValues]);

  const findProductWithName = (searchedPhrase: string) => {
    const results: Product[] = products.filter((product: Product) => product.name.includes(searchedPhrase));
    console.log('findProduct with name', results);
    results.length > 0
      ? setSearchResults(results)
      : setSearchResults([])
  }

  const buttonClasses = 'm-1 py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-800';
  const inputClasses = 'border-solid border-2 disabled:bg-gray-200';

  return (
    <>
      {fields?.includes('name') && <div>
        <label htmlFor="name">Nazwa</label>
        <input
          className={inputClasses}
          disabled={disabledFields?.includes('name')}
          id="name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Nazwa"
          type="text"
          value={name}
        />
      </div>}

      {fields?.includes('code') && <div>
        <label htmlFor="code">Kod Produktu</label>
        <input
          className={inputClasses}
          disabled={disabledFields?.includes('code')}
          id="code"
          name="code"
          onChange={(e) => {
            setCode(e.target.value);
            if (mode === 'stock')
              findProductNameWithCode(e.target.value);
          }}
          placeholder="Kod produktu"
          type="text"
          value={code}
        />
      </div>}

      {fields.includes('price') && <div>
        <label htmlFor="price">Cena jednostkowa</label>
        <input
          className={inputClasses}
          disabled={disabledFields?.includes('price')}
          id="price"
          min="1"
          name="price"
          onChange={(e) => {
            setPrice(parseFloat(e.target.value));
          }}
          placeholder="Cena jednostkowa"
          type="number"
          value={price}
        />
      </div>}

      {fields.includes('measureUnit') && <div>
        <label htmlFor="measureUnit">Jednostka miary</label>
        <input
          className={inputClasses}
          disabled={disabledFields?.includes('measureUnit')}
          id="measureUnit"
          name="measureUnit"
          onChange={(e) => {
            setMeasureUnit(e.target.value);
          }}
          placeholder="Jednostka miary"
          value={measureUnit}
        />
      </div>}

      {fields.includes('amount') && <div>
        <label htmlFor="amount">Ilość</label>
        <input
          className={inputClasses}
          disabled={disabledFields?.includes('amount')}
          id="amount"
          min="1"
          name="amount"
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
          placeholder="Ilość"
          type="number"
          value={amount}
        />
      </div>}

      {mode === 'stock' && <div>
        <button
          className={buttonClasses}
          onClick={() => {
            setSearchByNameFormVisibility(!isSearchByNameFormVisible)
          }}
        >
          Szukaj produktu po nazwie
        </button>
      </div>}

      {isSearchByNameFormVisible && <>
        <div>
          <label htmlFor="searchName">Nazwa produktu</label>
          <input
            className={inputClasses}
            id="searchName"
            name="searchName"
            onChange={(e) => {
              setSearchName(e.target.value);
              if (mode === 'stock')
                findProductWithName(e.target.value);
            }}
            placeholder="Nazwa produktu"
            value={searchName}
          />
        </div>

        <div>
          <ul>
            {searchResults.map((result, key) => (
              <li key={key}>
                {result.name} - {result.code}
                <button
                  className={buttonClasses}
                  onClick={() => {
                    // apply results
                    setName(result.name);
                    setCode(result.code);
                    // clear search results
                    setSearchName('');
                    setSearchResults([]);
                    // hide search form
                    setSearchByNameFormVisibility(false);
                  }}
                >
                  Wybierz
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>}

      <button
        className={buttonClasses}
        onClick={async (e: React.MouseEvent) => {
          e.preventDefault();
          console.log(`ProductWizard: onClick data ${JSON.stringify(data)}`);

          const res = buttonAction(data);

          // if (res.status === 200 || res.status === 201) {
          //   setErrorMessage('');
          //   setErrorState(false);
          //   onHide();
          // }

          // if (res.status === 400) {
          //   setErrorState(true);
          //   setErrorMessage(errorDetails.errors[0].message);
          //   console.error('ERROR OCCURED', errorDetails);
          // }
        }}
      >
        {buttonTitle}
      </button>
    </>
  );
}

export default ProductWizard;
