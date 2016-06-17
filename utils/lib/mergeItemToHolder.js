/**
 * merge item to holder,
 * mutates holder
 * @param {object} holder
 * @param {number} id
 * @param {object} item
 * @return {object}
 */
export default function mergeItemToHolder(holder, key, item) {
  if (!(holder && key && item)) return holder;
  const prev = holder[key];
  /* eslint no-param-reassign: 0 */
  holder[key] = prev ? { ...prev, ...item } : item;
  return holder;
}

