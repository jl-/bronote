import React from 'react';
// import whyDidYouUpdate from 'why-did-you-update';
// whyDidYouUpdate(React);

import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';

import reducer from './core/reducer';
import createStore from './core/create-store';
import createRoutes from './core/create-routes';
import './app.entry.scss';

import DevTools from './devtools';

import ReactPerf from 'react-addons-perf';
window.ReactPerf = ReactPerf;

const initialState = window && window.__INITIAL_STATE__;
const store = createStore(reducer, initialState);
const routes = createRoutes(store);

ReactDom.render(
  <Provider store={store}>
    <div className='h--full v--full'>
      <Router routes={routes} history={browserHistory} />
      <DevTools />
    </div>
  </Provider>
  , document.querySelector('#app-root')
);
