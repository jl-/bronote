/* eslint global-require: 0 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./app.entry.prod');
} else {
  module.exports = require('./app.entry.dev');
}
