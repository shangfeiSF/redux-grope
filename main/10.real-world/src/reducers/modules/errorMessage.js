import * as ActionTypes from '../../constants/ActionTypes'

import {errorMessageInitialState} from '../../models'

const errorMessage = (state = errorMessageInitialState, action) => {
  const {type, error} = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return errorMessageInitialState
  }
  else if (error) {
    return state.merge({
      spec: error
    })
  }

  return state
}

export default errorMessage