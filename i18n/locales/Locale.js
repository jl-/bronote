import resolveVal from '../../utils/lib/resolveVal';
import schema from './schema';

class Locale {
  constructor(data = {}, strict = false) {
    this.data = data;
    this.strict = strict;
  }
  set(path, val) {
    if (typeof val === 'string') {
      this.data[path] = val;
    } else if (typeof val === 'object') {
      // for both Object and Array
      Object.keys(val).forEach(key => this.set(`${path}.${key}`, val[key]));
    }
    return this;
  }
  flatten() {
    this.validate();
    return this.data;
  }
  parse() {
    this.validate();
    const data = this.data;
    const result = {};
    Object.keys(data).forEach(key => resolveVal(result, key, data[key]));
    return result;
  }
  validate() {
    const missings = Locale._schema.filter(key => !(key in this.data));
    if (missings.length > 0) {
      if (this.strict) {
        throw new Error('missing I18n: ' + missings.join(', '));
      } else {
        missings.forEach(key => this.set(key, key));
      }
    }
  }
}

// flattern a object to array
function flatten(res, item, prefix = '') {
  if (!item) return res;
  if (typeof item === 'string') {
    res.push(prefix ? `${prefix}.${item}` : item);
  } else if (item instanceof Array) {
    item.forEach(term => flatten(res, term, prefix));
  } else if (typeof item === 'object') {
    Object.keys(item).forEach(key => {
      flatten(res, item[key], (prefix ? prefix + '.' : '') + key);
    });
  }
  return res;
}

Locale._schema = flatten([], schema);

export default Locale;
