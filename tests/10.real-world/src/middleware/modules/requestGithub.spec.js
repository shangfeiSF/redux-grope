import sinon from 'sinon'
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
import requestGithub from '../../../../../main/10.real-world/src/middleware/modules/requestGithub'

describe('requestGithub', () => {
  it('should', async() => {
    const store = {}
    const next = sinon.spy()
    const action = {
      fullName: 'facebook/react',
      [SPEC]: {
        route: 'This is a route',
        schema: 'This is a schema',
        types: ['request', 'success', 'failure']
      }
    }
    const _response = Object.assign(
      {},
      normalize(camelizeKeys(jsonMocked), Schemas.REPO),
      {nextPageUrl: utils.getNextPageUrl(response)}
    )

    await requestGithub(store, next, action)

    console.log(next.args[1])

    expect(next.calledTwice).toEqual(true)

    expect(next.firstCall.calledWith({
      fullName: 'facebook/react',
      type: 'request'
    })).toEqual(true)

    // expect(next.secondCall.calledWith({
    //   fullName: 'facebook/react',
    //   type: 'success',
    //   response: _response
    // })).toEqual(true)
  })
})