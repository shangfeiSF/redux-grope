import union from 'lodash/union'

import * as ActionTypes  from '../../../../../../main/10.real-world/src/constants/ActionTypes'
import starredByUser from '../../../../../../main/10.real-world/src/reducers/modules/modules/starredByUser'

describe('starredByUser', () => {
  it('should provide the initial state', () => {
    let receivedValue = starredByUser(undefined, {})

    let expectedValue = {}

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should update the appointed key of state when handle some `STARRED_REQUEST` action', () => {
    const login = 'tj'

    const state = undefined

    const action = {
      login: login,
      type: ActionTypes.STARRED_REQUEST
    }

    let receivedValue = starredByUser(state, action)

    let expectedValue = {
      [action.login]: {
        ids: [],
        pageCount: 0,
        isFetching: true,
        nextPageUrl: undefined
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should update the appointed key of state when handle some `STARRED_SUCCESS` action', () => {
    const login = 'tj'

    const state = {
      [login]: {
        ids: [],
        pageCount: 0,
        isFetching: true,
        nextPageUrl: undefined
      }
    }

    const action = {
      login: login,
      type: ActionTypes.STARRED_SUCCESS,
      response: {
        result: [
          'nothings/single_file_libs',
          'cloudson/gitql',
          'siddharthkp/cost-of-modules'
        ],
        nextPageUrl: 'https://api.github.com/user/25254/starred?access_token=64f063a82be5d1b2a3bfe388d3dc1eb608d94a23&page=2'
      }
    }

    let receivedValue = starredByUser(state, action)

    let expectedValue = {
      [login]: {
        ...state[login],
        ids: union(state[login].ids, action.response.result),
        pageCount: state[login].pageCount + 1,
        isFetching: false,
        nextPageUrl: action.response.nextPageUrl
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should update the appointed key of state when handle some `STARRED_FAILURE` action', () => {
    const login = 'tj'

    const state = {
      [login]: {
        ids: [],
        pageCount: 0,
        isFetching: true,
        nextPageUrl: undefined
      }
    }

    const action = {
      login: login,
      type: ActionTypes.STARRED_FAILURE
    }

    let receivedValue = starredByUser(state, action)

    let expectedValue = {
      [login]: {
        ...state[login],
        isFetching: false
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })
})