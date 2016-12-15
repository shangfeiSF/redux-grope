import {bindActionCreators} from 'redux'

import {mocks} from '../mocks/middleware/modules/utils'

jest.mock('../../../../../main/10.real-world/src/middleware/modules/utils', () => {
  return mocks
})

import createStore from '../../../../../main/10.real-world/src/store/env/createStore.dev'

import {routerReducer as routing} from 'react-router-redux'

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
    //
    // store.dispatch(loadUser(login, ['name']))
    // store.dispatch(loadStarred(login))

    let expectedValue = null

    //expect(store.getState()).toEqual(expectedValue)
  })
})