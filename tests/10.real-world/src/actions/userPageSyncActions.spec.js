import actionSpec from '../../../../main/10.real-world/src/middlewares/github/sybmols/actionSpec'
import Schemas from '../../../../main/10.real-world/src/middlewares/github/schemas'

import * as ActionTypes from '../../../../main/10.real-world/src/constants/ActionTypes'
import * as userPageSyncActions from '../../../../main/10.real-world/src/actions/userPageSyncActions'

describe('userPageSynclearcActions', () => {
  it('loadUserActions should return the spec of actions to load user', () => {
    let login = 'shangfeiSF'

    let expectedValue = {
      login,

      [actionSpec]: {
        types: [
          ActionTypes.USER_REQUEST,
          ActionTypes.USER_SUCCESS,
          ActionTypes.USER_FAILURE
        ],
        route: `users/${login}`,
        schema: Schemas.USER
      }
    }

    let receviedValue = userPageSyncActions.loadUserActions(login)

    expect(receviedValue).toEqual(expectedValue)
  })

  it('loadStarredActions should return the spec of action to load starred', () => {
    let login = 'shangfeiSF'
    let nextPageUrl = 'This the nextPage url'

    let expectedValue = {
      login,

      [actionSpec]: {
        types: [
          ActionTypes.STARRED_REQUEST,
          ActionTypes.STARRED_SUCCESS,
          ActionTypes.STARRED_FAILURE
        ],
        route: nextPageUrl,
        schema: Schemas.REPO_ARRAY
      }
    }

    let receviedValue = userPageSyncActions.loadStarredActions(login, nextPageUrl)

    expect(receviedValue).toEqual(expectedValue)
  })
})