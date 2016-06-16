import NOTEBOOK_ACTION_TYPES from 'modules/notebooks/action-types';

const initState = {
  notebooks: {},
  chapters: {},
  pages: {}
};

const handlersHolder = {
};

function sources(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default sources;
