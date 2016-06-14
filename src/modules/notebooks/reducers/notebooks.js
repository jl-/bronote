import ACTION_TYPES from '../action-types';
import STATUS from '../status';

const initState = {
  list: [],
  editing: null,
};

function createNotebook(state, notebook) {
  return { ...state };
}
function editNotebook(state, notebook) {
  return { ...state };
}

const handlersHolder = {
  [ACTION_TYPES.CREATE_NOTEBOOK]: createNotebook,
  [ACTION_TYPES.EDIT_NOTEBOOK]: editNotebook,
};

function notebooks(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default notebooks;
