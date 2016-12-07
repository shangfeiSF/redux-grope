import {SPEC} from '../middleware/symbol'
import requestGithub from './modules/requestGithub'

export default store => next => action => {
  return typeof  action[SPEC] === 'undefined' ?
    next(action) :
    requestGithub(store, next, action)
}