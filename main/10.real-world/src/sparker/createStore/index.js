module.exports =
  process.env.NODE_ENV === 'development' ?
    require('./env/dev') :
    require('./env/pro')