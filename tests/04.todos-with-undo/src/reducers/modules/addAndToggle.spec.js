import addAndToggle from '../../../../../main/03.todos/src/reducers/modules/addAndToggle'

describe('addAndToggle reducer', () => {
  it('should handle initial state', () => {
    let params = [
      undefined,
      {}
    ]

    let expectValue = [
      []
    ]

    expect(addAndToggle(...params)).toEqual(...expectValue)
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

    expect(addAndToggle(...params)).toEqual(...expectValue)
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

    expect(addAndToggle(...params)).toEqual(...expectValue)
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

    expect(addAndToggle(...params)).toEqual(...expectValue)
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

    expect(addAndToggle(...params)).toEqual(...expectValue)
  })
})