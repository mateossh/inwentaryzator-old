import React from 'react';
import {
  Button,
  Table,
} from 'react-bootstrap';
import { formatPrice } from '../helpers/utils';
import './ProductsList.css';

/*
 * NOTE: refactor props.compact and props.full to one prop (mode/type?)
 * props.data => array with data
 * props.compact
 * props.full
 */
export default function StocktakingTable({ ...props }) {
  return (
    <React.Fragment>
      <Table striped bordered hover size="sm">
        <thead className="ProductsList__head">
          <tr>
            <th>Kod</th>
            <th>Nazwa</th>
            { props.full ? <th>Ilość</th> : undefined }
            <th>J.m.</th>
            <th>Cena zł</th>
            { props.full ? <th>Wartość zł</th> : undefined }
            { props.full ? <th>Uwagi</th> : undefined }
            { "actions" in props ? <th>Akcje</th> : null }
          </tr>
        </thead>

        <tbody className="ProductsName__tabledata">
          {props.data && props.data.map(item => (
            <tr key={item.Code}>
              <td className="ProductsList__code">{item.Code}</td>
              <td>{item.Name}</td>
              { props.full
                ? <td className="ProductsList__ultrasmall">{item.Amount}</td>
                : null }
              <td className="ProductsList__ultrasmall">{item.MeasureUnit}</td>
              <td className="ProductsList__price">{formatPrice(item.Price)}</td>
              { props.full
                ? <td className="ProductsList__price">{formatPrice(item.TotalValue)}</td>
                : null }
              { props.full ? <td>{item.Comments}</td> : null }
              {"actions" in props
                ? <td className="ProductsList__actions">
                    {props.actions.map((action, id) =>
                      <Button
                        key={id}
                        onClick={() => action.onClick(item.Code)}
                        size="sm"
                        variant={action.variant}
                      >
                        {action.title}
                      </Button>)}
                  </td>
                : null}
            </tr>
          ))}
          {(!props.data || props.data.length === 0 )
            && <tr key="1"><td colSpan="8">Brak danych do wyświetlenia</td></tr>}
        </tbody>
      </Table>
    </React.Fragment>
  );
};
