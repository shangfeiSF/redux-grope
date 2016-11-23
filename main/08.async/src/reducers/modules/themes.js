import * as ActionTypes from '../../constants/ActionTypes'
import Themes from '../../constants/Themes'

const initial = Themes.length ? Themes : ['facebook']

const themes = (state = initial, action) => {
  switch (action.type) {
    case ActionTypes.ADD:
      if (action.theme.length) {
        return [...state, action.theme]
      } else {
        return state
      }

    default:
      return state
  }
}

export default themes