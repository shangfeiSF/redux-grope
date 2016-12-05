import {mocks} from './mocks/utils/index'

jest.mock('../../../../../main/09.universal/src/client/utils/index', () => {
  return mocks
})

import * as ActionTypes from '../../../../../main/09.universal/src/client/constants/ActionTypes'
import * as thunkActions from '../../../../../main/09.universal/src/client/actions/thunkActions'

describe('thunkActions', () => {
  it('increaseIfOdd should increase when counter is odd', async() => {
    const counter = 1

    let expectedValue = {
      type: ActionTypes.INCREASE
    }

    let dispatch = action => action
    let getState = () => ({
      counter: counter
    })

    let thunk = thunkActions.increaseIfOdd()
    let receivedValue = await thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('increaseIfOdd should increase when counter is even', async() => {
    const counter = 2

    let expectedValue = false

    let dispatch = action => action
    let getState = () => ({
      counter: counter
    })

    let thunk = thunkActions.increaseIfOdd()
    let receivedValue = await thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('increameAsync should increase async', async() => {
    const counter = 2

    let expectedValue = {
      type: ActionTypes.INCREASE
    }

    let dispatch = action => action
    let getState = () => ({
      counter: counter
    })

    let thunk = thunkActions.increameAsync()
    let receivedValue = await thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedValue)
  })
})