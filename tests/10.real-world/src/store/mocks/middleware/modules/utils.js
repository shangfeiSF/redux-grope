import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'

import {SPEC} from '../../../../../../../main/10.real-world/src/middleware/symbol'

import {repo as repoJson, response as repoReponse} from './repoJson.mock'
import {user as userJson, response as userReponse} from './userJson.mock'
import {starred as starredJson, response as starredReponse} from './starredJson.mock'
import {stargazers as stargazersJson, response as stargazersReponse} from './stargazersJson.mock'

export const mocks = {
  verifyActionSpec: actionSpec => {
    const {route, schema, types} = actionSpec

    if (!(typeof route === 'string' || typeof route === 'function')) {
      throw new Error('route must be a string or a function to specify a part of URL.')
    }

    if (!schema) {
      throw new Error('schema must be existed to specify the exported.')
    }

    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('types must be an array of three action types.')
    }

    if (!types.every(type => typeof type === 'string')) {
      throw new Error('each type must be a string.')
    }
  },

  resolveAction: (originalAction, extraData) => {
    let updatedAction = Object.assign({}, originalAction, extraData)

    delete updatedAction[SPEC]

    return updatedAction
  },

  getNextPageUrl: response => {
    const link = response.headers.get('link')
    if (!link) {
      return null
    }

    const next = link.split(',').find(item => item.indexOf('rel="next"') > -1)
    if (!next) {
      return null
    }

    return next.split(';')[0].slice(1, -1)
  },

  request: (route, schema) => {
    let json = null
    let response = null

    if (route.match(/^repos\/.*/g) !== null) {
      json = repoJson
      response = repoReponse
    }
    if (route.match(/^users\/.*/g) !== null) {
      json = userJson
      response = userReponse
    }
    if (route.match(/^users\/.*\/starred/g) !== null) {
      json = starredJson
      response = starredReponse
    }
    if (route.match(/^repos\/.*\/stargazers/g) !== null) {
      json = stargazersJson
      response = stargazersReponse
    }

    let camelizedJson = camelizeKeys(json)
    let normalizedJson = normalize(camelizedJson, schema)

    let extraData = {nextPageUrl: mocks.getNextPageUrl(response)}

    let result = Object.assign({}, normalizedJson, extraData)

    return Promise.resolve(result)
  }
}