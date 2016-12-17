import merge from 'lodash/merge'
import entities from '../../../../../main/10.real-world/src/reducers/modules/entities'

describe('entities', () => {
  it('should provide the initial state', () => {
    let receivedValue = entities(undefined, {})

    let expectedValue = {
      users: {},
      repos: {}
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should merge entities if action.response and its entities existed', () => {
    const state = {
      users: {
        tj: {
          login: "tj",
          id: 25254,
          type: "User"
        }
      },
      repos: {
        'facebook/react': {
          id: 10270250,
          name: "react",
          full_name: "facebook/react",
          description: "A declarative, efficient, and flexible JavaScript library for building user interfaces."
        }
      }
    }

    const action = {
      response: {
        entities: {
          users: {
            tj: {
              login: "cloudson",
              id: 94096,
              type: "User"
            }
          },
          repos: {
            'cloudson/gitql': {
              id: 16899487,
              name: "gitql",
              full_name: "cloudson/gitql",
              description: "A git query language."
            }
          }
        }
      }
    }

    let receivedValue = entities(state, action)

    let expectedValue = merge({}, state, action.response.entities)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should not merge entities if action.response or its entities not existed', () => {
    const state = {
      users: {
        tj: {
          login: "tj",
          id: 25254,
          type: "User"
        }
      },
      repos: {
        'facebook/react': {
          id: 10270250,
          name: "react",
          full_name: "facebook/react",
          description: "A declarative, efficient, and flexible JavaScript library for building user interfaces."
        }
      }
    }

    const action = {
      response: {}
    }

    let receivedValue = entities(state, action)

    let expectedValue = state

    expect(receivedValue).toEqual(expectedValue)
  })
})