import addAndToggle from '../modules/addAndToggle'

describe('addAndToggle reducer', () => {
  it('should handle initial state', () => {
    let params = [
      undefined,
      {}
    ]
    let expectValue = [
      []
    ]

    expect(addAndToggle(...params))
      .toEqual(...expectValue)
  })

  it('should handle first ADD', () => {
    let params = [
      [],
      {
        type: 'ADD',
        text: 'Run the tests',
        id: 0
      }
    ]
    let expectValue = [
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        }
      ]
    ]

    expect(addAndToggle(...params))
      .toEqual(...expectValue)
  })

  it('should handle second ADD', () => {
    let params = [
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        }
      ],
      {
        type: 'ADD',
        text: 'Use Redux',
        id: 1
      }
    ]
    let expectValue = [
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        },
        {
          text: 'Use Redux',
          completed: false,
          id: 1
        }
      ]
    ]

    expect(addAndToggle(...params))
      .toEqual(...expectValue)
  })

  it('should handle third ADD', () => {
    let params = [
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        },
        {
          text: 'Use Redux',
          completed: false,
          id: 1
        }
      ],
      {
        type: 'ADD',
        text: 'Fix the tests',
        id: 2
      }
    ]
    let expectValue = [
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        },
        {
          text: 'Use Redux',
          completed: false,
          id: 1
        },
        {
          text: 'Fix the tests',
          completed: false,
          id: 2
        }
      ]
    ]

    expect(addAndToggle(...params))
      .toEqual(...expectValue)
  })

  it('should handle TOGGLE', () => {
    let params = [
      [
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        },
        {
          text: 'Use Redux',
          completed: false,
          id: 1
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
          text: 'Run the tests',
          completed: false,
          id: 0
        },
        {
          text: 'Use Redux',
          completed: true,
          id: 1
        }
      ]
    ]

    expect(addAndToggle(...params))
      .toEqual(...expectValue)
  })
})