import { combineReducers } from 'redux';
import notebooks from 'modules/notebooks/reducers/notebooks';

const reducer = combineReducers({
  notebooks
});

export default reducer;
