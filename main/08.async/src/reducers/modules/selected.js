import * as ActionTypes from '../../constants/ActionTypes'

const initial = 'facebook'

const selected = (state = initial, action) => {
  switch (action.type) {
    case ActionTypes.SELECT:
      return action.theme

    default:
      return state
  }
}

export default selected