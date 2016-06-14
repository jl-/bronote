import uid from 'utils/lib/uid';
import ktv from 'utils/lib/ktv';

const ACTIONS = [
  'SHOW_NOTEBOOK_EDITOR',
  'HIDE_NOTEBOOK_EDITOR',
  'CREATE_NOTEBOOK',
  'EDIT_NOTEBOOK',

  'FETCH_NOTEBOOKS',
  'FETCH_NOTEBOOKS_OK',
  'FETCH_NOTEBOOKS_FAILED'
];

export default ktv(ACTIONS, uid);
