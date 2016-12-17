import {resetErrorMessage} from '../../../../../main/10.real-world/src/actions/errorActions'
import errorMessage from '../../../../../main/10.real-world/src/reducers/modules/errorMessage'

describe('errorMessage', () => {
  it('should provide the initial state', () => {
    let receivedValue = errorMessage(undefined, {})

    let expectedValue = null

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should return error if action.error existed', () => {
    const state = null

    const action = {
      error: 'This is an error message.'
    }

    let receivedValue = errorMessage(state, action)

    let expectedValue = action.error

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should reset state to the initial value when handle `RESET_ERROR_MESSAGE` action', () => {
    const state = 'This is the previous error message.'

    const action = resetErrorMessage()

    let receivedValue = errorMessage(state, action)

    let expectedValue = null

    expect(receivedValue).toEqual(expectedValue)
  })
})