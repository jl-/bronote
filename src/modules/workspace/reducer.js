import NOTEBOOK_ACTION_TYPES from 'modules/notebooks/action-types';

const initState = {
  notebookId: JSON.parse(localStorage.getItem('notebookId')),
  chapterId: JSON.parse(localStorage.getItem('chapterId')),
  pageId: JSON.parse(localStorage.getItem('pageId'))
};

function createNotebookOk(state, res) {
  return {
    notebookId: res.id
  };
}

const handlersHolder = {
  [NOTEBOOK_ACTION_TYPES.CREATE_NOTEBOOK_OK]: createNotebookOk,

};

function workspace(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default workspace;
