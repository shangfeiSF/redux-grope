import sinon from 'sinon'
import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'

import mocks from './mocks/index'
jest.mock('../../../../../main/10.real-world/src/middleware/modules/_fetch', () => mocks.fetch)

import {SPEC} from '../../../../../main/10.real-world/src/middleware/symbol'
import {Schemas} from '../../../../../main/10.real-world/src/middleware/schema'

import * as utils from '../../../../../main/10.real-world/src/middleware/modules/utils'
import requestGithub from '../../../../../main/10.real-world/src/middleware/modules/requestGithub'

describe('requestGithub', () => {
  it('should call `next` twice with a requet action first and then with a success or failure action', async() => {
    const store = {}
    const next = sinon.spy()
    const action = {
      fullName: 'facebook/react',
      [SPEC]: {
        route: 'This is a route',
        schema: Schemas.REPO,
        types: ['request', 'success', 'failure']
      }
    }

    await requestGithub(store, next, action)

    expect(next.calledTwice).toEqual(true)

    const firstCalled = next.firstCall.calledWith({
      fullName: action.fullName,
      type: action[SPEC].types[0]
    })

    expect(firstCalled).toEqual(true)

    const expectedResponse = Object.assign(
      {},
      normalize(camelizeKeys(mocks.jsonMocked), Schemas.REPO),
      {
        nextPageUrl: utils.getNextPageUrl(mocks.response)
      }
    )

    const secondCalled = next.secondCall.calledWith({
      fullName: action.fullName,
      type: action[SPEC].types[1],
      response: expectedResponse
    })

    expect(secondCalled).toEqual(true)
  })
})