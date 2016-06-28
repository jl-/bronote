import NOTEBOOK_ACTION_TYPES from 'modules/notebooks/action-types';
import mergeItemToHolder from 'utils/lib/mergeItemToHolder';
import omitBy from 'lodash/omitBy';

const initState = {
  notebooks: {},
  chapters: {},
  pages: {}
};

function fetchNotebooksOk(state, res) {
  if (!Array.isArray(res) || res.length === 0) return state;
  const notebooks = { ...state.notebooks };
  res.forEach(notebook => {
    mergeItemToHolder(notebooks, notebook.id, notebook);
  });
  return { ...state, notebooks };
}

function createNotebookOk(state, { notebook, chapter, page }) {
  const notebooks = mergeItemToHolder({ ...state.notebooks }, notebook.id, notebook);
  const chapters = mergeItemToHolder({ ...state.chapters }, chapter.id, chapter);
  const pages = mergeItemToHolder({ ...state.pages }, page.id, page);
  return { ...state, notebooks, chapters, pages };
}
function createChapterOk(state, { chapter, page }) {
  const chapters = mergeItemToHolder({ ...state.chapters }, chapter.id, chapter);
  const pages = mergeItemToHolder({ ...state.pages }, page.id, page);
  return { ...state, chapters, pages };
}
function createPageOk(state, page) {
  const pages = mergeItemToHolder({ ...state.pages }, page.id, page);
  return { ...state, pages };
}
function updateNotebookOk(state, notebook) {
  const notebooks = mergeItemToHolder({ ...state.notebooks }, notebook.id, notebook);
  return { ...state, notebooks };
}
function updateChapterOk(state, chapter) {
  const chapters = mergeItemToHolder({ ...state.chapters }, chapter.id, chapter);
  return { ...state, chapters };
}
function updatePageOk(state, page) {
  const pages = mergeItemToHolder({ ...state.pages }, page.id, page);
  return { ...state, pages };
}

function fetchNotebookOk(state, { notebook, chapters: chaptersList }) {
  const notebooks = mergeItemToHolder({ ...state.notebooks }, notebook.id, notebook);
  const hasChapters = Array.isArray(chaptersList) && chaptersList.length > 0;
  const chapters = hasChapters ? { ...state.chapters } : state.chapters;
  hasChapters && chaptersList.forEach(chapter => {
    mergeItemToHolder(chapters, chapter.id, chapter);
  });

  return { ...state, notebooks, chapters };
}

function fetchChapterOk(state, { chapter, pages: pagesList }) {
  const chapters = mergeItemToHolder({ ...state.chapters }, chapter.id, chapter);
  const hasPages = Array.isArray(pagesList) && pagesList.length > 0;
  const pages = hasPages ? { ...state.pages } : state.pages;
  hasPages && pagesList.forEach(page => {
    mergeItemToHolder(pages, page.id, page);
  });

  return { ...state, chapters, pages };
}

function fetchPageOk(state, page) {
  const pages = mergeItemToHolder({ ...state.pages }, page.id, page);
  return { ...state, pages };
}

function deletePageOk(state, res) {
  const idOfDeleted = res.id;
  const pages = omitBy(state.pages, page => page.id === idOfDeleted);
  return { ...state, pages };
}

const handlersHolder = {
  [NOTEBOOK_ACTION_TYPES.CREATE_NOTEBOOK_OK]: createNotebookOk,
  [NOTEBOOK_ACTION_TYPES.CREATE_CHAPTER_OK]: createChapterOk,
  [NOTEBOOK_ACTION_TYPES.CREATE_PAGE_OK]: createPageOk,
  [NOTEBOOK_ACTION_TYPES.FETCH_NOTEBOOKS_OK]: fetchNotebooksOk,

  [NOTEBOOK_ACTION_TYPES.FETCH_NOTEBOOK_OK]: fetchNotebookOk,
  [NOTEBOOK_ACTION_TYPES.FETCH_CHAPTER_OK]: fetchChapterOk,
  [NOTEBOOK_ACTION_TYPES.FETCH_PAGE_OK]: fetchPageOk,

  [NOTEBOOK_ACTION_TYPES.UPDATE_NOTEBOOK_OK]: updateNotebookOk,
  [NOTEBOOK_ACTION_TYPES.UPDATE_CHAPTER_OK]: updateChapterOk,
  [NOTEBOOK_ACTION_TYPES.UPDATE_PAGE_OK]: updatePageOk,

  [NOTEBOOK_ACTION_TYPES.DELETE_PAGE_OK]: deletePageOk,
};

function sources(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default sources;
