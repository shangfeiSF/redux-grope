import union from 'lodash/union'

import * as ActionTypes  from '../../../../../../main/10.real-world/src/constants/ActionTypes'
import stargazersByRepo from '../../../../../../main/10.real-world/src/reducers/modules/modules/stargazersByRepo'

describe('stargazersByRepo', () => {
  it('should provide the initial state', () => {
    let receivedValue = stargazersByRepo(undefined, {})

    let expectedValue = {}

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should update the appointed key of state when handle some `STARGAZERS_REQUEST` action', () => {
    const fullName = 'facebook/react'

    const state = undefined

    const action = {
      fullName: fullName,
      type: ActionTypes.STARGAZERS_REQUEST
    }

    let receivedValue = stargazersByRepo(state, action)

    let expectedValue = {
      [action.fullName]: {
        ids: [],
        pageCount: 0,
        isFetching: true,
        nextPageUrl: undefined
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should update the appointed key of state when handle some `STARGAZERS_SUCCESS` action', () => {
    const fullName = 'facebook/react'

    const state = {
      [fullName]: {
        ids: [],
        pageCount: 0,
        isFetching: true,
        nextPageUrl: undefined
      }
    }

    const action = {
      fullName: fullName,
      type: ActionTypes.STARGAZERS_SUCCESS,
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

    let receivedValue = stargazersByRepo(state, action)

    let expectedValue = {
      [fullName]: {
        ...state[fullName],
        ids: union(state[fullName].ids, action.response.result),
        pageCount: state[fullName].pageCount + 1,
        isFetching: false,
        nextPageUrl: action.response.nextPageUrl
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should update the appointed key of state when handle some `STARGAZERS_FAILURE` action', () => {
    const fullName = 'facebook/react'

    const state = {
      [fullName]: {
        ids: [],
        pageCount: 0,
        isFetching: true,
        nextPageUrl: undefined
      }
    }

    const action = {
      fullName: fullName,
      type: ActionTypes.STARGAZERS_FAILURE
    }

    let receivedValue = stargazersByRepo(state, action)

    let expectedValue = {
      [fullName]: {
        ...state[fullName],
        isFetching: false
      }
    }

    expect(receivedValue).toEqual(expectedValue)
  })
})