import selected from '../../../../../main/08.async/src/reducers/modules/selected'
import * as syncActions from '../../../../../main/08.async/src/actions/syncActions'
import Themes from '../../../../../main/08.async/src/constants/Themes'

describe('selected reducers', () => {
  it('should provide the initial state', () => {
    let receivedValue = selected(undefined, {})

    let expectedValue = Themes[0]

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `SELECT` action', () => {
    const theme = 'javascript'
    const prevState = 'facebook'

    const action = syncActions.select(theme)

    let receivedValue = selected(prevState, action)

    let expectedValue = theme

    expect(receivedValue).toEqual(expectedValue)
  })
})