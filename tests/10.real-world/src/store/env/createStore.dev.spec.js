import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'
import {bindActionCreators} from 'redux'

import {mocks} from '../mocks/middleware/modules/utils'
jest.mock('../../../../../main/10.real-world/src/middleware/modules/utils', () => mocks)

import {repo as repoJson} from '../mocks/middleware/modules/repoJson.mock'
import {
  stargazers as stargazersJson,
  response as stargazersReponse
} from '../mocks/middleware/modules/stargazersJson.mock'

import {loadRepo, loadStargazers} from '../../../../../main/10.real-world/src/actions/repoPageThunkActions'

import {user as userJson} from '../mocks/middleware/modules/userJson.mock'
import {
  starred as starredJson,
  response as starredReponse
} from '../mocks/middleware/modules/starredJson.mock'

import {loadUser, loadStarred} from '../../../../../main/10.real-world/src/actions/userPageThunkActions'

import {routerReducer as routing} from 'react-router-redux'
import {Schemas} from '../../../../../main/10.real-world/src/middleware/schema'
import createStore from '../../../../../main/10.real-world/src/store/env/createStore.dev'

const TEST = true

describe('createStore.dev', () => {
  it('should create store correctly with initState', () => {
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

    const store = createStore(initState, TEST)

    const expectedValue = initState

    expect(store.getState()).toEqual(expectedValue)
  })

  it('should change store correctly by `loadRepo` when enter the `RepoPage`', async() => {
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

    const store = createStore(initState, TEST)

    const loadRepoBinded = bindActionCreators(loadRepo, store.dispatch)

    const fullname = 'facebook/react'

    await loadRepoBinded(fullname, ['description'])

    let camelized = camelizeKeys(repoJson)
    let normalized = normalize(camelized, Schemas.REPO)

    let expectedValue = {
      routing: routing,
      entities: {
        users: normalized.entities.users,
        repos: normalized.entities.repos
      },
      pagination: {
        starredByUser: {},
        stargazersByRepo: {}
      },
      errorMessage: null
    }

    expect(store.getState()).toEqual(expectedValue)
  })

  it('should change store correctly by `loadStargazers` when enter the `RepoPage`', async() => {
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

    const store = createStore(initState, TEST)

    const loadStargazersBinded = bindActionCreators(loadStargazers, store.dispatch)

    const fullname = 'facebook/react'

    await loadStargazersBinded(fullname, ['id'])

    let camelized = camelizeKeys(stargazersJson)
    let normalized = normalize(camelized, Schemas.USER_ARRAY)

    let expectedValue = {
      routing: routing,
      entities: {
        users: normalized.entities.users,
        repos: {}
      },
      pagination: {
        starredByUser: {},
        stargazersByRepo: {
          [fullname]: {
            ids: normalized.result,
            pageCount: 1,
            isFetching: false,
            nextPageUrl: mocks.getNextPageUrl(stargazersReponse)
          }
        }
      },
      errorMessage: null
    }

    expect(store.getState()).toEqual(expectedValue)
  })

  it('should change store correctly by `loadUser` when enter the `UserPage`', async() => {
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

    const store = createStore(initState, TEST)

    const loadRepoBinded = bindActionCreators(loadUser, store.dispatch)

    const login = 'tj'

    await loadRepoBinded(login, ['email'])

    let camelized = camelizeKeys(userJson)
    let normalized = normalize(camelized, Schemas.USER)

    let expectedValue = {
      routing: routing,
      entities: {
        users: normalized.entities.users,
        repos: {}
      },
      pagination: {
        starredByUser: {},
        stargazersByRepo: {}
      },
      errorMessage: null
    }

    expect(store.getState()).toEqual(expectedValue)
  })

  it('should change store correctly by `loadStarred` when enter the `UserPage`', async() => {
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

    const store = createStore(initState, TEST)

    const loadStarredBinded = bindActionCreators(loadStarred, store.dispatch)

    const login = 'tj'

    await loadStarredBinded(login, true)

    let camelized = camelizeKeys(starredJson)
    let normalized = normalize(camelized, Schemas.REPO_ARRAY)

    let expectedValue = {
      routing: routing,
      entities: {
        users: normalized.entities.users,
        repos: normalized.entities.repos
      },
      pagination: {
        starredByUser: {
          [login]: {
            ids: normalized.result,
            pageCount: 1,
            isFetching: false,
            nextPageUrl: mocks.getNextPageUrl(starredReponse)
          }
        },
        stargazersByRepo: {}
      },
      errorMessage: null
    }

    expect(store.getState()).toEqual(expectedValue)
  })
})