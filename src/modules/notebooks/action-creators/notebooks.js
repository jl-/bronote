import ACTION_TYPES from '../action-types';
import * as notebookApi from '../apis/notebooks';
export function openNotebookEditor(notebookId) {
  if (notebookId === undefined) {
    return { type: ACTION_TYPES.SHOW_NOTEBOOK_EDITOR };
  }
  return (dispatch, getState) => {
  };
}
export function closeNotebookEditor() {
  return { type: ACTION_TYPES.HIDE_NOTEBOOK_EDITOR };
}
export function submitNotebook(notebook) {
  const isNew = !notebook.id;
  const type = ACTION_TYPES[isNew ? 'CREATE_NOTEBOOK' : 'EDIT_NOTEBOOK'];
  return (dispatch, getState) => {
    dispatch({ type, payload: notebook });
    return notebookApi.createNotebook(notebook).then(res => {
      console.log(res);
    });
  };
}
export function fetchNotebooks() {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.FETCH_NOTEBOOKS });
    return notebookApi.fetchNotebooks().then(res => {
      console.log(res);
    });
  };
}