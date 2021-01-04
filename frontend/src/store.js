import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

// NOTE: inspired by
//       https://github.com/odota/web/blob/master/src/store/index.js

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
  )
);
