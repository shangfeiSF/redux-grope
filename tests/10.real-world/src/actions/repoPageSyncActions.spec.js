import actionSpec from '../../../../main/10.real-world/src/middlewares/github/sybmols/actionSpec'
import Schemas from '../../../../main/10.real-world/src/middlewares/github/schemas'

import * as ActionTypes from '../../../../main/10.real-world/src/constants/ActionTypes'
import * as repoPageSyncActions from '../../../../main/10.real-world/src/actions/repoPageSyncActions'

describe('repoPageSyncActions', () => {
  it('loadRepoActions should return the spec of actions to load repo', () => {
    let fullName = 'facebook/react'

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

    let receviedValue = repoPageSyncActions.loadRepoActions(fullName)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadStargazersActions should return the spec of action to load stargazers', () => {
    let fullName = 'facebook/react'
    let nextPageUrl = 'This the nextPage url'

    let expectedValue = {
      fullName,

      [actionSpec]: {
        types: [
          ActionTypes.STARGAZERS_REQUEST,
          ActionTypes.STARGAZERS_SUCCESS,
          ActionTypes.STARGAZERS_FAILURE
        ],
        route: nextPageUrl,
        schema: Schemas.USER_ARRAY
      }
    }

    let receviedValue = repoPageSyncActions.loadStargazersActions(fullName, nextPageUrl)

    expect(receviedValue).toEqual(expectedValue)
  })
})