import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'

import fetchUrl from './fetchUrl'
import getNextPageUrl from './getNextPageUrl'

import {APIROOT, TOKEN} from '../constants/Github'

// fetch data form github and then normalize the data handled by `camelizeKeys`  with schema
export default (route, schema) => {
  let url = route.indexOf(APIROOT) == -1 ? APIROOT + route : route
  url = url.indexOf(TOKEN) == -1 ? url + TOKEN : url

  return fetchUrl(url)
    .then(
      response => response.json().then(json => {
        let result = null

        // parse to some steps and some let for debugger
        if (!response.ok) {
          result = Promise.reject(json)
        } else {
          let camelizedJson = camelizeKeys(json)
          let normalizedJson = normalize(camelizedJson, schema)

          let extraData = {nextPageUrl: getNextPageUrl(response)}

          result = Object.assign({}, normalizedJson, extraData)
        }

        return result
      })
    )
}