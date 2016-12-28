import filter from '../../../../../main/11.todos-flow/src/reducers/modules/filter'

describe('filter reducer', () => {
  it('should handle initial state', () => {
    let params = [
      undefined,
      {}
    ]

    let expectValue = [
      'ALL'
    ]

    expect(filter(...params)).toEqual(...expectValue)
  })

  it('should handle FILTER to ACTIVE', () => {
    let params = [
      'ALL',
      {
        type: 'FILTER',
        filter: 'ACTIVE'
      }
    ]

    let expectValue = [
      'ACTIVE'
    ]

    expect(filter(...params)).toEqual(...expectValue)
  })

  it('should handle FILTER to COMPLETED', () => {
    let params = [
      'ALL',
      {
        type: 'FILTER',
        filter: 'COMPLETED'
      }
    ]

    let expectValue = [
      'COMPLETED'
    ]

    expect(filter(...params)).toEqual(...expectValue)
  })
})