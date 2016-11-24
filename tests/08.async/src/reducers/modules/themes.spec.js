import themes from '../../../../../main/08.async/src/reducers/modules/themes'
import * as syncActions from '../../../../../main/08.async/src/actions/syncActions'
import Themes from '../../../../../main/08.async/src/constants/Themes'

describe('themes reducers', () => {
  it('should provide the initial state', () => {
    let receivedValue = themes(undefined, {})

    let expectedValue = Themes

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should handle `ADD` action', () => {
    const theme = 'test'
    const prevState = Themes

    const action = syncActions.add(theme)

    let receivedValue = themes(prevState, action)

    let expectedValue = [...Themes, theme]

    expect(receivedValue).toEqual(expectedValue)
  })
})