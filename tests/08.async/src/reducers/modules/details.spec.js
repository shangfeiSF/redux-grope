import details from '../../../../../main/08.async/src/reducers/modules/details'
import * as syncActions from '../../../../../main/08.async/src/actions/syncActions'

describe('details reducers', () => {
  it('should provide the initial state', () => {
    let receivedValue = details(undefined, {})

    let expectedValue = {}

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `REQUEST` action at first', () => {
    const theme = 'facebook'
    const prevState = {}

    const action = syncActions.request(theme)

    let receivedValue = details(prevState, action)

    let expectedValue = {
      [theme]: {
        contexts: [],
        lastUpdated: '',
        isFetching: true,
        isRefresh: false
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `REQUEST` action again', () => {
    const theme = 'facebook'
    const prevState = {
      [theme]: {
        contexts: ['facebook is good'],
        lastUpdated: '',
        isFetching: false,
        isRefresh: false
      }
    }

    const action = syncActions.request(theme)

    let receivedValue = details(prevState, action)

    let expectedValue = {
      [theme]: {
        contexts: ['facebook is good'],
        lastUpdated: '',
        isFetching: true,
        isRefresh: false
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `RECEIVE` action', () => {
    const theme = 'facebook'
    const mockData = {
      contexts: [
        "Facebook will also cut off fake news sites from ad money",
        "Facebook's Messenger Rooms in Testing, Lets You Chat With Strangers on a Topic",
        "Facebook Says It Found More Miscalculated Metrics"
      ],
      lastUpdated: "2016-11-24T02:58:38.507Z"
    }
    const json = {
      data: {
        children: mockData.contexts.map(context => {
          return {
            data: context
          }
        })
      }
    }

    const prevState = {
      [theme]: {
        contexts: ['facebook is good'],
        lastUpdated: '',
        isFetching: false,
        isRefresh: false
      }
    }

    const action = syncActions.receive(theme, json)
    action.lastUpdated = mockData.lastUpdated

    let receivedValue = details(prevState, action)

    let expectedValue = {
      [theme]: {
        contexts: mockData.contexts,
        lastUpdated: mockData.lastUpdated,
        isFetching: false,
        isRefresh: false
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `REFRESH` action', () => {
    const theme = 'facebook'
    const prevState = {
      [theme]: {
        contexts: ['facebook is good'],
        lastUpdated: '',
        isFetching: false,
        isRefresh: false
      }
    }

    const action = syncActions.refresh(theme)

    let receivedValue = details(prevState, action)

    let expectedValue = {
      [theme]: {
        contexts: ['facebook is good'],
        lastUpdated: '',
        isFetching: false,
        isRefresh: true
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })
})