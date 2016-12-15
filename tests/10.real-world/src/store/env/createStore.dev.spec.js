import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'
import {bindActionCreators} from 'redux'

import {
  repo as repoJson,
  response as repoReponse
} from '../mocks/middleware/modules/repoJson.mock'
import {
  user as userJson,
  response as userReponse
} from '../mocks/middleware/modules/userJson.mock'
import {
  starred as starredJson,
  response as starredReponse
} from '../mocks/middleware/modules/starredJson.mock'
import {
  stargazers as stargazersJson,
  response as stargazersReponse
} from '../mocks/middleware/modules/stargazersJson.mock'

import {mocks} from '../mocks/middleware/modules/utils'

jest.mock('../../../../../main/10.real-world/src/middleware/modules/utils', () => {
  return mocks
})

import createStore from '../../../../../main/10.real-world/src/store/env/createStore.dev'

import {routerReducer as routing} from 'react-router-redux'

import {Schemas} from '../../../../../main/10.real-world/src/middleware/schema'
import {loadRepo, loadStargazers} from '../../../../../main/10.real-world/src/actions/repoPageThunkActions'
import {loadUser, loadStarred} from '../../../../../main/10.real-world/src/actions/userPageThunkActions'

describe('createStore.dev', () => {
  it('should create store correctly', async() => {
    const initState = {
      routing: routing,
      entities: {
        users: {},
        repos: {}
      },
      pagination: {
        starredByUser: {},
        stargazersByRepo: {}
      },
      errorMessage: null
    }

    const store = createStore(initState)

    let fullName = 'facebook/react'
    let login = 'tj'

    let loadRepoBinded = bindActionCreators(loadRepo, store.dispatch)

    await loadRepoBinded(fullName, ['description'])
    // store.dispatch(loadStargazers(fullName))

    // store.dispatch(loadUser(login, ['name']))
    // store.dispatch(loadStarred(login))

    let camelizedJson = camelizeKeys(repoJson)
    let normalizedJson = normalize(camelizedJson, Schemas.REPO)

    let extraData = {nextPageUrl: mocks.getNextPageUrl(userReponse)}

    //Object.assign({}, normalizedJson, extraData)

    let expectedValue = {
      routing: routing,
      entities: {
        users: normalizedJson.entities.users,
        repos: normalizedJson.entities.repos
      },
      pagination: {
        starredByUser: {},
        stargazersByRepo: {}
      },
      errorMessage: null
    }

    expect(store.getState()).toEqual(expectedValue)
  })
})