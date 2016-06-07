import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
//import { whyDidYouUpdate } from 'why-did-you-update';
//whyDidYouUpdate(React);
// for dev
//import ReactPerf from 'react-addons-perf';
//window && (window.ReactPerf = ReactPerf);

import reducer from './core/reducer';
import createStore from './core/create-store';
import createRoutes from './core/create-routes';
import './app.entry.scss';

const initialState = window && window.__INITIAL_STATE__;
const store = createStore(reducer, initialState);
const routes = createRoutes(store);

ReactDom.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
  ,document.querySelector('#app-root')
);

window.store = store;
