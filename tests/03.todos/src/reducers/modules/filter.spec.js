import filter from '../../../../../main/03.todos/src/reducers/modules/filter'

describe('filter reducer', () => {
  it('should handle initial state', () => {
    let params = [
      undefined,
      {}
    ]

    let expectValue = [
      'SHOW_ALL'
    ]

    expect(filter(...params)).toEqual(...expectValue)
  })

  it('should handle FILTER to SHOW_ACTIVE', () => {
    let params = [
      'SHOW_ALL',
      {
        type: 'FILTER',
        filter: 'SHOW_ACTIVE'
      }
    ]

    let expectValue = [
      'SHOW_ACTIVE'
    ]

    expect(filter(...params)).toEqual(...expectValue)
  })

  it('should handle FILTER to SHOW_COMPLETED', () => {
    let params = [
      'SHOW_ALL',
      {
        type: 'FILTER',
        filter: 'SHOW_COMPLETED'
      }
    ]

    let expectValue = [
      'SHOW_COMPLETED'
    ]

    expect(filter(...params)).toEqual(...expectValue)
  })
})