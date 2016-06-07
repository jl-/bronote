import { combineReducers } from 'redux';
import sources from '../../modules/sources/reducer';
import folders from '../../modules/folders/reducer';

const reducer = combineReducers({
  sources, folders
});

export default reducer;
