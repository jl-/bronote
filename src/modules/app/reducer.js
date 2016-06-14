import NOTEBOOKS_ACTION_TYPES from '../notebooks/action-types';

const initState = {
  notebookEditorShown: false,
};

function showNotebookEditor(state) {
  return { ...state, notebookEditorShown: true };
}
function hideNotebookEditor(state) {
  return { ...state, notebookEditorShown: false };
}

const handlersHolder = {
  [NOTEBOOKS_ACTION_TYPES.SHOW_NOTEBOOK_EDITOR]: showNotebookEditor,
  [NOTEBOOKS_ACTION_TYPES.HIDE_NOTEBOOK_EDITOR]: hideNotebookEditor,
};

function app(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default app;
