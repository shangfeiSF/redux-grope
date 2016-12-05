import * as syncActions from '../actions/syncActions'

export const _fetch = url => dispatch => {
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json.serverTime)

      return dispatch(syncActions.increase())
    })
}