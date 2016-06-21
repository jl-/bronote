import ACTION_TYPES from '../action-types';
import {
  fetchNotebooks, fetchNotebook, fetchChapter, fetchPage
} from 'modules/notebooks/action-creators/notebooks';

export function initMain() {
  return async (dispatch, getState) => {
    const notebooks = await fetchNotebooks()(dispatch, getState);
    const { notebookId, chapterId, pageId } = getState().workspace;
    const { notebook, chapters } = notebookId && await fetchNotebook(notebookId)(dispatch, getState) || {};
    const { chapter, pages } = chapterId && await fetchChapter(chapterId)(dispatch, getState) || {};
    const page = pageId && await fetchPage(pageId)(dispatch, getState);
  };
}
