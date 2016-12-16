import polyfill from '../../../../main/10.real-world/src/polyfill/index'

describe('polyfill', () => {
  it('should replace `10.real-world` to `tj`', () => {
    const originalValue = '10.real-world'

    const expectedValue = 'tj'

    expect(polyfill.replace(originalValue)).toEqual(expectedValue)
  })

  it('should replace `10.real-world/` to `tj`', () => {
    const originalValue = '10.real-world/'

    const expectedValue = 'tj'

    expect(polyfill.replace(originalValue)).toEqual(expectedValue)
  })

})