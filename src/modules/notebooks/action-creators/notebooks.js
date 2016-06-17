import ACTION_TYPES from '../action-types';
import * as notebookApi from '../apis/notebooks';

export function fetchNotebooks() {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.FETCH_NOTEBOOKS });
    return notebookApi.fetchNotebooks().then(res => {
      console.log(res);
    });
  };
}
