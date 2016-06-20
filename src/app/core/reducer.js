import { combineReducers } from 'redux';
import app from 'modules/app/reducer';
import notebooks from 'modules/notebooks/reducers/notebooks';
import sources from 'modules/sources/reducer';
import workspace from 'modules/workspace/reducer';

const reducer = combineReducers({
  app, notebooks, workspace, sources
});

export default reducer;
