import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'

const nextUrl = '<https://api.github.com/repositories/10270250/stargazers?access_token=4b2e139b5f63ca86657f0dbbc6d10ea16100616e&page=2>'
const lastUrl = '<https://api.github.com/repositories/10270250/stargazers?access_token=4b2e139b5f63ca86657f0dbbc6d10ea16100616e&page=1334>'

const jsonMocked = {
  id: 10270250,
  name: "react",
  full_name: "facebook/react",
  owner: {
    login: "facebook",
    id: 69631,
    type: "Organization",
  },
  description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
  created_at: "2013-05-24T16:15:54Z",
  updated_at: "2016-12-15T13:30:40Z",
  pushed_at: "2016-12-15T11:51:48Z",
  svn_url: "https://github.com/facebook/react",
  homepage: "https://facebook.github.io/react/"
}

const response = {
  headers: {
    get: (link) => nextUrl + '; rel="next", ' + lastUrl + '; rel="last"'
  },
  ok: true,
  json: () => Promise.resolve(jsonMocked)
}

jest.mock('../../../../../main/10.real-world/src/middleware/modules/_fetch', () => {
  return {
    _fetch: url => Promise.resolve(response)
  }
})

import {SPEC} from '../../../../../main/10.real-world/src/middleware/symbol'
import {Schemas} from '../../../../../main/10.real-world/src/middleware/schema'
import * as utils from '../../../../../main/10.real-world/src/middleware/modules/utils'

describe('utils', () => {
  describe('verifyActionSpec', () => {
    it('should pass', () => {
      const actionSpec = {
        route: 'This is a route',
        schema: 'This is a schema',
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
      }

      expect(() => {
        utils.verifyActionSpec(actionSpec)
      }).not.toThrow()
    })

    it('should not pass when route is not a string or a function', () => {
      const actionSpec = {
        route: 12345,
        schema: 'This is a schema',
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
      }

      expect(() => {
        utils.verifyActionSpec(actionSpec)
      }).toThrowError('route must be a string or a function to specify a part of URL.')
    })

    it('should not pass when schema is undefined', () => {
      const actionSpec = {
        route: () => {
        },
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
      }

      expect(() => {
        utils.verifyActionSpec(actionSpec)
      }).toThrowError('schema must be existed to specify the exported.')
    })

    it('should not pass when types is not an array of three action types', () => {
      const actionSpec = {
        route: () => {
        },
        schema: 'This is a schema',
        types: ['REQUEST', 'SUCCESS']
      }

      expect(() => {
        utils.verifyActionSpec(actionSpec)
      }).toThrowError('types must be an array of three action types.')
    })

    it('should not pass when some action type is not a sttring', () => {
      const actionSpec = {
        route: () => {
        },
        schema: 'This is a schema',
        types: ['REQUEST', 'SUCCESS', 12345]
      }

      expect(() => {
        utils.verifyActionSpec(actionSpec)
      }).toThrowError('each type must be a string.')
    })
  })

  describe('resolveAction', () => {
    it('should resolve the action including merge extraData and delete SPEC', () => {
      const originalAction = {
        [SPEC]: {
          info: 'This is SPEC'
        },
        type: 'REQUEST',
        fullName: 'facebook/react'
      }

      const extraData = {
        info: 'This is a extra data.'
      }

      let receivedValue = utils.resolveAction(originalAction, extraData)

      let expectedValue = {
        type: originalAction.type,
        fullName: originalAction.fullName,
        info: extraData.info
      }

      expect(receivedValue).toEqual(expectedValue)
    })
  })

  describe('getNextPageUrl', () => {
    it('should retun null if `link` is undefined', () => {
      const response = {
        headers: {
          get: (link) => undefined
        }
      }

      let receivedValue = utils.getNextPageUrl(response)

      let expectedValue = null

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should retun null if `next` is undefined', () => {
      const currentUrl = '<https://api.github.com/repositories/10270250/stargazers?access_token=4b2e139b5f63ca86657f0dbbc6d10ea16100616e&page=1>'
      const lastUrl = '<https://api.github.com/repositories/10270250/stargazers?access_token=4b2e139b5f63ca86657f0dbbc6d10ea16100616e&page=1334>'

      const response = {
        headers: {
          get: (link) => currentUrl + '; rel="current", ' + lastUrl + '; rel="last"'
        }
      }

      let receivedValue = utils.getNextPageUrl(response)

      let expectedValue = null

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should retun next', () => {
      const nextUrl = '<https://api.github.com/repositories/10270250/stargazers?access_token=4b2e139b5f63ca86657f0dbbc6d10ea16100616e&page=2>'
      const lastUrl = '<https://api.github.com/repositories/10270250/stargazers?access_token=4b2e139b5f63ca86657f0dbbc6d10ea16100616e&page=1334>'

      const response = {
        headers: {
          get: (link) => nextUrl + '; rel="next", ' + lastUrl + '; rel="last"'
        }
      }

      let receivedValue = utils.getNextPageUrl(response)

      let expectedValue = nextUrl.slice(1, -1)

      expect(receivedValue).toEqual(expectedValue)
    })
  })

  describe('request', () => {
    it('should return the fetch result', async() => {
      let receivedValue = await utils.request('/repo/facebook/react', Schemas.REPO)

      let expectedValue = Object.assign(
        {},
        normalize(camelizeKeys(jsonMocked), Schemas.REPO),
        {nextPageUrl: utils.getNextPageUrl(response)}
      )

      expect(receivedValue).toEqual(expectedValue)
    })
  })
})