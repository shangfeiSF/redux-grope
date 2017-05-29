import {GET_GITHUB_INITIATE, GET_GITHUB_SUCCESS, GET_GITHUB_FAIL, CHANGE_USER_ID} from '../constants/actionTypes'

import {showSpinner, hideSpinner} from './uiActions'
import {APIROOT, TOKEN} from '../constants/Github'

export const getGithub = (userId) => (dispatch) => {
  dispatch({
    type: GET_GITHUB_INITIATE
  })

  dispatch(showSpinner())

  fetch(`${APIROOT}users/${userId}${TOKEN}`)
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: GET_GITHUB_SUCCESS,
        payload: {
          data: json
        }
      })
    })
    .catch(() => {
      dispatch({
        type: GET_GITHUB_FAIL
      })
      dispatch(hideSpinner())
    })
}

export const changeUserId = text => ({
  type: CHANGE_USER_ID,
  payload: {
    userId: text
  }
})