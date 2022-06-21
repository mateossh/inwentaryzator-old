import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';

import { Product } from '../features/products/productSlice';
import { createToast } from '../features/toasts/toastSlice';

type Mode = "stock" | "products";

type FormField = 'name' | 'code' | 'price' | 'measureUnit' | 'amount';

interface DefaultValues {
  name?: string
  code?: string
  price?: string
  measureUnit?: string
  amount?: string
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
  const [name, setName] = useState<string>(defaultValues?.name ?? '');
  const [code, setCode] = useState<string>(defaultValues?.code ?? '');
  const [price, setPrice] = useState<string>(defaultValues?.price ?? '');
  const [measureUnit, setMeasureUnit] = useState<string>(defaultValues?.measureUnit ?? '');
  const [amount, setAmount] = useState<string>(defaultValues?.amount ?? '');

  const products = useAppSelector(state => state.products.products);
  const dispatch = useAppDispatch();

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
    if (defaultValues?.name) setName(defaultValues?.name);
    if (defaultValues?.code) setCode(defaultValues?.code);
    if (defaultValues?.price) setPrice(defaultValues?.price);
    if (defaultValues?.measureUnit) setMeasureUnit(defaultValues?.measureUnit);
    if (defaultValues?.amount) setAmount(defaultValues?.amount);
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

  const handleButtonClick = async () => {
    // TODO: construct data with only necessary fields

    let toast = null;

    const isFloatRegex = '^\\d*[.,]\\d\\d$';
    const priceDotSeparator = price.replace(',', '.');
    const isPriceInvalid = fields?.includes('price') && !priceDotSeparator.match(isFloatRegex);
    const isAmountInvalid = fields?.includes('amount') && isNaN(parseInt(amount));
    const isCodeInvalid = fields?.includes('code') && isNaN(parseInt(code));

    console.log('priceDotSeparator', priceDotSeparator);
    console.log('isPriceInvalid', isPriceInvalid);

    if (name === '') {
      toast = {
        title: 'Błąd',
        message: 'Pole "nazwa" nie może być puste',
      }
    }

    if (code === '') {
      toast = {
        title: 'Błąd',
        message: 'Pole "kod produktu" nie może być puste',
      }
    }

    if (isCodeInvalid) {
      toast = {
        title: 'Błąd',
        message: 'Niepoprawna wartość w polu "kod produktu"',
      }
    }

    if (isPriceInvalid) {
      toast = {
        title: 'Błąd',
        message: 'Niepoprawna wartość w polu "cena"',
      }
    }

    if (parseFloat(priceDotSeparator) <= 0) {
      toast = {
        title: 'Błąd',
        message: 'Cena nie może być <= 0',
      }
    }

    if (isAmountInvalid) {
      toast = {
        title: 'Błąd',
        message: 'Niepoprawna wartość w polu "ilość"',
      }
    }

    if (parseInt(amount) <= 0) {
      toast = {
        title: 'Błąd',
        message: 'Cena nie może być <= 0',
      }
    }

    if (measureUnit === '') {
      toast = {
        title: 'Błąd',
        message: 'Pole "jednostka miary" nie może być puste',
      }
    }

    if (toast) {
      dispatch(createToast(toast));
      return;
    }

    const data = { name, code, price, measureUnit, amount };
    console.log(`ProductWizard: onClick data ${JSON.stringify(data)}`);

    buttonAction(data);
  }

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
            setPrice(e.target.value);
          }}
          placeholder="Cena jednostkowa"
          type="text"
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
            setAmount(e.target.value);
          }}
          placeholder="Ilość"
          type="text"
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
        onClick={handleButtonClick}
      >
        {buttonTitle}
      </button>
    </>
  );
}

export default ProductWizard;
