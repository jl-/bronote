import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from '../app';
import Main from '../main';

export default function({ dispatch, getState }) {
  const routes = (
    <Route path='/' component={App}>
      <Route path='main' component={Main}>
      </Route>
    </Route>
  );
  return routes;
};
