import ACTION_TYPES from '../action-types';
import STATUS from '../status';
import union from 'lodash/union';

const initState = {
  all: [],
  editing: null,
};

function createNotebook(state, notebook) {
  return { ...state };
}
function editNotebook(state, notebook) {
  return { ...state };
}
function fetchNotebooksOk(state, res) {
  if (!Array.isArray(res) || res.length === 0) return state;
  const all = union(state.all, res.map(item => item.id));
  return { ...state, all };
}

const handlersHolder = {
  [ACTION_TYPES.CREATE_NOTEBOOK]: createNotebook,
  [ACTION_TYPES.EDIT_NOTEBOOK]: editNotebook,

  [ACTION_TYPES.FETCH_NOTEBOOKS_OK]: fetchNotebooksOk,
};

function notebooks(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default notebooks;
