import union from 'lodash/union'
import {update} from '../../../../../../main/10.real-world/src/reducers/modules/modules/utils'

describe('utils.update', () => {
  it('should provide the initial state', () => {
    let receivedValue = update(undefined, {})

    let expectedValue = {
      ids: [],
      pageCount: 0,
      isFetching: false,
      nextPageUrl: undefined
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should update state when action.typeIndex is 0 which means some `REQUEST` action', () => {
    const state = undefined

    const action = {
      fullName: "facebook/react",
      typeIndex: 0
    }

    let receivedValue = update(state, action)

    let expectedValue = {
      ids: [],
      pageCount: 0,
      isFetching: true,
      nextPageUrl: undefined
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should update state when action.typeIndex is 1 which means some `SUCCESS` action', () => {
    const state = {
      ids: [],
      pageCount: 0,
      isFetching: true,
      nextPageUrl: undefined
    }

    const action = {
      fullName: "facebook/react",
      typeIndex: 1,
      response: {
        result: [
          'goatslacker',
          'iamxande',
          'benkeen',
          'tgemayel',
          'imgntn'
        ],
        nextPageUrl: 'https://api.github.com/repositories/10270250/stargazers?access_token=64f063a82be5d1b2a3bfe388d3dc1eb608d94a23&page=2'
      }
    }

    let receivedValue = update(state, action)

    let expectedValue = {
      ...state,
      ids: union(state.ids, action.response.result),
      pageCount: state.pageCount + 1,
      isFetching: false,
      nextPageUrl: action.response.nextPageUrl
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should update state when action.typeIndex is 1 which means some `FAILURE` action', () => {
    const state = {
      ids: [],
      pageCount: 0,
      isFetching: true,
      nextPageUrl: undefined
    }

    const action = {
      fullName: "facebook/react",
      typeIndex: 2
    }

    let receivedValue = update(state, action)

    let expectedValue = {
      ...state,
      isFetching: false
    }

    expect(receivedValue).toEqual(expectedValue)
  })
})