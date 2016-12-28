import items from '../../../../../main/11.todos-flow/src/reducers/modules/items'

describe('items reducer', () => {
  it('should handle initial state', () => {
    let params = [
      undefined,
      {}
    ]

    let expectValue = [
      []
    ]

    expect(items(...params)).toEqual(...expectValue)
  })

  it('should handle first ADD', () => {
    let params = [
      [],
      {
        type: 'ADD',
        id: 0,
        text: 'Run the tests',
      }
    ]

    let expectValue = [
      [
        {
          id: 0,
          text: 'Run the tests',
          completed: false
        }
      ]
    ]

    expect(items(...params)).toEqual(...expectValue)
  })

  it('should handle second ADD', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Run the tests',
          completed: false
        }
      ],
      {
        type: 'ADD',
        id: 1,
        text: 'Use Redux'
      }
    ]

    let expectValue = [
      [
        {
          id: 0,
          text: 'Run the tests',
          completed: false
        },
        {
          id: 1,
          text: 'Use Redux',
          completed: false
        }
      ]
    ]

    expect(items(...params)).toEqual(...expectValue)
  })

  it('should handle third ADD', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Run the tests',
          completed: false
        },
        {
          id: 1,
          text: 'Use Redux',
          completed: false
        }
      ],
      {
        type: 'ADD',
        id: 2,
        text: 'Fix the tests'
      }
    ]

    let expectValue = [
      [
        {
          id: 0,
          text: 'Run the tests',
          completed: false
        },
        {
          id: 1,
          text: 'Use Redux',
          completed: false
        },
        {
          id: 2,
          text: 'Fix the tests',
          completed: false
        }
      ]
    ]

    expect(items(...params)).toEqual(...expectValue)
  })

  it('should handle TOGGLE', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Run the tests',
          completed: false
        },
        {
          id: 1,
          text: 'Use Redux',
          completed: false
        }
      ],
      {
        type: 'TOGGLE',
        id: 1
      }
    ]

    let expectValue = [
      [
        {
          id: 0,
          text: 'Run the tests',
          completed: false
        },
        {
          id: 1,
          text: 'Use Redux',
          completed: true
        }
      ]
    ]

    expect(items(...params)).toEqual(...expectValue)
  })
})