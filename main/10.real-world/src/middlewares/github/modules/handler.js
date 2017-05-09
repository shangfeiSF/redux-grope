import actionSpec from '../sybmols/actionSpec'

import verifySpec from '../utils/verifySpec'
import resolveAction from '../utils/resolveAction'
import request from '../utils/request'

export default (store, next, action) => {
  const spec = action[actionSpec]

  verifySpec(spec)

  const {schema} = spec
  const [REQUEST, SUCCESS, FAILURE] = spec.types
  const route = typeof spec.route === 'function' ? spec.route(store.getState()) : spec.route

  // resolve load-action to three actions: request-action, success-action or failure-action
  // request-action
  const requestAction = resolveAction(action, {
    type: REQUEST
  })
  next(requestAction)

  return request(route, schema)
    .then(
      response => {
        // success-action
        const successAction = resolveAction(action, {
          type: SUCCESS,
          response
        })
        next(successAction)

        return response
      },
      error => {
        // failure-action
        const failureAction = resolveAction(action, {
          type: FAILURE,
          error: error.message || 'Something bad happened'
        })
        next(failureAction)

        return error
      }
    )
}