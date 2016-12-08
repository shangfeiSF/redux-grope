import union from 'lodash/union'

const inital = {
  ids: [],
  pageCount: 0,
  isFetching: false,
  nextPageUrl: undefined
}

export const update = (state = inital, action) => {
  switch (action.typeIndex) {
    case 0:
      return {
        ...state,
        isFetching: true
      }

    case 1:
      return {
        ...state,
        ids: union(state.ids, action.response.result),
        pageCount: state.pageCount + 1,
        isFetching: false,
        nextPageUrl: action.response.nextPageUrl
      }

    case 2:
      return {
        ...state,
        isFetching: false
      }

    default:
      return state
  }
}