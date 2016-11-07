import * as actions from '../../../../main/04.todos-with-undo/src/actions/index'

describe('Actions', () => {
  it('add should create `ADD` action', () => {
    let action = actions.add('Use Redux')

    let expectedValue = {
      type: 'ADD',
      id: 0,
      text: 'Use Redux'
    }

    expect(action).toEqual(expectedValue)
  })

  it('filter should create `FILTER` action', () => {
    let action = actions.filter('active')

    let expectedValue = {
      type: 'FILTER',
      filter: 'active'
    }

    expect(action).toEqual(expectedValue)
  })

  it('toggle should create `TOGGLE` action', () => {
    let action = actions.toggle(1)

    let expectedValue = {
      type: 'TOGGLE',
      id: 1
    }

    expect(action).toEqual(expectedValue)
  })
})