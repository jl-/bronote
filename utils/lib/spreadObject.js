export default function spread(object, fields = Object.keys(object)) {
  return fields.reduce((res, field) => {
    const item = object[field];
    if (!item) return res;
    if (Array.isArray(item)) {
      res[field] = [...item];
    } else if (typeof item === 'object') {
      res[field] = {...item};
    }
    return res;
  }, {});
}
