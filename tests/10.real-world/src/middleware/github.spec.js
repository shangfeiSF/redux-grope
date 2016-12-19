jest.mock('../../../../main/10.real-world/src/middleware/modules/requestGithub', () => {
  return (store, next, action) => ({
    store,
    next,
    action
  })
})

import {SPEC} from '../../../../main/10.real-world/src/middleware/symbol'
import github from '../../../../main/10.real-world/src/middleware/github'

describe('github', () => {
  it('should return a middleware', () => {
    const store = {
      info: 'This is a store.'
    }

    const next = (action) => {
      return {
        ...action,
        info: 'This is the result of next.'
      }
    }

    const middleware = github(store)(next)

    let receivedValue = typeof middleware

    let expectedValue = 'function'

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should return a middleware which use `next` function to handle action when `action[SPEC]` is undefined', () => {
    const store = {
      info: 'This is a store.'
    }

    const next = (action) => {
      return {
        ...action,
        info: 'This is the result of next.'
      }
    }

    const action = {
      type: 'REQUEST'
    }

    const middleware = github(store)(next)

    let receivedValue = middleware(action)

    let expectedValue = {
      ...action,
      info: 'This is the result of next.'
    }

    expect(receivedValue).toEqual(expectedValue)
  })

  it('should return a middleware which use `requestGithub` function to handle action when `action[SPEC]` is defined', () => {
    const store = {
      info: 'This is a store.'
    }

    const next = (action) => {
      return {
        ...action,
        info: 'This is the result of next.'
      }
    }

    const action = {
      type: 'REQUEST',
      [SPEC]: {
        info: 'This is the SPEC.'
      }
    }

    const middleware = github(store)(next)

    let receivedValue = middleware(action)

    let expectedValue = {
      store,
      next,
      action
    }

    expect(receivedValue).toEqual(expectedValue)
  })
})