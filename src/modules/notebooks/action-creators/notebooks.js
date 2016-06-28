import ACTION_TYPES from '../action-types';
import * as notebookApi from '../apis/notebooks';
import {
  rememberNotebookChapter,
  rememberChapterPage,
  recallNotebookChapter,
  recallChapterPage,
  clearNotebookChapter,
  clearChapterPage,
  syncWorkspace,
} from 'modules/helpers/sync-workspace';
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
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.CREATE_NOTEBOOK });
    const res = await notebookApi.createNotebook(notebook);
    syncWorkspace({
      notebookId: res.notebook.id,
      chapterId: res.chapter.id,
      pageId: res.page.id
    });
    dispatch({ type: ACTION_TYPES.CREATE_NOTEBOOK_OK, payload: res });
    return res;
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
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.CREATE_CHAPTER });
    const res = await notebookApi.createChapter(notebookId);
    syncWorkspace({
      chapterId: res.chapter.id,
      pageId: res.page.id
    });
    dispatch({ type: ACTION_TYPES.CREATE_CHAPTER_OK, payload: res });
    return res;
  };
}
export function createPage(notebookId, chapterId) {
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.CREATE_PAGE });
    const page = await notebookApi.createPage(notebookId, chapterId);
    syncWorkspace({ pageId: page.id });
    rememberChapterPage(chapterId, page.id);
    dispatch({ type: ACTION_TYPES.CREATE_PAGE_OK, payload: page });
    return page;
  };
}
export function updatePage(data) {
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.UPDATE_PAGE });
    const res = await notebookApi.updatePage(data);
    dispatch({ type: ACTION_TYPES.UPDATE_PAGE_OK, payload: res });
    return res;
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

export function setNotebook(notebookId) {
  return async (dispatch, getState) => {
    const { notebook, chapters } = await fetchNotebook(notebookId)(dispatch, getState);
    const chapterId = recallNotebookChapter(notebookId) || (chapters[0] && chapters[0].id);
    const { chapter, pages } = await fetchChapter(chapterId)(dispatch, getState);
    const pageId = recallChapterPage(chapterId) || (pages[0] && pages[0].id);
    const page = await fetchPage(pageId)(dispatch, getState);
    syncWorkspace({ notebookId, chapterId, pageId });
    return { notebook, chapters, chapter, pages, page };
  };
}
export function setChapter(chapterId) {
  return async (dispatch, getState) => {
    const { chapter, pages } = await fetchChapter(chapterId)(dispatch, getState);
    const pageId = recallChapterPage(chapterId) || (pages[0] && pages[0].id);
    const page = await fetchPage(pageId)(dispatch, getState);
    syncWorkspace({ chapterId, pageId });
    rememberNotebookChapter(chapter.notebookId, chapterId);
    return { chapter, pages, page };
  };
}
export function setPage(pageId) {
  return async (dispatch, getState) => {
    const page = await fetchPage(pageId)(dispatch, getState);
    syncWorkspace({ pageId });
    rememberChapterPage(page.chapterId, pageId);
    return page;
  };
}

export function deletePage(pageId) {
  return async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.DELETE_PAGE });
    const page = await notebookApi.deletePage(pageId);
    const res = page && page.id ? page : { id: pageId };
    clearChapterPage(getState().workspace.chapterId);
    dispatch({ type: ACTION_TYPES.DELETE_PAGE_OK, payload: res });
    return res;
  };
}

