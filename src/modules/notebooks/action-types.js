import uid from 'utils/lib/uid';
import ktv from 'utils/lib/ktv';

const ACTIONS = [
  'SHOW_NOTEBOOK_EDITOR',
  'HIDE_NOTEBOOK_EDITOR',

  'CREATE_NOTEBOOK',
  'CREATE_NOTEBOOK_OK',
  'CREATE_NOTEBOOK_FAILED',

  'CREATE_CHAPTER',
  'CREATE_CHAPTER_OK',
  'CREATE_CHAPTER_FAILED',

  'UPDATE_NOTEBOOK',
  'UPDATE_NOTEBOOK_OK',
  'UPDATE_NOTEBOOK_FAILED',

  'FETCH_NOTEBOOKS',
  'FETCH_NOTEBOOKS_OK',
  'FETCH_NOTEBOOKS_FAILED',

  'FETCH_NOTEBOOK',
  'FETCH_NOTEBOOK_OK',
  'FETCH_NOTEBOOK_FAILED',

  'FETCH_CHAPTERS',
  'FETCH_CHAPTERS_OK',
  'FETCH_CHAPTERS_FAILED',

  'FETCH_CHAPTER',
  'FETCH_CHAPTER_OK',
  'FETCH_CHAPTER_FAILED',

  'FETCH_PAGE',
  'FETCH_PAGE_OK',
  'FETCH_PAGE_FAILED',

];

export default ktv(ACTIONS, uid);
