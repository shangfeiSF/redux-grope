import Immutable from 'immutable'

import actionSpec from '../../../../main/10.real-world/src/middlewares/github/sybmols/actionSpec'
import Schemas from '../../../../main/10.real-world/src/middlewares/github/schemas'

import * as ActionTypes from '../../../../main/10.real-world/src/constants/ActionTypes'
import * as repoPageThunkActions from '../../../../main/10.real-world/src/actions/repoPageThunkActions'

describe('repoPageThunkActions', () => {
  it('loadRepo should return the spec of loadRepoActions when repo is undefined', () => {
    let fullName = 'facebook/react'
    let requiredFields = ['id', 'name', 'fullName', 'owner']

    let expectedValue = {
      fullName,

      [actionSpec]: {
        types: [
          ActionTypes.REPO_REQUEST,
          ActionTypes.REPO_SUCCESS,
          ActionTypes.REPO_FAILURE
        ],
        route: `repos/${fullName}`,
        schema: Schemas.REPO
      }
    }

    let dispatch = action => action
    let getState = () => Immutable.Map({
      entities: {
        repos: {}
      }
    })

    let thunk = repoPageThunkActions.loadRepo(fullName, requiredFields)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadRepo should return the spec of loadRepoActions when some field of requiredFields is not existed', () => {
    let fullName = 'facebook/react'
    let requiredFields = ['id', 'name', 'fullName', 'owner']
    let repoDeatils = {
      id: 10270250,
      fullName: "facebook/react"
    }

    let expectedValue = {
      fullName,

      [actionSpec]: {
        types: [
          ActionTypes.REPO_REQUEST,
          ActionTypes.REPO_SUCCESS,
          ActionTypes.REPO_FAILURE
        ],
        route: `repos/${fullName}`,
        schema: Schemas.REPO
      }
    }

    let dispatch = action => action
    let getState = () => Immutable.Map({
      entities: {
        repos: {
          [fullName]: repoDeatils
        }
      }
    })

    let thunk = repoPageThunkActions.loadRepo(fullName, requiredFields)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadRepo should return null when repo is existed and each field of requiredFields is existed', () => {
    let fullName = 'facebook/react'
    let requiredFields = ['id', 'name', 'fullName', 'owner']
    let repoDeatils = {
      id: 10270250,
      name: "react",
      fullName: "facebook/react",
      owner: "facebook",
    }

    let expectedValue = null

    let dispatch = action => action
    let getState = () => Immutable.Map({
      entities: {
        repos: {
          [fullName]: repoDeatils
        }
      }
    })

    let thunk = repoPageThunkActions.loadRepo(fullName, requiredFields)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadStargazers should return the spec of loadStargazersActions when pageCount = 0', () => {
    let fullName = 'facebook/react'
    let nextPage = false
    let stargazersByRepoDeatils = {
      ids: [],
      pageCount: 0,
      isFetching: false,
      nextPageUrl: "https://api.github.com/repositories/10270250/stargazers?access_token=9cfab18f676a0d9e06ef84a42bd4fb7b6019d658&page=2"
    }

    let expectedValue = {
      fullName,

      [actionSpec]: {
        types: [
          ActionTypes.STARGAZERS_REQUEST,
          ActionTypes.STARGAZERS_SUCCESS,
          ActionTypes.STARGAZERS_FAILURE
        ],
        route: stargazersByRepoDeatils.nextPageUrl,
        schema: Schemas.USER_ARRAY
      }
    }

    let dispatch = action => action
    let getState = () => Immutable.Map({
      pagination: {
        stargazersByRepo: {
          [fullName]: stargazersByRepoDeatils
        }
      }
    })

    let thunk = repoPageThunkActions.loadStargazers(fullName, nextPage)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadStargazers should return the spec of loadStargazersActions when nextPage = true', () => {
    let fullName = 'facebook/react'
    let nextPage = true
    let stargazersByRepoDeatils = {
      ids: [],
      pageCount: 2,
      isFetching: false,
      nextPageUrl: "https://api.github.com/repositories/10270250/stargazers?access_token=9cfab18f676a0d9e06ef84a42bd4fb7b6019d658&page=2"
    }

    let expectedValue = {
      fullName,

      [actionSpec]: {
        types: [
          ActionTypes.STARGAZERS_REQUEST,
          ActionTypes.STARGAZERS_SUCCESS,
          ActionTypes.STARGAZERS_FAILURE
        ],
        route: stargazersByRepoDeatils.nextPageUrl,
        schema: Schemas.USER_ARRAY
      }
    }

    let dispatch = action => action
    let getState = () => Immutable.Map({
      pagination: {
        stargazersByRepo: {
          [fullName]: stargazersByRepoDeatils
        }
      }
    })

    let thunk = repoPageThunkActions.loadStargazers(fullName, nextPage)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadStargazers should return null when pageCount > 0 and nextPage = false', () => {
    let fullName = 'facebook/react'
    let nextPage = false
    let stargazersByRepoDeatils = {
      ids: [],
      pageCount: 1,
      isFetching: false,
      nextPageUrl: "https://api.github.com/repositories/10270250/stargazers?access_token=9cfab18f676a0d9e06ef84a42bd4fb7b6019d658&page=2"
    }

    let expectedValue = null

    let dispatch = action => action
    let getState = () => Immutable.Map({
      pagination: {
        stargazersByRepo: {
          [fullName]: stargazersByRepoDeatils
        }
      }
    })

    let thunk = repoPageThunkActions.loadStargazers(fullName, nextPage)

    let receviedValue = thunk(dispatch, getState)

    expect(receviedValue).toEqual(expectedValue)
  })
})