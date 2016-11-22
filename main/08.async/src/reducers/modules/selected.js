import * as ActionTypes from '../../constants/ActionTypes'
import Themes from '../../constants/Themes'

const initial = Themes[0] || 'facebook'

const selected = (state = initial, action) => {
  switch (action.type) {
    case ActionTypes.SELECT:
      return action.theme

    default:
      return state
  }
}

export default selected