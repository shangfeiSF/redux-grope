import * as ActionTypes from '../../../../../../main/08.async/src/constants/ActionTypes'

export const mockData = {
  selected: 'Facebook',

  contexts: [
    {
      title: "Facebook will also cut off fake news sites from ad money"
    },
    {
      title: "Facebook's Messenger Rooms in Testing, Lets You Chat With Strangers on a Topic"
    },
    {
      title: "Facebook Says It Found More Miscalculated Metrics"
    }
  ],
  lastUpdated: "2016-11-24T02:58:38.507Z"
}

export const mocks = {
  _need: (state, theme) => {
    const detail = state.details[theme]

    let need = false

    if (detail) {
      need = detail.isFetching ? false : detail.isRefresh
    } else {
      need = true
    }

    return need
  },

  _fetch: theme => {
    return {
      type: ActionTypes.RECEIVE,
      theme,
      contexts: mockData.contexts,
      lastUpdated: mockData.lastUpdated
    }
  }
}