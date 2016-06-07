/**
 * @param {array} items
 * @param {function?} shouldEnd
 *
 * @return {function}
 *
 * linkFunc(func1, func2, func3)
 * linkFunc([func1, func2], (lastResult) => shouldEnd)
 */
export default function linkFuncs(items, ...rest) {
  const mayHaveShouldEnd = Array.isArray(items);
  const shouldEnd = mayHaveShouldEnd && typeof rest[0] === 'function' ? rest[0] : false;
  const funcs = (mayHaveShouldEnd ? items : [items].concat(rest)).filter(item => typeof item === 'function');
  return shouldEnd ? withShouldEnd(funcs, shouldEnd) : withoutShouldEnd(funcs);
}
function withShouldEnd(funcs, shouldEnd) {
  const lastIndex = funcs.length - 1;
  return (...params) => {
    let result, index = 0;
    for (; index <= lastIndex; index++) {
      result = funcs[index].apply(null, params);
      if (index === lastIndex || shouldEnd(result)) return result;
    }
  };
}
function withoutShouldEnd(funcs) {
  return (...params) => funcs.reduce((result, func) => func.apply(null, params), params);
}
