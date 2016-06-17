import ACTION_TYPES from '../action-types';

const initState = {
};

const handlersHolder = {
};

function notebooks(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default notebooks;
