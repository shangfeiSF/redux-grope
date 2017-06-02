import union from 'lodash/union'

export const update = (state, action) => {
  switch (action.typeIndex) {
    case 0:
      return state.merge({
        ids: union(state.getIn(['ids']), action.response.result),
        pageCount: state.getIn(['pageCount']) + 1,
        isFetching: false,
        nextPageUrl: action.response.nextPageUrl
      })

    case 1:
      return state.merge({
        isFetching: false
      })

    default:
      return state
  }
}