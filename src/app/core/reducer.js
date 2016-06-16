import { combineReducers } from 'redux';
import app from 'modules/app/reducer';
import notebooks from 'modules/notebooks/reducers/notebooks';
import notebook from 'modules/notebooks/reducers/notebook';
import sources from 'modules/sources/reducer';
import workspace from 'modules/workspace/reducer';

const reducer = combineReducers({
  app, notebooks, notebook, workspace, sources
});

export default reducer;
