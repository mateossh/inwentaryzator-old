import React from 'react';

import { Product } from '../features/products/productSlice';
import { StockProduct } from '../features/stock/stockSlice';

import { formatPrice } from '../helpers/utils';
import '../stylesheets/ProductsList.css';

type SomethingSomething = Product & StockProduct;

type ListType = 'compact' | 'full';

type Variant = 'light' | 'danger';

interface ProductsListButton {
  title: string
  onClick: Function
  variant: Variant
}

interface Props {
  children: React.ReactNode
  data: SomethingSomething[]
  type: ListType
  buttons: ProductsListButton[]
};

export default function ProductsList({ data, type, buttons }: Props) {
  const buttonClasses = `m-1 py-1 px-2 text-xs shadow-sm rounded-lg border border-gray-800`;
  const buttonDangerClasses = 'text-white bg-red-600 hover:bg-red-700 border-red-700';
  const buttonLightClasses = 'hover:bg-gray-100 border-gray-100';
  
  return (
    <table className="w-full table-fixed border-collapse border border-gray-900">
      <thead className="ProductsList__head">
        <tr>
          <th className="w-1/12 table-cell text-xs">Kod</th>
          <th className="w-1/2 table-cell text-xs">Nazwa</th>

          { type?.includes('full')
            ? <th className="w-1/12 table-cell text-xs">Ilość</th>
            : null }

          <th className="w-1/12 table-cell text-xs">J.m.</th>
          <th className="w-1/12 p-0 table-cell text-xs">Cena zł</th>

          { type?.includes('full')
            ? <th className="w-1/12 p-0 table-cell text-xs ">Wartość zł</th>
            : null }

          {/* type?.full ? <th className="table-cell text-xs">Uwagi</th> : undefined */}

          { buttons
            ? <th className="w-2/12 table-cell text-xs">Akcje</th>
            : null }
        </tr>
      </thead>

      <tbody className="ProductsName__tabledata">
        {data?.map((item: SomethingSomething) => (
          <tr key={item.code}>
            <td className="table-cell">{item.code}</td>
            <td className="table-cell">{item.name}</td>

            { type?.includes('full')
              ? <td className="table-cell text-right">{item.amount}</td>
              : null }

            <td className="table-cell">{item.measureUnit}</td>
            <td className="table-cell text-right">{formatPrice(item.price)}</td>

            { type?.includes('full')
              ? <td className="table-cell text-right">{formatPrice(item.totalValue)}</td>
              : null }

            {/* type?.full ? <td className="table-cell">{item.Comments}</td> : null */}

            {buttons
              ? <td className="table-cell">
                  {buttons.map((action: ProductsListButton, id: number) =>
                    <button
                      className={
                        `${buttonClasses}
                        ${action.variant === 'danger' ? buttonDangerClasses : ''}
                        ${action.variant === 'light' ? buttonLightClasses : ''}`
                      }
                      key={id}
                      onClick={() => action.onClick(item.code)}
                    >
                      {action.title}
                    </button>
                  )}
                </td>
              : null}
          </tr>
        ))}

        {data?.length === 0 && <tr key="1">
          <td className="table-cell" colSpan={8}>
            Brak danych do wyświetlenia
          </td>
        </tr>}
      </tbody>
    </table>
  );
};
