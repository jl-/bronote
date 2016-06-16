const initState = {
  notebookId: null,
  chapterId: null,
  pageId: null
};

const handlersHolder = {
};

function workspace(state = initState, action) {
  const handler = handlersHolder[action.type];
  return typeof handler === 'function' ?
    handler(state, action.payload, action.type) :
    state;
}

export default workspace;
