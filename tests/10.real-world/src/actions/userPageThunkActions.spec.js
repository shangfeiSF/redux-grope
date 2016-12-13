import {SPEC} from '../../../../main/10.real-world/src/middleware/symbol'
import {Schemas} from '../../../../main/10.real-world/src/middleware/schema'

import * as ActionTypes from '../../../../main/10.real-world/src/constants/ActionTypes'
import * as userPageThunkActions from '../../../../main/10.real-world/src/actions/userPageThunkActions'

describe('userPageThunkActions', () => {
  it('loadUser should return the spec of loadUserActions when user is undefined', () => {
    let login = 'tj'
    let requiredFields = ['id', 'login', 'name', 'email']

    let expectedValue = {
      [SPEC]: {
        types: [
          ActionTypes.USER_REQUEST,
          ActionTypes.USER_SUCCESS,
          ActionTypes.USER_FAILURE
        ],
        route: `users/${login}`,
        schema: Schemas.USER
      }
    }

    let dispatch = action => action
    let getState = () => ({
      entities: {
        users: {}
      }
    })

    let thunk = userPageThunkActions.loadUser(login, requiredFields)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadUser should return the spec of loadUserActions when some field of requiredFields is not existed', () => {
    let login = 'tj'
    let requiredFields = ['id', 'login', 'name', 'email']
    let userDeatils = {
      id: 25254,
      login: "tj"
    }

    let expectedValue = {
      [SPEC]: {
        types: [
          ActionTypes.USER_REQUEST,
          ActionTypes.USER_SUCCESS,
          ActionTypes.USER_FAILURE
        ],
        route: `users/${login}`,
        schema: Schemas.USER
      }
    }

    let dispatch = action => action
    let getState = () => ({
      entities: {
        users: {
          [login]: userDeatils
        }
      }
    })

    let thunk = userPageThunkActions.loadUser(login, requiredFields)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadUser should return null when repo is existed and each field of requiredFields is existed', () => {
    let login = 'facebook/react'
    let requiredFields = ['id', 'login', 'name', 'email']
    let userDeatils = {
      id: 25254,
      login: "tj",
      name: "TJ Holowaychuk",
      email: "tj@vision-media.ca"
    }

    let expectedValue = null

    let dispatch = action => action
    let getState = () => ({
      entities: {
        users: {
          [login]: userDeatils
        }
      }
    })

    let thunk = userPageThunkActions.loadUser(login, requiredFields)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadStarred should return the spec of loadStarredActions when pageCount = 0', () => {
    let login = 'tj'
    let nextPage = false
    let starredByUserDeatils = {
      ids: [],
      pageCount: 0,
      isFetching: false,
      nextPageUrl: "https://api.github.com/user/25254/starred?access_token=9cfab18f676a0d9e06ef84a42bd4fb7b6019d658&page=2"
    }

    let expectedValue = {
      login,

      [SPEC]: {
        types: [
          ActionTypes.STARRED_REQUEST,
          ActionTypes.STARRED_SUCCESS,
          ActionTypes.STARRED_FAILURE
        ],
        route: starredByUserDeatils.nextPageUrl,
        schema: Schemas.REPO_ARRAY
      }
    }

    let dispatch = action => action
    let getState = () => ({
      pagination: {
        starredByUser: {
          [login]: starredByUserDeatils
        }
      }
    })

    let thunk = userPageThunkActions.loadStarred(login, nextPage)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadStarred should return the spec of loadStarredActions when nextPage = true', () => {
    let login = 'tj'
    let nextPage = true
    let starredByUserDeatils = {
      ids: [],
      pageCount: 0,
      isFetching: false,
      nextPageUrl: "https://api.github.com/user/25254/starred?access_token=9cfab18f676a0d9e06ef84a42bd4fb7b6019d658&page=2"
    }

    let expectedValue = {
      login,

      [SPEC]: {
        types: [
          ActionTypes.STARRED_REQUEST,
          ActionTypes.STARRED_SUCCESS,
          ActionTypes.STARRED_FAILURE
        ],
        route: starredByUserDeatils.nextPageUrl,
        schema: Schemas.REPO_ARRAY
      }
    }

    let dispatch = action => action
    let getState = () => ({
      pagination: {
        starredByUser: {
          [login]: starredByUserDeatils
        }
      }
    })

    let thunk = userPageThunkActions.loadStarred(login, nextPage)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadStarred should return null when pageCount > 0 and nextPage = false', () => {
    let login = 'tj'
    let nextPage = false
    let starredByUserDeatils = {
      ids: [],
      pageCount: 2,
      isFetching: false,
      nextPageUrl: "https://api.github.com/user/25254/starred?access_token=9cfab18f676a0d9e06ef84a42bd4fb7b6019d658&page=2"
    }

    let expectedValue = null

    let dispatch = action => action
    let getState = () => ({
      pagination: {
        starredByUser: {
          [login]: starredByUserDeatils
        }
      }
    })

    let thunk = userPageThunkActions.loadStarred(login, nextPage)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })
})