import NOTEBOOK_ACTION_TYPES from 'modules/notebooks/action-types';
import mergeItemToHolder from 'utils/lib/mergeItemToHolder';

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

const handlersHolder = {
  [NOTEBOOK_ACTION_TYPES.FETCH_NOTEBOOKS_OK]: fetchNotebooksOk,
};

function sources(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default sources;
