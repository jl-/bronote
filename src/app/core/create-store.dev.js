import { createStore, applyMiddleware, compose } from 'redux';
import thunk from '../../middlewares/thunk';
import DevTools from '../devtools';

const finalCreateStore = compose(
  applyMiddleware(thunk)
  //, typeof window === 'object' && typeof window.devToolsExtension === 'function' ? window.devToolsExtension() : f => f
  , DevTools.instrument()
)(createStore);

export default finalCreateStore;
