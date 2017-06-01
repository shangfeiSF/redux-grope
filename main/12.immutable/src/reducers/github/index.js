import {handleActions} from 'redux-actions'

import {githubInitialState} from '../../models'
import {GET_GITHUB_SUCCESS, CHANGE_USER_ID} from '../../constants/actionTypes'

export default handleActions({
  [GET_GITHUB_SUCCESS]: (state, {payload}) => (
    state.merge({
      data: payload.data
    })
  ),

  [CHANGE_USER_ID]: (state, {payload}) => (
    state.merge({
      userId: payload.userId
    })
  )
}, githubInitialState)