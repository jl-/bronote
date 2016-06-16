import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';

import reducer from './core/reducer';
import createStore from './core/create-store';
import createRoutes from './core/create-routes';

const initialState = window && window.__INITIAL_STATE__;
const store = createStore(reducer, initialState);
const routes = createRoutes(store);

ReactDom.render(
  <Provider store={store}>
    <div className='h--full v--full'>
      <Router routes={routes} history={browserHistory} />
    </div>
  </Provider>
  , document.querySelector('#app-root')
);
