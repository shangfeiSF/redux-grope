import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'

import {SPEC} from '../symbol'
import {ACCESSTOKEN, APIROOT} from '../../constants/Github'

// verify the spec of action is conformed, or would throw error
export const verifyActionSpec = actionSpec => {
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
}

// resolve the load-action to one step with some defined in extraData
export const resolveAction = (originalAction, extraData) => {
  let updatedAction = Object.assign({}, originalAction, extraData)

  delete updatedAction[SPEC]

  return updatedAction
}

export const getNextPageUrl = response => {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const next = link.split(',').find(item => item.indexOf('rel="next"') > -1)
  if (!next) {
    return null
  }

  return next.split(';')[0].slice(1, -1)
}

// fetch data form github and then normalize the data handled by `camelizeKeys`  with schema
export const request = (route, schema) => {
  const url = (route.indexOf(APIROOT) === -1 ? APIROOT + route : route) + `?access_token=${ACCESSTOKEN}`

  return fetch(url)
    .then(
      response => response.json().then(json => {
        return !response.ok ?
          Promise.reject(json) :
          Object.assign({}, normalize(camelizeKeys(json), schema), {nextPageUrl: getNextPageUrl(response)})
      })
    )
}