import ACTION_TYPES from '../action-types';
import STATUS from '../status';

const initState = {
};

const handlersHolder = {
};

function folder(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default folder;
