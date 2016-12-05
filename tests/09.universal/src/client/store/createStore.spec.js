import createStore from '../../../../../main/09.universal/src/client/store/createStore'

describe('createStore', () => {
  it('should create store correctly', () => {
    const counter = 9

    const store = createStore({
      counter
    })

    let expectedValue = {
      counter
    }

    expect(store.getState()).toEqual(expectedValue)
  })
})