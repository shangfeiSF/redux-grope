if (process.env.NODE_ENV === 'production') {
  module.exports = require('./env/createStore.prod')
} else {
  module.exports = require('./env/createStore.dev')
}