import * as ActionTypes from '../../../../../main/09.universal/src/client/constants/ActionTypes'
import * as syncActions from '../../../../../main/09.universal/src/client/actions/syncActions'

describe('syncActions', () => {
  it('set should create `SET` action', () => {
    let payload = 'foo'

    let expectedValue = {
      type: ActionTypes.SET,
      payload
    }

    expect(syncActions.set(payload)).toEqual(expectedValue)
  })

  it('increase should create `INCREASE` action', () => {
    let expectedValue = {
      type: ActionTypes.INCREASE
    }

    expect(syncActions.increase()).toEqual(expectedValue)
  })

  it('decrease should create `DECREASE` action', () => {
    let expectedValue = {
      type: ActionTypes.DECREASE
    }

    expect(syncActions.decrease()).toEqual(expectedValue)
  })
})