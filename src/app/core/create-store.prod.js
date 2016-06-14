import { createStore, applyMiddleware, compose } from 'redux';
import thunk from '../../middlewares/thunk';

const finalCreateStore = compose(
  applyMiddleware(thunk)
  // , typeof window === 'object' && typeof window.devToolsExtension === 'function' ? window.devToolsExtension() : f => f
)(createStore);

export default finalCreateStore;
