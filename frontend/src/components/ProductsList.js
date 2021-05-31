import React from 'react';

import { formatPrice } from '../helpers/utils';
import '../stylesheets/ProductsList.css';

/*
 * NOTE: refactor props.compact and props.full to one prop (mode/type?)
 * props.data => array with data
 * props.compact
 * props.full
 */
export default function StocktakingTable({ ...props }) {
  return (
    <table className="table-fixed border-collapse border border-gray-900">
      <thead className="ProductsList__head">
        <tr>
          <th className="w-1/12 table-cell text-xs">Kod</th>
          <th className="w-1/2 table-cell text-xs">Nazwa</th>
          { props.full ? <th className="table-cell text-xs">Ilość</th> : undefined }
          <th className="w-1/12 table-cell text-xs">J.m.</th>
          <th className="w-1/12 p-0 table-cell text-xs">Cena zł</th>
          { props.full ? <th className="w-1/12 p-0 table-cell text-xs ">Wartość zł</th> : undefined }
          {/* props.full ? <th className="table-cell text-xs">Uwagi</th> : undefined */}
          { "actions" in props ? <th className="w-1/12 table-cell text-xs">Akcje</th> : null }
        </tr>
      </thead>

      <tbody className="ProductsName__tabledata">
        {props.data && props.data.map(item => (
          <tr key={item.Code}>
            <td className="table-cell">{item.Code}</td>
            <td className="table-cell">{item.Name}</td>
            { props.full
              ? <td className="table-cell text-right">{item.Amount}</td>
              : null }
            <td className="table-cell">{item.MeasureUnit}</td>
            <td className="table-cell text-right">{formatPrice(item.Price)}</td>
            { props.full
              ? <td className="table-cell text-right">{formatPrice(item.TotalValue)}</td>
              : null }
            {/* props.full ? <td className="table-cell">{item.Comments}</td> : null */}
            {"actions" in props
              ? <td className="table-cell">
                  {props.actions.map((action, id) =>
                    <button
                      className={
                        `m-1 py-1 px-2 text-sm shadow-sm rounded-lg border border-gray-800
                        ${action.variant === 'danger' ? 'text-white bg-red-600 hover:bg-red-700 border-red-700' : ''}
                        ${action.variant === 'light' ? 'hover:bg-gray-100 border-gray-100' : ''}`
                      }
                      key={id}
                      onClick={() => action.onClick(item.Code)}
                    >
                      {action.title}
                    </button>)}
                </td>
              : null}
          </tr>
        ))}
        {(!props.data || props.data.length === 0 )
          && <tr key="1"><td className="table-cell" colSpan="8">Brak danych do wyświetlenia</td></tr>}
      </tbody>
    </table>
  );
};
