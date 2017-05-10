import handler from './modules/handler'
import actionSpec from './sybmols/actionSpec'

// middleware的函数签名：store => next => action => {}
export default store => next => action => {
  return typeof action[actionSpec] === 'undefined' ?
    next(action) :
    handler(store, next, action).then(result => {
      // console.info(result)
    })
}