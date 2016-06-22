import ACTION_TYPES from '../action-types';
import {
  fetchNotebooks, setNotebook, setPage, setChapter,
} from 'modules/notebooks/action-creators/notebooks';

export function initMain() {
  return async (dispatch, getState) => {
    const { notebookId, chapterId, pageId } = getState().workspace;
    const notebooks = await fetchNotebooks()(dispatch, getState);
    const { notebook, chapters } = notebookId && await setNotebook(notebookId)(dispatch, getState) || {};
    const { chapter, pages } = chapterId && await setChapter(chapterId)(dispatch, getState) || {};
    const page = pageId && await setPage(pageId)(dispatch, getState);
  };
}
