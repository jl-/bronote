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

export function createChapter(notebookId) {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.CREATE_CHAPTER });
    return notebookApi.createChapter(notebookId).then(res => {
      dispatch({ type: ACTION_TYPES.CREATE_CHAPTER_OK, payload: res });
      return res;
    });
  };
}

export function fetchNotebooks() {
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.FETCH_NOTEBOOKS });
    const notebooks = await notebookApi.fetchNotebooks();
    dispatch({ type: ACTION_TYPES.FETCH_NOTEBOOKS_OK, payload: notebooks });
    return notebooks;
  };
}
export function fetchNotebook(notebookId) {
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.FETCH_NOTEBOOK });
    const res = await notebookApi.fetchNotebook(notebookId);
    dispatch({ type: ACTION_TYPES.FETCH_NOTEBOOK_OK, payload: res });
    return res;
  };
}
export function fetchChapters(notebookId) {
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.FETCH_CHAPTERS });
    const chapters = await notebookApi.fetchChapters(notebookId);
    dispatch({ type: ACTION_TYPES.FETCH_CHAPTERS_OK, payload: chapters });
    return chapters;
  };
}
export function fetchChapter(chapterId) {
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.FETCH_CHAPTER });
    const res = await notebookApi.fetchChapter(chapterId);
    dispatch({ type: ACTION_TYPES.FETCH_CHAPTER_OK, payload: res });
    return res;
  };
}
export function fetchPage(pageId) {
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.FETCH_PAGE });
    const res = await notebookApi.fetchPage(pageId);
    dispatch({ type: ACTION_TYPES.FETCH_PAGE_OK, payload: res });
    return res;
  };
}
