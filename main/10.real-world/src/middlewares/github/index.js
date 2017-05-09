import handler from './modules/handler'
import actionSpec from './sybmols/actionSpec'

export default store => next => action => {
  return typeof action[actionSpec] === 'undefined' ?
    next(action) :
    handler(store, next, action).then(result => {
      // console.info(result)
    })
}