let uid = 0;

export default (prefix) => typeof prefix === 'string' ? prefix + (uid++) : uid++;
