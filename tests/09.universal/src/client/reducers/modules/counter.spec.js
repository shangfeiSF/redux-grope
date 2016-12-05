import counter from '../../../../../../main/09.universal/src/client/reducers/modules/counter'
import * as syncActions from '../../../../../../main/09.universal/src/client/actions/syncActions'

describe('counter', () => {
  it('should provide the initial state', () => {
    let receivedValue = counter(undefined, {})

    let expectedValue = 0

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `SET` action', () => {
    const payload = 20
    const prevState = 10

    const action = syncActions.set(payload)

    let receivedValue = counter(prevState, action)

    let expectedValue = payload

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `INCREASE` action', () => {
    const prevState = 10

    const action = syncActions.increase()

    let receivedValue = counter(prevState, action)

    let expectedValue = prevState + 1

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `DECREASE` action', () => {
    const prevState = 20

    const action = syncActions.decrease()

    let receivedValue = counter(prevState, action)

    let expectedValue = prevState - 1

    expect(receivedValue).toEqual(expectedValue)
  })
})