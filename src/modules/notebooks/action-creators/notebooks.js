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

function createNotebook(notebook) {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.CREATE_NOTEBOOK });
    return notebookApi.createNotebook(notebook).then(res => {
      dispatch({ type: ACTION_TYPES.CREATE_NOTEBOOK_OK, payload: res });
    }, error => {
      throw error;
    });
  };
}

function updateNotebook(notebook) {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.UPDATE_NOTEBOOK });
    return notebookApi.updateNotebook(notebook).then(res => {
      dispatch({ type: ACTION_TYPES.UPDATE_NOTEBOOK_OK, payload: res });
    }, error => {
      throw error;
    });
  };
}

export function submitNotebook(notebook) {
  const isNewCreated = !notebook.id;
  const handler = isNewCreated ? createNotebook : updateNotebook;
  return handler(notebook);
}

export function fetchNotebooks() {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.FETCH_NOTEBOOKS });
    return notebookApi.fetchNotebooks().then(res => {
      dispatch({ type: ACTION_TYPES.FETCH_NOTEBOOKS_OK, payload: res });
    });
  };
}
