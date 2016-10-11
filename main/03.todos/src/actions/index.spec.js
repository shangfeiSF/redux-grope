import * as actions from './index'

describe('Actions', () => {
  it('add should create ADD action', () => {
    expect(actions.add('Use Redux')).toEqual({
      type: 'ADD',
      id: 0,
      text: 'Use Redux'
    })
  })

  it('filter should create FILTER action', () => {
    expect(actions.filter('active')).toEqual({
      type: 'FILTER',
      filter: 'active'
    })
  })

  it('toggle should create TOGGLE action', () => {
    expect(actions.toggle(1)).toEqual({
      type: 'TOGGLE',
      id: 1
    })
  })
})