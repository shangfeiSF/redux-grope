import * as ActionTypes from '../../constants/ActionTypes'

const initial = {
  contexts: [],
  lastUpdated: '',
  isFetching: false,
  refresh: false
}

const UTILS = {
  _parse: (state = initial, action) => {
    switch (action.type) {
      case ActionTypes.REQUEST:
        return {
          ...state,
          isFetching: true,
          refresh: false
        }

      case ActionTypes.RECEIVE:
        return {
          ...state,
          contexts: action.contexts,
          lastUpdated: action.lastUpdated,
          isFetching: false,
          refresh: false
        }

      case ActionTypes.REFRESH:
        return {
          ...state,
          refresh: true
        }

      default:
        return state
    }
  }
}

const details = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST:
    case ActionTypes.RECEIVE:
    case ActionTypes.REFRESH:
      return {
        ...state,
        [action.theme]: UTILS._parse(state[action.theme], action)
      }

    default:
      return state
  }
}

export default details