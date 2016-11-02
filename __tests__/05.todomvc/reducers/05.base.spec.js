import base from '../../../main/05.todomvc/src/reducers/base'
import * as ActionTypes from '../../../main/05.todomvc/src/constants/ActionTypes'

describe('base reducer', () => {
  it('Initial state', () => {
    let params = [
      undefined,
      {}
    ]

    let expectedValue = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        }
      ]
    ]

    expect(base(...params)).toEqual(...expectedValue)
  })

  it('ADD', () => {
    let params = [
      [],
      {
        type: ActionTypes.ADD,
        text: 'Run the tests'
      }
    ]

    let expectedValue = [
      [
        {
          id: 0,
          text: 'Run the tests',
          completed: false
        }
      ]
    ]

    expect(base(...params)).toEqual(...expectedValue)
  })

  it('ADD again', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        }
      ],
      {
        type: ActionTypes.ADD,
        text: 'Run the tests'
      }
    ]

    let expectedValue = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: false
        }
      ]
    ]

    expect(base(...params)).toEqual(...expectedValue)
  })

  it('DELETE', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: false
        }
      ],
      {
        type: ActionTypes.DELETE,
        id: 1
      }
    ]

    let expectedValue = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        }
      ]
    ]

    expect(base(...params)).toEqual(...expectedValue)
  })

  it('EDIT', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: false
        }
      ],
      {
        type: ActionTypes.EDIT,
        id: 1,
        text: 'Fix the tests'
      }
    ]

    let expectedValue = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Fix the tests',
          completed: false
        }
      ]
    ]

    expect(base(...params)).toEqual(...expectedValue)
  })

  it('COMPLETE', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: false
        }
      ],
      {
        type: ActionTypes.COMPLETE,
        id: 1
      }
    ]

    let expectedValue = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: true
        }
      ]
    ]

    expect(base(...params)).toEqual(...expectedValue)
  })

  it('COMPLETE_ALL when there exists uncompleted item', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: true
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: false
        }
      ],
      {
        type: ActionTypes.COMPLETE_ALL
      }
    ]

    let expectedValue = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: true
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: true
        }
      ]
    ]

    expect(base(...params)).toEqual(...expectedValue)
  })

  it('COMPLETE_ALL when all items are completed', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: true
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: true
        }
      ],
      {
        type: ActionTypes.COMPLETE_ALL
      }
    ]

    let expectedValue = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: false
        }
      ]
    ]

    expect(base(...params)).toEqual(...expectedValue)
  })

  it('CLEAR_COMPLETED', () => {
    let params = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Run the tests',
          completed: true
        }
      ],
      {
        type: ActionTypes.CLEAR_COMPLETED
      }
    ]

    let expectedValue = [
      [
        {
          id: 0,
          text: 'Use Redux',
          completed: false
        }
      ]
    ]

    expect(base(...params)).toEqual(...expectedValue)
  })

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    let params = [
      [
        // actions
        {
          type: ActionTypes.COMPLETE,
          id: 0
        },
        {
          type: ActionTypes.CLEAR_COMPLETED
        },
        {
          type: ActionTypes.ADD,
          text: 'Write more tests'
        }
      ].reduce(base, [{
        id: 0,
        text: 'Use Redux',
        completed: false
      }, {
        id: 1,
        text: 'Write tests',
        completed: false
      }])
    ]

    let expectedValue = [
      [
        {
          id: 1,
          text: 'Write tests',
          completed: false
        },
        {
          id: 2,
          text: 'Write more tests',
          completed: false
        }
      ]
    ]

    expect(...params).toEqual(...expectedValue)
  })
})