import * as ActionTypes from '../../constants/ActionTypes'

const initial = null

const errorMessage = (state = initial, action) => {
  const {type, error} = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return initial
  }
  else if (error) {
    return action.error
  }

  return state
}

export default errorMessage