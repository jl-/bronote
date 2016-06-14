import { combineReducers } from 'redux';
import notebooks from 'modules/notebooks/reducers/notebooks';
import notebook from 'modules/notebooks/reducers/notebook';
import app from 'modules/app/reducer';

const reducer = combineReducers({
  app, notebooks, notebook,
});

export default reducer;
