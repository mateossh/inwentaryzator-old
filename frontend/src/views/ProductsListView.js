import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col,
  Button,
  Form,
} from 'react-bootstrap';
import ProductsList from '../components/ProductsList';
import AddProductWizard from '../components/AddProductWizard';
import EditProductWizard from '../components/EditProductWizard';
import FilterListForm from '../components/FilterListForm';
import { initEditProduct, deleteProduct } from '../helpers/dbActions';
import { fetchProducts, setAddFormVisibility } from '../actions';

export const ProductsListView = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const isAddFormVisible = useSelector(state => state.app.addFormVisibility);
  const isEditFormVisible = useSelector(state => state.app.editFormVisibility);

  const [isFilterFormVisible, setFilterFormVisibility] = useState(false);

  // NOTE: isn't this blocking rendering app ???
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productsListActions = [
    {
      title: 'Edytuj',
      onClick: initEditProduct,
      variant: 'light',
    },
    {
      title: 'Usuń',
      onClick: deleteProduct,
      variant: 'danger',
    },
  ];

  return (
    <React.Fragment>
      <Form.Row>
        <Col><h2>Widok listy produktów</h2></Col>
        <Col>
          <Button onClick={() => dispatch(setAddFormVisibility(true))}>
            Dodaj nowy produkt
          </Button>
          <Button onClick={() => setFilterFormVisibility(!isFilterFormVisible)}>
            Filtruj listę
          </Button>
        </Col>
      </Form.Row>
      <ProductsList
        compact
        actions={productsListActions}
        title="Lista produktów w bazie danych"
        data={products} />
      {isAddFormVisible && <AddProductWizard view="products" />}
      {isEditFormVisible && <EditProductWizard view="products" />}
      {isFilterFormVisible && <FilterListForm />}
    </React.Fragment>
  );
}

export default ProductsListView;
