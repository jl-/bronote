import NOTEBOOK_ACTION_TYPES from 'modules/notebooks/action-types';

const initState = {
  notebookId: JSON.parse(localStorage.getItem('notebookId')),
  chapterId: JSON.parse(localStorage.getItem('chapterId')),
  pageId: JSON.parse(localStorage.getItem('pageId')),
  chapters: [],
  pages: []
};

function createNotebookOk(state, { notebook, chapter, page }) {
  const notebookId = notebook.id;
  const chapterId = chapter.id;
  const pageId = page.id;
  const chapters = [chapterId];
  const pages = [pageId];
  return { notebookId, chapterId, pageId, chapters, pages };
}
function createChapterOk(state, { chapter, page }) {
  const chapterId = chapter.id;
  const pageId = page.id;
  const chapters = state.chapters.concat(chapterId);
  const pages = [pageId];
  return { ...state, chapterId, pageId, chapters, pages };
}
function createPageOk(state, page) {
  const pageId = page.id;
  const pages = state.pages.concat(pageId);
  return { ...state, pageId, pages };
}
function fetchNotebookOk(state, { notebook, chapters: chaptersList }) {
  const notebookId = notebook.id;
  const chapters = chaptersList.map(chapter => chapter.id);
  const chapterId = chapters[0];
  return { ...state, notebookId, chapterId, chapters };
}
function fetchChapterOk(state, { chapter, pages: pagesList }) {
  const pages = pagesList.map(page => page.id);
  const chapterId = chapter.id;
  const pageId = pages[0];
  return { ...state, chapterId, pageId, pages };
}
function fetchPageOk(state, page) {
  const pageId = page.id;
  return { ...state, pageId };
}

const handlersHolder = {
  [NOTEBOOK_ACTION_TYPES.CREATE_NOTEBOOK_OK]: createNotebookOk,
  [NOTEBOOK_ACTION_TYPES.CREATE_CHAPTER_OK]: createChapterOk,
  [NOTEBOOK_ACTION_TYPES.CREATE_PAGE_OK]: createPageOk,
  [NOTEBOOK_ACTION_TYPES.FETCH_NOTEBOOK_OK]: fetchNotebookOk,
  [NOTEBOOK_ACTION_TYPES.FETCH_CHAPTER_OK]: fetchChapterOk,
  [NOTEBOOK_ACTION_TYPES.FETCH_PAGE_OK]: fetchPageOk,
};

function workspace(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default workspace;
