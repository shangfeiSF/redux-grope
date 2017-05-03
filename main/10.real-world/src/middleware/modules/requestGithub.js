import {SPEC} from '../symbol'
import * as UTILS from './utils'

export default (store, next, action) => {
  UTILS.verifyActionSpec(action[SPEC])

  const actionSpec = action[SPEC]

  const {schema} = actionSpec
  const [REQUEST, SUCCESS, FAILURE] = actionSpec.types

  const route = typeof actionSpec.route === 'function' ? actionSpec.route(store.getState()) : actionSpec.route

  // resolve load-action to three actions: request-action, success-action or failure-action
  // request-action
  const requestAction = UTILS.resolveAction(action, {
    type: REQUEST
  })
  next(requestAction)

  return UTILS.request(route, schema)
    .then(
      response => {
        // success-action
        const successAction = UTILS.resolveAction(action, {
          type: SUCCESS,
          response
        })
        next(successAction)
      },
      error => {
        // failure-action
        const failureAction = UTILS.resolveAction(action, {
          type: FAILURE,
          error: error.message || 'Something bad happened'
        })
        next(failureAction)
      }
    )
}