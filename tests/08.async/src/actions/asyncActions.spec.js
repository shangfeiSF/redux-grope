import {mockData, mocks} from './mocks/utils/index'

jest.mock('../../../../main/08.async/src/utils/index', () => {
  return mocks
})

import * as ActionTypes from '../../../../main/08.async/src/constants/ActionTypes'
import * as asyncActions from '../../../../main/08.async/src/actions/asyncActions'

describe('asyncActions', () => {
  it('fetchIfNeed should fetch when theme in details is undefined', async() => {
    const theme = 'facebook'

    const expectedType = {
      type: ActionTypes.RECEIVE,
      theme,
      contexts: mockData.contexts,
      lastUpdated: mockData.lastUpdated
    }

    let dispatch = action => action
    let getState = () => ({
      details: {}
    })

    let thunk = asyncActions.fetchIfNeed(theme)
    let receivedValue = await thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedType)
  })

  it('fetchIfNeed should not fetch when theme in details is defined but isFetching = true ', async() => {
    const theme = 'facebook'

    const expectedType = false

    let dispatch = action => action
    let getState = () => ({
      details: {
        [theme]: {
          isFetching: true
        }
      }
    })

    let thunk = asyncActions.fetchIfNeed(theme)
    let receivedValue = await thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedType)
  })

  it('fetchIfNeed should not fetch when theme in details is defined but isRefresh = false ', async() => {
    const theme = 'facebook'

    const expectedType = false

    let dispatch = action => action
    let getState = () => ({
      details: {
        [theme]: {
          isFetching: false,
          isRefresh: false
        }
      }
    })

    let thunk = asyncActions.fetchIfNeed(theme)
    let receivedValue = await thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedType)
  })

  it('fetchIfNeed should fetch when theme in details is defined and isRefresh = true ', async() => {
    const theme = 'facebook'

    const expectedType = {
      type: ActionTypes.RECEIVE,
      theme,
      contexts: mockData.contexts,
      lastUpdated: mockData.lastUpdated
    }

    let dispatch = action => action
    let getState = () => ({
      details: {
        [theme]: {
          isFetching: false,
          isRefresh: true
        }
      }
    })

    let thunk = asyncActions.fetchIfNeed(theme)
    let receivedValue = await thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedType)
  })
})