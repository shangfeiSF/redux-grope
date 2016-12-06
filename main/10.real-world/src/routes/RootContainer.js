if (process.env.NODE_ENV === 'production') {
  module.exports = require('./env/RootContainer.prod')
} else {
  module.exports = require('./env/RootContainer.dev')
}