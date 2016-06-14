/* eslint global-require: 0 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./create-store.prod');
} else {
  module.exports = require('./create-store.dev');
}
