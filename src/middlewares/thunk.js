import axios from 'axios';

const request = axios;
let tokenInterceptor;

export default ({ dispatch, getState }) => next => action => {
  if (typeof action !== 'function') {
    return next(action);
  }
  if (tokenInterceptor === undefined) {
    tokenInterceptor = request.interceptors.request.use((config) => {
      const { session } = getState();
      const token = session && session.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  return action(dispatch, getState, request);
};

