import * as Actiontypes from '../../constants/ActionTypes'

const counter = (state = 0, action) => {
  switch (action.type) {
    case Actiontypes.SET:
      return action.payload

    case Actiontypes.INCREASE:
      return state + 1

    case Actiontypes.DECREASE:
      return state - 1

    default:
      return state
  }
}

export default counter