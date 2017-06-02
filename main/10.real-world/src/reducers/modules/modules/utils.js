import union from 'lodash/union'
import Immutable from 'immutable'

export const update = (state, action) => {
  switch (action.typeIndex) {
    case 0:
      return state === undefined ? Immutable.Map({
          ids: [],
          pageCount: 0,
          isFetching: true,
          nextPageUrl: undefined
        }) : state

    case 1:
      return state.mergeDeep({
        ids: union(state.toJS()['ids'], action.response.result),
        pageCount: state.getIn(['pageCount']) + 1,
        isFetching: false,
        nextPageUrl: action.response.nextPageUrl
      })

    case 2:
      return state.mergeDeep({
        isFetching: false
      })

    default:
      return state
  }
}