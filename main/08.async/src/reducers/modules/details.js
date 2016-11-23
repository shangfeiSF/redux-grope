import * as ActionTypes from '../../constants/ActionTypes'

const initial = {
  contexts: [],
  lastUpdated: '',
  isFetching: false,
  isRefresh: false
}

const UTILS = {
  _parse: (themeDetail = initial, action) => {
    switch (action.type) {
      case ActionTypes.REQUEST:
        return {
          ...themeDetail,
          isFetching: true,
          isRefresh: false
        }

      case ActionTypes.RECEIVE:
        return {
          ...themeDetail,
          contexts: action.contexts,
          lastUpdated: action.lastUpdated,
          isFetching: false,
          isRefresh: false
        }

      case ActionTypes.REFRESH:
        return {
          ...themeDetail,
          isRefresh: true
        }

      default:
        return themeDetail
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