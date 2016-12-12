import * as ActionTypes from '../../../../main/10.real-world/src/constants/ActionTypes'
import * as errorActions from '../../../../main/10.real-world/src/actions/errorActions'

describe('errorActions', () => {
  it('resetErrorMessage should create `RESET_ERROR_MESSAGE` action', () => {
    let expectedValue = {
      type: ActionTypes.RESET_ERROR_MESSAGE
    }

    expect(errorActions.resetErrorMessage()).toEqual(expectedValue)
  })
})